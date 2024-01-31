import dayjs from 'dayjs';

import {
  calculateDeliveryFee,
  calculateDistanceFee,
  calculateItemsSurchargeFee,
  calculateOrderSurcharge,
  getRushMultiplier,
  isFridayRushHour,
} from './calculations';

describe('calculateDeliveryFee', () => {
  const distance = 1000;
  const numOfItems = 5;
  const orderTime = dayjs().day(5).hour(15).minute(0).second(0).millisecond(0);
  it('should return 0 when the cart value is equal or more than 200€', () => {
    const cartValue = 200;
    const result = calculateDeliveryFee(
      cartValue,
      distance,
      numOfItems,
      orderTime,
    );
    expect(result).toBe(0);
  });
  it('should return the sum of 0 all the surcharge * rush hour multiplier', () => {
    const cartValue = 8;
    const result = calculateDeliveryFee(
      cartValue,
      distance,
      numOfItems,
      orderTime,
    );
    expect(result).toBe(5.4);
  });
});

describe('calculateOrderSurcharge', () => {
  const minCartValue = 10;
  it('should return the difference between the cart value and min cart value', () => {
    const cartValue = 8.9;

    const result = calculateOrderSurcharge(cartValue, minCartValue);
    expect(result).toBe(1.1);
  });
  it('should return 0, no surcharge', () => {
    let cartValue = 12;
    let result = calculateOrderSurcharge(cartValue, minCartValue);
    expect(result).toBe(0);

    cartValue = 10;
    result = calculateOrderSurcharge(cartValue, minCartValue);
    expect(result).toBe(0);
  });
});

describe('calculateDistanceFee', () => {
  const minDistance = 1000;
  it('should return the minimul delivery fee values 2euros for the first 1000m', () => {
    let distance = 400;
    let result = calculateDistanceFee(distance, minDistance);
    expect(result).toBe(2);

    distance = 1000;
    result = calculateDistanceFee(distance, minDistance);
    expect(result).toBe(2);
  });
  it('should return 2 base fee + 1 for the additional 500 m', () => {
    let distance = 1499;
    let result = calculateDistanceFee(distance, minDistance);
    expect(result).toBe(3);

    distance = 1500;
    result = calculateDistanceFee(distance, minDistance);
    expect(result).toBe(3);
  });
  it('should 2 base fee + 1 the first 500 m + 1 for the second 500 m', () => {
    const distance = 1501;
    const result = calculateDistanceFee(distance, minDistance);
    expect(result).toBe(4);
  });
});

describe('calculateItemsSurchargeFee', () => {
  const maxFreeItemsNumber = 4;
  const baseSurchargeFeePerItem = 0.5;
  const additionalSurchargeFee = 1.2;
  it('should return 0, no surchage', () => {
    let numOfItems = 3;
    let result = calculateItemsSurchargeFee(
      numOfItems,
      maxFreeItemsNumber,
      baseSurchargeFeePerItem,
      additionalSurchargeFee,
    );
    expect(result).toBe(0);

    numOfItems = 4;
    result = calculateItemsSurchargeFee(
      numOfItems,
      maxFreeItemsNumber,
      baseSurchargeFeePerItem,
      additionalSurchargeFee,
    );
    expect(result).toBe(0);
  });
  it('should return 0.5 surchage per additionnal item', () => {
    let numOfItems = 5;
    let result = calculateItemsSurchargeFee(
      numOfItems,
      maxFreeItemsNumber,
      baseSurchargeFeePerItem,
      additionalSurchargeFee,
    );
    expect(result).toBe(0.5);

    numOfItems = 10;
    result = calculateItemsSurchargeFee(
      numOfItems,
      maxFreeItemsNumber,
      baseSurchargeFeePerItem,
      additionalSurchargeFee,
    );
    expect(result).toBe(3);
  });
  it('should return 0.5 surchage per additionnal item + extra bulk', () => {
    let numOfItems = 13;
    let result = calculateItemsSurchargeFee(
      numOfItems,
      maxFreeItemsNumber,
      baseSurchargeFeePerItem,
      additionalSurchargeFee,
    );
    expect(result).toBe(5.7);

    numOfItems = 12;
    result = calculateItemsSurchargeFee(
      numOfItems,
      maxFreeItemsNumber,
      baseSurchargeFeePerItem,
      additionalSurchargeFee,
    );
    expect(result).toBe(5.2);

    numOfItems = 14;
    result = calculateItemsSurchargeFee(
      numOfItems,
      maxFreeItemsNumber,
      baseSurchargeFeePerItem,
      additionalSurchargeFee,
    );
    expect(result).toBe(6.2);
  });
});

describe('isFridayRushHour', () => {
  it('should return true if the order time is on a Friday during rush hours', () => {
    let orderTime = dayjs().day(5).hour(15).minute(0).second(0).millisecond(0);
    let result = isFridayRushHour(orderTime);
    expect(result).toBe(true);

    orderTime = dayjs().day(5).hour(19).minute(0).second(0).millisecond(0);
    result = isFridayRushHour(orderTime);
    expect(result).toBe(true);
  });
  it('should return false if the order time is not on a Friday during rush hours', () => {
    let orderTime = dayjs().day(3).hour(16).minute(0).second(0).millisecond(0);
    let result = isFridayRushHour(orderTime);
    expect(result).toBe(false);

    orderTime = dayjs().day(5).hour(14).minute(59).second(0).millisecond(0);
    result = isFridayRushHour(orderTime);
    expect(result).toBe(false);
  });
});

describe('getRushMultiplier', () => {
  it('should return 1.2 if the order time is on a Friday during rush hours', () => {
    let orderTime = dayjs().day(5).hour(15).minute(0).second(0).millisecond(0);
    let result = getRushMultiplier(orderTime);
    expect(result).toBe(1.2);

    orderTime = dayjs().day(5).hour(19).minute(0).second(0).millisecond(0);
    result = getRushMultiplier(orderTime);
    expect(result).toBe(1.2);
  });
  it('should return 1 if the order time is not on a Friday during rush hours', () => {
    let orderTime = dayjs().day(3).hour(16).minute(0).second(0).millisecond(0);
    let result = getRushMultiplier(orderTime);
    expect(result).toBe(1);

    orderTime = dayjs().day(5).hour(14).minute(59).second(0).millisecond(0);
    result = getRushMultiplier(orderTime);
    expect(result).toBe(1);
  });
});
