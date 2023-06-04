import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Registro from '../pages/registro';
import { auth } from '../../firebase/firebase';
import ErrorBoundary from '../pages/ErrorBoundary';

jest.mock('../../firebase/firebase', () => {
  return {
    auth: {
      createUserWithEmailAndPassword: jest.fn(),
      onAuthStateChanged: jest.fn((callback) => {
        callback(null);
        return jest.fn();
      }),
    },
  };
});

describe('Registro', () => {
  test('renders Registro component', () => {
    render(
      <ErrorBoundary>
        <Registro />
      </ErrorBoundary>
    );

    const registroComponent = screen.getByRole('heading', { name: /registro/i });
    expect(registroComponent).toBeInTheDocument();

    const inputFields = [
      'nombre',
      'apellido',
      'email',
      'password',
      'confirmar'
    ];

    inputFields.forEach(field => {
      expect(screen.getByLabelText(field)).toBeInTheDocument();
    });
  });

  test('filling the form', () => {
    render(
      <ErrorBoundary>
        <Registro />
      </ErrorBoundary>
    );

    const inputValues = {
      nombre: 'John',
      apellido: 'Doe',
      email: 'intento1@example.com',
      password: 'password123',
      confirmar: 'password123'
    };

    for (const field in inputValues) {
      const input = screen.getByLabelText(field);
      fireEvent.change(input, { target: { value: inputValues[field] } });
      expect(input).toHaveValue(inputValues[field]);
    }
  });

  test('submitting the form', async () => {
    const updateProfileMock = jest.fn();
    auth.createUserWithEmailAndPassword.mockResolvedValue({
      user: {
        updateProfile: updateProfileMock,
      },
    });

    render(
      <ErrorBoundary>
        <Registro />
      </ErrorBoundary>
    );

    const inputValues = {
      nombre: 'John',
      apellido: 'Doe',
      email: 'intento1@example.com',
      password: 'password123',
      confirmar: 'password123'
    };

    for (const field in inputValues) {
      const input = screen.getByLabelText(field);
      fireEvent.change(input, { target: { value: inputValues[field] } });
    }

    const submitButton = screen.getByText(/crear cuenta/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(updateProfileMock).toHaveBeenCalledTimes(1);
    });
  });
});
