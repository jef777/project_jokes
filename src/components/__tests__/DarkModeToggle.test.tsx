import { render, fireEvent } from '@testing-library/react';
import Switcher from '../DarkModeToggle';

jest.mock('@/hooks/useDarkModeToggle', () => ({
  __esModule: true,
  default: jest.fn(() => ['light', jest.fn()]),
}));

describe('Switcher', () => {
  it('should toggle dark mode', () => {
    const { getByTestId } = render(<Switcher />);
    const darkModeSwitch = getByTestId('dark-mode-switch');

    fireEvent.click(darkModeSwitch);

    // You can add assertions here to verify the behavior after toggling dark mode
  });
});
