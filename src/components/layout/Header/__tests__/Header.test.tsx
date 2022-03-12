import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '..';

const setDrawerOpen = jest.fn();
const setProjectNameModalOpen = jest.fn();
const title = 'Test Title';

const mockedNavigate = jest.fn();
const mockedLinkClick = jest.fn();

jest.mock('react-router-dom', () => ({
  __esmodule: true,
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useParams: jest.fn(),
  useLinkClickHandler: () => mockedLinkClick,
}));

describe('Header tests', () => {
  const component = (
    <MemoryRouter>
      <Header
        setDrawerOpen={setDrawerOpen}
        setProjectNameModalOpen={setProjectNameModalOpen}
        title={title}
      />
    </MemoryRouter>
  );

  it('renders title and elements correctly', () => {
    render(component);

    const h1 = screen.getByText('Test Title');
    const hamburguerButton = screen.getByRole('button');
    const link = screen.getByRole('link');

    expect(h1).toBeInTheDocument();
    expect(hamburguerButton).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it('"Kanbasic" Link has path to home page', () => {
    render(component);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/');
  });

  it('calls open menu function when hamburguer button is clicked', () => {
    render(component);

    const hamburguerButton = screen.getByRole('button');

    fireEvent.click(hamburguerButton);

    expect(setDrawerOpen).toHaveBeenCalled();
  });

  it('calls open modal function title is clicked', () => {
    render(component);

    const h1 = screen.getByText('Test Title');

    fireEvent.click(h1);

    expect(setProjectNameModalOpen).toHaveBeenCalled();
  });
});
