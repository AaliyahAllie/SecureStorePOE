import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './pages/Register';

describe('Password guidance', () => {
  test('shows password guidance text on register page', () => {
    render(
      <BrowserRouter>
        <Register setUser={jest.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
  });
});
