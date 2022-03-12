import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import RouterDOM, { MemoryRouter } from 'react-router-dom';
import Aside from '..';

const openNewProjectModal = jest.fn();
const setProjectsChanged = jest.fn();
const setOpen = jest.fn();
const projects = ['Test 1', 'Test 2'];

Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
  },
  writable: true,
});

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  __esmodule: true,
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useParams: jest.fn(),
}));

describe('Aside tests', () => {
  const component = (
    <MemoryRouter>
      <Aside
        isOpen
        openNewProjectModal={openNewProjectModal}
        projects={projects}
        setOpen={setOpen}
        setProjectsChanged={setProjectsChanged}
      />
    </MemoryRouter>
  );

  it('renders correctly', () => {
    render(component);

    const menuText = screen.getByText('Menu');

    const testProjects = screen.getAllByText(/Test/);

    const buttons = screen.getAllByRole('button', { hidden: true });

    expect(testProjects).toHaveLength(2);
    expect(menuText).toBeInTheDocument();
    expect(buttons).toHaveLength(projects.length + 3);
  });

  it('calls close function on Close button click', () => {
    render(component);

    const closeButton = screen.getByText('Close');

    fireEvent.click(closeButton);

    expect(setOpen).toBeCalledWith(false);
  });

  it('calls close function on click outside', () => {
    render(component);

    // eslint-disable-next-line
    const overlay = document.querySelector(
      '.chakra-modal__content-container',
    ) as HTMLElement;

    fireEvent.mouseDown(overlay);
    fireEvent.mouseUp(overlay);
    fireEvent.click(overlay);

    expect(setOpen).toBeCalledWith(false);
  });

  it('calls close function on esc key press', () => {
    render(component);

    // eslint-disable-next-line
    const overlay = document.querySelector(
      '.chakra-modal__content-container',
    ) as HTMLElement;

    fireEvent.keyDown(overlay, { key: 'Esc', code: 27, charCode: 27 });
    fireEvent.keyUp(overlay, { key: 'Esc', code: 27, charCode: 27 });
    fireEvent.keyPress(overlay, { key: 'Esc', code: 27, charCode: 27 });

    expect(setOpen).toBeCalledWith(false);
  });

  it('delete buttons are visible after open accordion', () => {
    render(component);

    const openAccordionButton = screen.getAllByRole('button')[1];

    fireEvent.click(openAccordionButton);

    const deleteTestButtons = screen.getAllByLabelText('Delete project');

    expect(deleteTestButtons).toHaveLength(2);
  });

  it('calls delete test function on button click', () => {
    jest.spyOn(RouterDOM, 'useParams').mockReturnValue({ project: 'test 1' });

    render(component);

    const openAccordionButton = screen.getAllByRole('button')[1];

    fireEvent.click(openAccordionButton);

    const deleteTestButton = screen.getAllByLabelText('Delete project')[0];

    expect(setProjectsChanged).not.toBeCalled();

    fireEvent.click(deleteTestButton);

    expect(setProjectsChanged).toBeCalled();
  });

  it('navigates to project url on project title click', () => {
    render(component);

    const openAccordionButton = screen.getAllByRole('button')[1];

    fireEvent.click(openAccordionButton);

    const testLink = screen.getByText('Test 1');

    fireEvent.click(testLink);

    expect(mockedNavigate).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith('/test 1');
  });

  it('navigates to first project of list on selected project deletetion if projects on storage > 0', () => {
    window.localStorage.setItem('kanbasic-test 1', '1');
    window.localStorage.setItem('kanbasic-test 2', '2');

    mockedNavigate.mockImplementation((destination: string) => {
      window.location.pathname = destination;
    });

    jest.spyOn(RouterDOM, 'useParams').mockReturnValue({ project: 'test 2' });

    render(component);

    const openAccordionButton = screen.getAllByRole('button')[1];
    fireEvent.click(openAccordionButton);

    const projectToDeleteLink = screen.getByText('Test 2');
    fireEvent.click(projectToDeleteLink);

    const deleteButton = screen.getAllByLabelText('Delete project')[1];
    fireEvent.click(deleteButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenLastCalledWith('/test 1');
  });

  it('navigates to home on selected project deletetion if projects on storage == 0', () => {
    window.localStorage.setItem('kanbasic-test 1', '1');

    mockedNavigate.mockImplementation((destination: string) => {
      window.location.pathname = destination;
    });

    jest.spyOn(RouterDOM, 'useParams').mockReturnValue({ project: 'test 1' });

    render(component);

    const openAccordionButton = screen.getAllByRole('button')[0];
    fireEvent.click(openAccordionButton);

    const projectToDeleteLink = screen.getByText('Test 1');
    fireEvent.click(projectToDeleteLink);

    const deleteButton = screen.getAllByLabelText('Delete project')[0];
    fireEvent.click(deleteButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenLastCalledWith('/');
  });

  it('calls open modal function on button click', () => {
    render(component);

    const newProjectButton = screen.getByText('New Project');

    fireEvent.click(newProjectButton);

    expect(openNewProjectModal).toHaveBeenCalled();
  });
});
