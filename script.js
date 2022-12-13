for (let i = 0; i < 15; i++) {
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
    //createInputArrayAndShowOnInputField(e);
    addPressedElementToInputArray(e);
    if (parseInt(pushedButton) == 14) {
      analyzeEquation();
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

function analyzeEquation() {
  let arrayWithUsableArgs = splitArrayInArrayOfArgs();
  let result = doOperation(arrayWithUsableArgs[1], arrayWithUsableArgs[0], arrayWithUsableArgs[2]);
  console.log("Final Result: " + result);
  arrayOfEquation.push(result);
  currentNum = "";
  arrayOfEquation.forEach(element => (currentNum = currentNum + element));
  input.value = currentNum;
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
      console.log("Element probably is an operation!");
      myOperation = elem;
      argumentForResultArr = evaluateArrToInt(currentArr);
      resultArr.push(argumentForResultArr);
      resultArr.push(elem);
      currentArr = Array();
    } else {
      currentArr.push(elem);
      console.log("currentArr: " + currentArr);
    }
  }
  console.log("resultArr: " + resultArr);
  return resultArr;
}

function evaluateArrToInt(arr) {
  console.log("Starting with arr: " + arr);
  let result = 0;
  arr.forEach(element => (result = result + element));
  console.log("result: " + result);
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



