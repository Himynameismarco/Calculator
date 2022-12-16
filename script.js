for (let i = 0; i < 17; i++) {
  let number = document.getElementById(i.toString());
  number.addEventListener('click', pressButton);
}


let input = document.getElementById("input");
let currentNum = 0;
input.value = currentNum;
let arrayOfEquation = Array();
const arrayOfOperations = ['+', '-', '*', '/'];

function pressButton(e) {
  let pushedButton = e.target.id;
  console.log("Pressed ID: " + e.target.id);
  if (typeof parseInt(pushedButton) == 'number') {
    addPressedElementToInputArray(e);
    // =
    if (parseInt(pushedButton) == 14) {
      analyzeEquation();
    }
    showEquationOnScreen(e);
    // clear
    if (parseInt(pushedButton) == 15) {
      setInputToStart();
    }
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
  if (arrayWithUsableArgs === null) {
    console.warn("Elements of Array could not be split into usable elements.");
    return null;
  }
  let indexOfMultOperation = arrayWithUsableArgs.indexOf('*');
  let indexOfDivOperation = arrayWithUsableArgs.indexOf('/');
  let result;
  let endlessLoopBreaker = 0;

  console.log("Analyzing this usable Array: " + arrayWithUsableArgs);

  // do all '*' and '/' operations
  while ((indexOfDivOperation != -1) || (indexOfMultOperation != -1)) {
    console.log("Still a '*' or '/' in array with usable args: "
        + arrayWithUsableArgs);
    let indexOfOperation = 0;
    let operation = "";
    let firstArg = 1;
    let secondArg = 1;


    // no '/' operations, do '*'; no '*' do '/'
    if (indexOfDivOperation == -1) {
      indexOfOperation = indexOfMultOperation;
      operation = arrayWithUsableArgs[indexOfMultOperation];
      firstArg = arrayWithUsableArgs[indexOfMultOperation - 1];
      secondArg = arrayWithUsableArgs[indexOfMultOperation + 1];
    } else if (indexOfMultOperation == -1 ) {
      indexOfOperation = indexOfDivOperation;
      operation = arrayWithUsableArgs[indexOfDivOperation];
      firstArg = arrayWithUsableArgs[indexOfDivOperation - 1];
      secondArg = arrayWithUsableArgs[indexOfDivOperation + 1];
    } else {
      console.warn("ERROR! Tried to multiply or divide even though "
          + "there was no multiplication or division sign in the "
          + "array with usable args.")
    }
    result = doOperation(operation, firstArg, secondArg);

    // replace firstArg, operation, and secondArg by result
    arrayWithUsableArgs.splice(indexOfOperation - 1, 3 , result);

    indexOfMultOperation = arrayWithUsableArgs.indexOf('*');
    indexOfDivOperation = arrayWithUsableArgs.indexOf('/');
    console.log("Array at the end of the iteration: " + arrayWithUsableArgs);
    endlessLoopBreaker++;
    if (endlessLoopBreaker > 50) {
      break;
    }
  }

  // do '+' and '-' operations
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
    endlessLoopBreaker++;
    if (endlessLoopBreaker > 50) {
      break;
    }
  }
  endlessLoopBreaker = 0;
  console.log("Final Result: " + result);
  arrayOfEquation.push(result);
}

function checkUsableArrayForMistakesInEquation() {

  // check if array starts with an operation
  if (arrayOfEquation.indexOf('*') == 0
      || arrayOfEquation.indexOf('/') == 0
      || arrayOfEquation.indexOf('=') == 0) {
    return false;
  }

  // check if two operations follow after each other
  for (let i = 0; i < arrayOfEquation.length; i++) {
    let elem = arrayOfEquation[i];
    let indexOfPrevOperation;
    if (arrayOfOperations.includes(elem)) {
      if (indexOfPrevOperation == i - 1) {
        return false;
      }
      indexOfPrevOperation = i;
    }
  }
  return true;
}


function splitArrayInArrayOfArgs() {
  let currentArr = Array();
  let resultArr = Array();

  let isArrayUsable = checkUsableArrayForMistakesInEquation(arrayOfEquation);

  if (!isArrayUsable) {
    alert("Something went wrong in the equation. "
        + "Try again: Start with a number, moreover it doesn't make sense to "
        + "have two operations followed by another.");
    setInputToStart();
    return null;
  }

  for (let i = 0; i < arrayOfEquation.length; i++) {
    let elem = arrayOfEquation[i];
    let argumentForResultArr;
    let myOperation;
    console.log("elem: " + elem);
    //If it is neither a number nor a point
    if (isNaN(elem) && !(elem.includes('.'))) {
      //console.log("Element probably is an operation!");
      myOperation = elem;
      argumentForResultArr = evaluateArrToFloat(currentArr);
      resultArr.push(argumentForResultArr);
      resultArr.push(elem);
      currentArr = Array();
    } else {
      currentArr.push(elem);
      //console.log("currentArr: " + currentArr);
    }
  }
  console.log("Array with usable Args: " + resultArr);
  return resultArr;
}

function evaluateArrToFloat(arr) {
  console.log("Evaluating the following Array to an Integer: " + arr);
  let result = 0;
  arr.forEach(element => (result = result + element));
  console.log("Result as Integer: " + parseFloat(result));
  return parseFloat(result);
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

function setInputToStart() {
  arrayOfEquation = Array();
  input.value = 0;
}


//operations -- I first wrote the equations and tested them using the tests.js
// class. I do not know yet how to use objects in JS. I think I will learn it soon.
// For now, I just copy pasted the fucntions from the tests.js file.

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



