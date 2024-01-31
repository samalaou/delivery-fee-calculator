import { Dayjs } from 'dayjs';

export const calculateDeliveryFee = (
  cartValue: number,
  distance: number,
  numOfItems: number,
  orderTime: Dayjs,
): number => {
  const maxCartValue = 200;
  const maxFeeValue = 15;
  const minCartValue = 10;
  const minDistance = 1000;
  const maxFreeItemsNumber = 4;
  const baseSurchargeFeePerItem = 0.5;
  const additionalSurchargeFee = 1.2;

  if (cartValue >= maxCartValue) {
    return 0;
  }

  const orderSurchargeFee = calculateOrderSurcharge(cartValue, minCartValue);
  const distanceFee = calculateDistanceFee(distance, minDistance);
  const itemsSurchargeFee = calculateItemsSurchargeFee(
    numOfItems,
    maxFreeItemsNumber,
    baseSurchargeFeePerItem,
    additionalSurchargeFee,
  );
  const rushMultiplier = getRushMultiplier(orderTime);

  const calculatedFee =
    (orderSurchargeFee + distanceFee + itemsSurchargeFee) * rushMultiplier;

  return parseFloat(Math.min(calculatedFee, maxFeeValue).toFixed(2)); // Round the number to two decimal places
};

export const calculateOrderSurcharge = (
  cartValue: number,
  minCartValue: number,
): number => parseFloat(Math.max(0, minCartValue - cartValue).toFixed(2));

export const calculateDistanceFee = (
  distance: number,
  minDistance: number,
): number => {
  const additionalDistance = 500; // Additional distance for extra fee
  const baseFee = 2;

  if (distance <= minDistance) {
    return baseFee;
  } else {
    const additionalFee = Math.ceil(
      (distance - minDistance) / additionalDistance,
    );
    // Ensure minimum fee of 1€ even if the distance is less than 500 meters
    const totalFee = Math.max(baseFee + additionalFee, 1);

    return totalFee;
  }
};

export const calculateItemsSurchargeFee = (
  numOfItems: number,
  maxFreeItemsNumber: number,
  baseSurchargeFeePerItem: number,
  additionalSurchargeFee: number,
): number => {
  if (numOfItems <= maxFreeItemsNumber) {
    return 0;
  }

  let surchargeFee =
    (numOfItems - maxFreeItemsNumber) * baseSurchargeFeePerItem;

  if (numOfItems >= 12) {
    surchargeFee += additionalSurchargeFee;
  }

  return surchargeFee;
};

export const isFridayRushHour = (orderTime: Dayjs): boolean => {
  const isFriday = orderTime.day() === 5; // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const isRushHour = orderTime.hour() >= 15 && orderTime.hour() <= 19;

  return isFriday && isRushHour;
};

export const getRushMultiplier = (orderTime: Dayjs): number => {
  const isFridayRush = isFridayRushHour(orderTime);
  const rushMultiplier = isFridayRush ? 1.2 : 1;

  return rushMultiplier;
};
