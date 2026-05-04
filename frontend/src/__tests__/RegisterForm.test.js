import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';

describe('Register page', () => {
  test('renders register form fields', () => {
    render(
      <MemoryRouter>
        <Register setUser={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/13-digit ID Number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Account Number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Strong Password/i)).toBeInTheDocument();
  });
});
