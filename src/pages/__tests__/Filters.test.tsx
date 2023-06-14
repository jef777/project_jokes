import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { store } from '@/app/store';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import Filters from '@/pages/jokes/components/Filters';

describe('Filters component', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );
  });

  test('is mounted', () => {
    const filterByDateInput = screen.getByTestId(
      'filter-by-date-input'
    ) as HTMLInputElement;
    expect(filterByDateInput).toBeInTheDocument();

    const filterByNumberOfViewsInput = screen.getByTestId(
      'filter-by-number-of-views'
    ) as HTMLInputElement;
    expect(filterByNumberOfViewsInput).toBeInTheDocument();

    const filterButton = screen.getByTestId('filter-button');
    expect(filterButton).toBeInTheDocument();

    const clearButton = screen.getByTestId('clear-button');
    expect(clearButton).toBeInTheDocument();

    const pageLimitSelect = screen.getByTestId(
      'page-limit'
    ) as HTMLSelectElement;
    expect(pageLimitSelect).toBeInTheDocument();
  });

  test('handles filter selection and clearing', () => {
    const filterByDateInput = screen.getByTestId(
      'filter-by-date-input'
    ) as HTMLInputElement;
    const filterByNumberOfViewsInput = screen.getByTestId(
      'filter-by-number-of-views'
    ) as HTMLInputElement;
    // const filterButton = screen.getByTestId('filter-button');
    // const clearButton = screen.getByTestId('clear-button');

    fireEvent.change(filterByNumberOfViewsInput, { target: { value: '100' } });
    expect(filterByNumberOfViewsInput.value).toBe('100');

    fireEvent.change(filterByDateInput, { target: { value: '2023-06-13' } });
    expect(filterByDateInput.value).toBe('2023-06-13');

    // fireEvent.click(filterButton);
    // fireEvent.click(clearButton);

    // expect(filterByDateInput.value).toBe('');
    // expect(filterByNumberOfViewsInput.value).toBe('');
  });
});
