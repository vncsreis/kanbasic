import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../../../router';

jest.setTimeout(15000);

const mockNavigate = jest.fn();
const mockOpenDrawer = jest.fn();
const mockContext = {
  openDrawer: mockOpenDrawer,
  setProjectsChanged: jest.fn(),
  isNewProjectModalOpen: true,
  setNewProjectModalOpen: jest.fn(),
};

jest.mock('react-router-dom', () => ({
  __esmodule: true,
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Home Page tests', () => {
  const component = (
    <MemoryRouter initialEntries={['/']}>
      <Router />
    </MemoryRouter>
  );

  it('renders page correctly', () => {
    render(component);

    const text = screen.getByRole('heading');
    const [openMenuButton, startButton] = screen.getAllByRole('button');

    expect(text).toBeInTheDocument();
    expect(openMenuButton).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
  });

  it('opens modal when start button is clicked', () => {
    render(component);

    const [, startButton] = screen.getAllByRole('button');

    fireEvent.click(startButton);

    const modalText = screen.getByText('New Project Name');
    const input = screen.getByRole('textbox');

    expect(modalText).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('shows error message when modal input is invalid', async () => {
    act(() => {
      render(component);
    });

    const [, startButton] = screen.getAllByRole('button');

    fireEvent.click(startButton);

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

  it('navigates to new project page when sucessful input', () => {
    render(component);

    const [, startButton] = screen.getAllByRole('button');

    fireEvent.click(startButton);

    const input = screen.getByRole('textbox');
    const modalSubmitButton = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: 'Test Project' } });
    fireEvent.click(modalSubmitButton);

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/test project');
  });

  it('menu button calls open aside function', () => {
    jest
      .spyOn(jest.requireMock('react-router-dom'), 'useOutletContext')
      .mockImplementation(() => mockContext);

    render(component);

    const [menuButton] = screen.getAllByRole('button');

    fireEvent.click(menuButton);

    expect(mockOpenDrawer).toHaveBeenCalled();
  });
});
