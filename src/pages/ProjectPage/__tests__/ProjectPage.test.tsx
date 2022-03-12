import { ChakraProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../../../router/Router';
import theme from '../../../theme';

describe('Project Page tests', () => {
  const pageComponent = (
    <ChakraProvider theme={theme}>
      <MemoryRouter initialEntries={['/new project']}>
        <Router />
      </MemoryRouter>
    </ChakraProvider>
  );
  it('New Project page renders successfully', () => {
    render(pageComponent);

    const title = screen.getByText('Kanbasic');

    expect(title).toBeInTheDocument();
  });
});
