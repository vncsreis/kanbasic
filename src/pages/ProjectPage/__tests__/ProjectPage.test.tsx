import { ChakraProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import path from 'path';
import { MemoryRouter } from 'react-router-dom';
import Router from '../../../router/Router';
import theme from '../../../theme';
import { appendStyle } from '../../../__testUtils__/appendStyle';

jest.setTimeout(15000);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  __esmodule: true,
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const testProject = {
  name: 'Test Project',
  tasks: {
    todo: [
      {
        id: 'f221a927-d8bd-4cc8-981f-e851e4108768',
        name: 'Test 1',
        status: 'todo',
      },
      {
        id: 'e491c315-edf3-4a7f-9dd7-9860cc476305',
        name: 'Test 2',
        status: 'todo',
      },
    ],
    doing: [
      {
        id: '23e5913b-6b22-4b9d-a175-410ef1786d7b',
        name: 'Test 3',
        status: 'doing',
      },
      {
        id: 'ef5ed02c-0aa7-4c0f-8e14-c5b253b7650a',
        name: 'Test 4',
        status: 'doing',
      },
    ],
    done: [
      {
        id: '280fa086-df99-48ce-a69d-1b4933b7b74b',
        name: 'Test 5',
        status: 'done',
      },
      {
        id: 'bf30470d-ee1a-4ee3-abbb-983997267399',
        name: 'Test 6',
        status: 'done',
      },
    ],
  },
};

describe('Project Page tests', () => {
  const component = (url: string) => (
    <ChakraProvider theme={theme}>
      <MemoryRouter initialEntries={[url]}>
        <Router />
      </MemoryRouter>
    </ChakraProvider>
  );

  beforeEach(() => {
    localStorage.setItem('kanbasic-test project', JSON.stringify(testProject));
  });

  it('New Project page renders successfully', () => {
    render(component('/new project'));

    const title = screen.getByText('Kanbasic');

    expect(title).toBeInTheDocument();
    expect(screen.getByText('New Project')).toBeInTheDocument();
  });

  it('loads project from memory', () => {
    render(component('/test project'));

    expect(screen.getByText(testProject.name)).toBeInTheDocument();
    expect(
      screen.getByText(testProject.tasks.doing[0].name),
    ).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Move/)[0]).toBeInTheDocument();
  });

  it('advances todo task to doing', () => {
    const view = render(component('/test project'));
    appendStyle(view.container, path.join(__dirname, '../ProjectPage.css'));

    const todoButtons = screen.getAllByLabelText(/doing/);
    const doingButtons = screen.getAllByLabelText(/done/);

    expect(todoButtons).toHaveLength(2);
    expect(doingButtons).toHaveLength(2);

    fireEvent.click(todoButtons[0]);

    const todoButtonsAfterClick = screen.getAllByLabelText(/doing/);
    const doingButtonsAfterClick = screen.getAllByLabelText(/done/);

    expect(todoButtonsAfterClick).toHaveLength(2);
    expect(screen.getAllByText('Test 1')[0]).not.toBeVisible();
    expect(doingButtonsAfterClick).toHaveLength(3);
  });

  it('advances doing task to done', () => {
    const view = render(component('/test project'));
    appendStyle(view.container, path.join(__dirname, '../ProjectPage.css'));

    const doingButtons = screen.getAllByLabelText(/done/);
    const doneButtons = screen.getAllByLabelText(/Remove/);

    expect(doingButtons).toHaveLength(2);
    expect(doneButtons).toHaveLength(2);

    fireEvent.click(doingButtons[0]);

    const doingButtonsAfterClick = screen.getAllByLabelText(/doing/);
    const doneButtonsAfterClick = screen.getAllByLabelText(/Remove/);

    expect(doingButtonsAfterClick).toHaveLength(2);
    expect(screen.getAllByText('Test 3')[0]).not.toBeVisible();
    expect(doneButtonsAfterClick).toHaveLength(3);
  });

  it('removes done tasks on button click', () => {
    const view = render(component('/test project'));
    appendStyle(view.container, path.join(__dirname, '../ProjectPage.css'));

    const doneButtons = screen.getAllByLabelText(/Remove/);

    expect(doneButtons).toHaveLength(2);

    fireEvent.click(doneButtons[0]);

    expect(screen.getByText('Test 5')).not.toBeVisible();
  });

  it('opens modal and adds new task to project', () => {
    render(component('/test project'));

    const addButton = screen.getByLabelText('Add Task');

    fireEvent.click(addButton);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'New Task' } });

    const submitButton = screen.getByText('Submit');

    fireEvent.click(submitButton);

    const newTask = screen.getByText('New Task');
    const todoButtons = screen.getAllByLabelText(/doing/);

    expect(newTask).toBeInTheDocument();
    expect(todoButtons).toHaveLength(3);
  });

  it('does not accept invalid task input', () => {
    render(component('/test project'));

    const addButton = screen.getByLabelText('Add Task');

    fireEvent.click(addButton);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });

    const submitButton = screen.getByText('Submit');

    fireEvent.click(submitButton);

    const errMessage = screen.getByText('Invalid task');

    const todoButtons = screen.getAllByLabelText(/doing/);

    expect(errMessage).toBeInTheDocument();
    expect(todoButtons).toHaveLength(2);
  });

  it('opens create new project modal and navigates to new project page', () => {
    render(component('/test project'));

    const menuButton = screen.getAllByRole('button')[0];

    fireEvent.click(menuButton);

    const [, newProjectButton] = screen.getAllByText('New Project');

    fireEvent.click(newProjectButton);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Testing' } });

    const submit = screen.getByText('Submit');

    fireEvent.click(submit);

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/testing');
    expect(localStorage.getItem('kanbasic-testing')).toBeTruthy();
  });

  it('does not create new project if input is invalid', async () => {
    render(component('/test project'));

    const menuButton = screen.getAllByRole('button')[0];

    fireEvent.click(menuButton);

    const [, newProjectButton] = screen.getAllByText('New Project');

    fireEvent.click(newProjectButton);

    const input = screen.getByRole('textbox');
    const modalSubmitButton = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(modalSubmitButton);

    const firstErrMessage = screen.queryByText('Invalid input');

    expect(firstErrMessage).toBeInTheDocument();

    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((res) => setTimeout(res, 7000));
    });

    expect(firstErrMessage).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: '/// test' } });
    fireEvent.click(modalSubmitButton);

    const secondErrMessage = screen.queryByText('Invalid input');

    expect(secondErrMessage).toBeInTheDocument();

    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((res) => setTimeout(res, 7000));
    });

    expect(secondErrMessage).not.toBeInTheDocument();
  });

  it('open modal and changes project name', () => {
    render(component('/test project'));

    const title = screen.getByText('Test Project');

    fireEvent.click(title);

    const input = screen.getByRole('textbox');
    const submit = screen.getByText('Submit');

    const newTitleString = 'New Test Project';

    fireEvent.change(input, { target: { value: newTitleString } });
    fireEvent.click(submit);

    const newTitle = screen.getByText(newTitleString);

    expect(newTitle).toBeInTheDocument();
  });

  it('does not change project name if invalid', async () => {
    render(component('/test project'));

    const title = screen.getByText('Test Project');

    fireEvent.click(title);

    const input = screen.getByRole('textbox');
    const modalSubmitButton = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(modalSubmitButton);

    const errMessage = screen.queryByText('Invalid input');

    expect(errMessage).toBeInTheDocument();

    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((res) => setTimeout(res, 7000));
    });

    expect(errMessage).not.toBeInTheDocument();
  });
});
