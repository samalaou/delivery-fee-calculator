import { Button, Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, FormEvent, useState } from 'react';

import NumberField from './NumberField';

interface CalculatorFormProps {
  calculateDeliveryFee(
    cartValue: number,
    distance: number,
    numberOfItems: number,
    orderTime: Dayjs,
  ): void;
}

interface FormValues {
  cartValue: number | '';
  distance: number | '';
  numberOfItems: number | '';
  orderTime: Dayjs;
}

interface FormErrors {
  cartValue: boolean;
  distance: boolean;
  numberOfItems: boolean;
}

function CalculatorForm({
  calculateDeliveryFee,
}: CalculatorFormProps): JSX.Element {
  const [formValues, setFormValues] = useState<FormValues>({
    cartValue: '',
    distance: '',
    numberOfItems: '',
    orderTime: dayjs(new Date()),
  });

  const [errors, setErrors] = useState<FormErrors>({
    cartValue: false,
    distance: false,
    numberOfItems: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    setFormValues((prevValues) => ({ ...prevValues, [name]: numericValue }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: isNaN(numericValue) }));
  };

  const handleOrderTimeChange = (date: Dayjs | null) => {
    if (date !== null) {
      setFormValues((prevValues) => ({ ...prevValues, orderTime: date }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const parsedOrderTime = formValues.orderTime
      ? formValues.orderTime
      : dayjs(new Date());
    calculateDeliveryFee(
      parseFloat(formValues.cartValue as string) || 0,
      parseFloat(formValues.distance as string) || 0,
      parseFloat(formValues.numberOfItems as string) || 0,
      parsedOrderTime,
    );
  };

  return (
    <form onSubmit={handleSubmit} data-test-id="calculatorForm">
      <NumberField
        value={formValues.cartValue}
        handleChange={handleChange}
        id="cartValue"
        endAdornment="€"
        dataTestId="cartValue"
        name="cartValue"
        label="Cart value"
        error={errors.cartValue}
      />
      <NumberField
        value={formValues.distance}
        handleChange={handleChange}
        id="distance"
        endAdornment="m"
        dataTestId="deliveryDistance"
        name="distance"
        label="Delivery distance"
        error={errors.distance}
      />
      <NumberField
        value={formValues.numberOfItems}
        handleChange={handleChange}
        id="numberOfItems"
        dataTestId="numberOfItems"
        name="numberOfItems"
        label="Number of items"
        decimalScale={0}
        error={errors.numberOfItems}
      />
      <Grid item xs={12} style={{ margin: '20px 10px' }}>
        <DateTimePicker
          label="Time of order"
          name="orderTime"
          value={formValues.orderTime}
          data-test-id="orderTime"
          onChange={handleOrderTimeChange}
          slotProps={{
            textField: {
              fullWidth: true,
              inputProps: { 'data-test-id': 'orderTime' },
            },
          }}
          sx={{ backgroundColor: 'white' }}
        />
      </Grid>
      <Grid item xs={12} style={{ margin: '20px 10px' }}>
        <Button
          fullWidth
          color="secondary"
          size="large"
          type="submit"
          variant="contained"
        >
          Calculate
        </Button>
      </Grid>
    </form>
  );
}

export default CalculatorForm;
