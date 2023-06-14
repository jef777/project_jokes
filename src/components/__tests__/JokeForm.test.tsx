import { render, fireEvent, screen } from '@testing-library/react';
import JokeForm from '../JokeForm';
import { MemoryRouter } from 'react-router-dom';

// Mock the useForm hook
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    register: jest.fn(),
    reset: jest.fn(),
    handleSubmit: jest.fn((callback) => (data: any) => callback(data)),
    formState: { isSubmitSuccessful: false, errors: {} },
  })),
}));

describe('JokeForm component', () => {
  it('submits the form with valid input', () => {
    const mockOnSubmit = jest.fn();
    render(
      <MemoryRouter>
        <JokeForm onSubmitHandler={mockOnSubmit} type="ADD" />
      </MemoryRouter>
    );

    const titleInput = screen.getByTestId(
      'input-joke-title'
    ) as HTMLInputElement;
    const descriptionInput = screen.getByTestId(
      'input-joke-description'
    ) as HTMLInputElement;
    const submitButton = screen.getByTestId('btn-submit-joke');

    fireEvent.change(titleInput, {
      target: { value: 'Why did the chicken cross the road?' },
    });
    fireEvent.change(descriptionInput, {
      target: { value: 'To get to the other side' },
    });

    expect(titleInput.value).toBe('Why did the chicken cross the road?');
    expect(descriptionInput.value).toBe('To get to the other side');

    // Trigger form submission
    fireEvent.click(submitButton);

    // make sure form is submitted
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
