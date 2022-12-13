for (let i = 0; i < 16; i++) {
  let number = document.getElementById(i.toString());
  number.addEventListener('click', pressButton);
}


let input = document.getElementById("input");
let currentNum = 0;
input.value = currentNum;
let firstPress = true;
let arrayOfEquation = Array();

function pressButton(e) {
  let pushedButton = e.target.id;
  console.log("Pressed ID: " + e.target.id);
  if (typeof parseInt(pushedButton) == 'number') {
    addPressedElementToInputArray(e);
    if (parseInt(pushedButton) == 14) {
      analyzeEquation();
    }
    if (parseInt(pushedButton) == 15) {
      arrayOfEquation = Array();
    }
    showEquationOnScreen(e);
  }
}

function addPressedElementToInputArray(e) {
  currentNum = e.target.innerText;
  arrayOfEquation.push(currentNum);
  console.log("Current ArrOfEquation: " + arrayOfEquation)
  currentNum = "";
}

function showEquationOnScreen() {
  let equationString = "";
  for (let i = 0; i < arrayOfEquation.length; i++) {
    equationString += arrayOfEquation[i];
    console.log("equationAsString: " + equationString);
  }
  input.value = equationString;
}

/**
 * someone pushed the '=' - now we analyze the equation
 */
function analyzeEquation() {
  let arrayWithUsableArgs = splitArrayInArrayOfArgs();
  let indexOfMultOperation = arrayWithUsableArgs.indexOf('*');
  console.log("Index of Mult: " + indexOfMultOperation);
  let indexOfDivOperation = arrayWithUsableArgs.indexOf('/');
  let result;
  let endlessStopper = 0;
  while ((indexOfDivOperation != -1) || (indexOfMultOperation != -1)) {
    endlessStopper++;
    console.log("Starting while loop, because there still is a mult or div operation with array: " + arrayWithUsableArgs);
    if (indexOfDivOperation == -1) {
      result =
          doOperation(arrayWithUsableArgs[indexOfMultOperation],
              arrayWithUsableArgs[indexOfMultOperation - 1],
              arrayWithUsableArgs[indexOfMultOperation + 1]);
      arrayWithUsableArgs.splice(indexOfMultOperation - 1, 3 , result);
      console.log("Result in Mult: " + result);
    } else if (indexOfMultOperation == -1 ) {
      result =
          doOperation(arrayWithUsableArgs[indexOfDivOperation],
              arrayWithUsableArgs[indexOfDivOperation - 1],
              arrayWithUsableArgs[indexOfDivOperation + 1]);
      arrayWithUsableArgs.splice(indexOfDivOperation - 1, 3 , result);
    } else {
      console.warn("Error! Should not happen.")
    }
    indexOfMultOperation = arrayWithUsableArgs.indexOf('*');
    indexOfDivOperation = arrayWithUsableArgs.indexOf('/');
    console.log("Array at the end of the iteration: " + arrayWithUsableArgs);
    if (endlessStopper > 5) {
      break;
    }
  }
  while (arrayWithUsableArgs.length != 2) {
    console.log("Array still has more than two elements.");
    let indexOfOperation = arrayWithUsableArgs.indexOf('+');
    if (indexOfOperation == -1) {
      indexOfOperation = arrayWithUsableArgs.indexOf('-');
      if (indexOfOperation == -1) {
        break;
      }
    }
    console.log("index of operation + or - : " + indexOfOperation);
    result = doOperation(arrayWithUsableArgs[indexOfOperation],
        arrayWithUsableArgs[indexOfOperation - 1],
        arrayWithUsableArgs[indexOfOperation + 1]);
    console.log("Result of operation: " + result);
    arrayWithUsableArgs.splice(indexOfOperation - 1, 3 , result);
    console.log("Array at the end: " + arrayWithUsableArgs);
  }
  console.log("Final Result: " + result);
  arrayOfEquation.push(result);
}

function splitArrayInArrayOfArgs() {
  let currentArr = Array();
  let resultArr = Array();
  for (let i = 0; i < arrayOfEquation.length; i++) {
    let elem = arrayOfEquation[i];
    let argumentForResultArr;
    let myOperation;
    console.log("elem: " + elem);
    //If it is not a number
    if (isNaN(elem)) {
      //console.log("Element probably is an operation!");
      myOperation = elem;
      argumentForResultArr = evaluateArrToInt(currentArr);
      resultArr.push(argumentForResultArr);
      resultArr.push(elem);
      currentArr = Array();
    } else {
      currentArr.push(elem);
      //console.log("currentArr: " + currentArr);
    }
  }
  console.log("resultArr: " + resultArr);
  return resultArr;
}

function evaluateArrToInt(arr) {
  console.log("Evaluating the following Array to an Integer: " + arr);
  let result = 0;
  arr.forEach(element => (result = result + element));
  console.log("Result as Integer: " + result);
  return parseInt(result);
}

function doOperation(operation, firstArg, secondArg) {
  switch (operation) {
    case "+":
      console.log("Adding");
      return add(firstArg, secondArg);
      break;
    case "-":
      console.log("Subtracting");
      return subtract(firstArg, secondArg);
      break;
    case "*":
      console.log("Multiplying");
      return multiply(firstArg, secondArg);
      break;
    case "/":
      console.log("Dividing");
      return divide(firstArg, secondArg);
      break;
  }
}


//operations:

function add() {
  let sum = 0.00;
  for (let number = 0; number < arguments.length; number++) {
    sum = sum + parseFloat(arguments[number]);
  }
  return sum;
}
function multiply() {
  let product = 1.00;
  for (let number = 0; number < arguments.length; number++) {
    product = product * parseFloat(arguments[number]);
  }
  return product;
}

function subtract() {
  let difference = parseFloat(arguments[0]);
  for (let number = 1; number < arguments.length; number++) {
    difference = difference - parseFloat(arguments[number]);
  }
  return difference;
}

function divide() {
  let divisor = parseFloat(arguments[1]);
  if (divisor === 0) {
    return "You shall not divide through 0.";
  }
  return parseFloat(arguments[0]) / divisor;
}



