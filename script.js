module.exports = {};

module.exports.add = function add() {
  let sum = 0.00;
  for (let number = 0; number < arguments.length; number++) {
    sum = sum + parseFloat(arguments[number]);
  }
  return sum;
}

module.exports.multiply = function multiply() {
  let product = 1.00;
  for (let number = 0; number < arguments.length; number++) {
    product = product * parseFloat(arguments[number]);
  }
  return product;
}

module.exports.substract = function substract() {
  let difference = parseFloat(arguments[0]);
  for (let number = 1; number < arguments.length; number++) {
    difference = difference - parseFloat(arguments[number]);
  }
  return difference;
}

module.exports.divide = function divide() {
  return parseFloat(arguments[0]) / parseFloat(arguments[0]);
}