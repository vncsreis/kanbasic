import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../../../router';

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
});
