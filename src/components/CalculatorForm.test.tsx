import { render, fireEvent } from '@testing-library/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CalculatorForm from './CalculatorForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

describe('CalculatorForm', () => {
  const mockCalculateDeliveryFee = jest.fn();

  beforeEach(() => {
    mockCalculateDeliveryFee.mockClear();
  });
  it('matchs snapshot', () => {
    const { container, getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalculatorForm calculateDeliveryFee={mockCalculateDeliveryFee} />
      </LocalizationProvider>,
    );
    const newOrderTime = '01/26/2024 05:16 PM';
    fireEvent.change(getByTestId('orderTime'), {
      target: { value: newOrderTime },
    });
    expect(container).toMatchSnapshot();
  });

  it('submits the form with correct values when Calculate button is clicked', () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalculatorForm calculateDeliveryFee={mockCalculateDeliveryFee} />
      </LocalizationProvider>,
    );

    // Fill the form
    fireEvent.change(getByTestId('cartValue'), { target: { value: '50' } });
    fireEvent.change(getByTestId('deliveryDistance'), {
      target: { value: '10' },
    });
    fireEvent.change(getByTestId('numberOfItems'), { target: { value: '3' } });

    // Submit the form
    fireEvent.submit(getByTestId('calculatorForm'));

    // Check if calculateDeliveryFee was called with the correct arguments
    expect(mockCalculateDeliveryFee).toHaveBeenCalledWith(
      50,
      10,
      3,
      expect.any(dayjs),
    );
  });

  it('updates form values when inputs are changed', () => {
    const { getByTestId } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalculatorForm calculateDeliveryFee={mockCalculateDeliveryFee} />
      </LocalizationProvider>,
    );

    // Fill the form
    fireEvent.change(getByTestId('cartValue'), { target: { value: '20' } });
    fireEvent.change(getByTestId('deliveryDistance'), {
      target: { value: '1500' },
    });
    fireEvent.change(getByTestId('numberOfItems'), { target: { value: '5' } });
    const newOrderTime = '01/26/2024 05:16 PM';
    fireEvent.change(getByTestId('orderTime'), {
      target: { value: newOrderTime },
    });

    // Check if form values are updated
    expect(getByTestId('cartValue')).toHaveValue('20');
    expect(getByTestId('deliveryDistance')).toHaveValue('1500');
    expect(getByTestId('numberOfItems')).toHaveValue('5');
    expect(getByTestId('orderTime')).toHaveValue(newOrderTime);
  });
});
