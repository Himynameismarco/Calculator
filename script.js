module.exports = {
  add: function add() {
    let sum = 0.00;
    for (let number = 0; number < arguments.length; number++) {
      sum = sum + parseFloat(arguments[number]);
    }
    return sum;
  },
  multiply: function multiply() {
    let product = 1.00;
    for (let number = 0; number < arguments.length; number++) {
      product = product * parseFloat(arguments[number]);
    }
    return product;
  },
  subtract: function subtract() {
    let difference = parseFloat(arguments[0]);
    for (let number = 1; number < arguments.length; number++) {
      difference = difference - parseFloat(arguments[number]);
    }
    return difference;
  },
  divide: function divide() {
    let divisor = parseFloat(arguments[1]);
    if (divisor === 0) {
      return "You shall not divide through 0.";
    }
    return parseFloat(arguments[0]) / divisor;
  }
};




