import React from 'react';
import { render, screen } from '@testing-library/react';
import PasswordStrength from '../components/PasswordStrength';

describe('PasswordStrength component', () => {
  test('shows strength and requirements for a strong password', () => {
    render(<PasswordStrength password="Password@123" />);

    expect(screen.getByText(/Password Strength:/i)).toBeInTheDocument();
    expect(screen.getByText(/Strong/i)).toBeInTheDocument();
    expect(screen.getByText(/8-30 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/One uppercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/One lowercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/One number/i)).toBeInTheDocument();
    expect(screen.getByText(/One special character/i)).toBeInTheDocument();
  });
});
