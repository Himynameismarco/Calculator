const CalculatorModule = require('./script');

describe('adding two numbers', () => {
  test('adds two numbers', () => {
    expect(CalculatorModule.add(2, 3)).toEqual(5);
  });
  test('works for negative results', () => {
    expect(CalculatorModule.add(-5, 3)).toEqual(-2);
  });});

describe('multiplying two numbers', () => {
  test('multiplies two numbers', () => {
    expect(CalculatorModule.multiply(4, 4)).toEqual(16);
  });
  test('works for negative results', () => {
    expect(CalculatorModule.multiply(-4, 4)).toEqual(-16);
  });
});

describe('subtracting two numbers', () => {
  test('subtracts the first from the second numbers', () => {
    expect(CalculatorModule.subtract(7, 5)).toEqual(2);
  });
});

describe('dividing two numbers', () => {
  test('divides the first through the second numbers', () => {
    expect(CalculatorModule.divide(3, 3)).toEqual(1);
  });
  test('throws Exception when dividing through zero.', () => {
    expect(CalculatorModule.divide(7, 0)).toEqual("You shall not divide through 0.");
  });
});

