//let numbers = document.getElementsByClassName("number");
for (let i = 0; i < 10; i++) {
  let number = document.getElementById(i.toString());
  number.addEventListener('click', pressNumber);
}

let input = document.getElementById("input");
let currentNum = 0;
input.value = currentNum;
let first = true;

function pressNumber(e) {
  console.log("Pressed: " + e.target.id);

  if (first) {
    currentNum = e.target.id;
    first = false;
  } else {
    let arrOfNums = currentNum.split('');
    console.log(arrOfNums);
    arrOfNums.push(e.target.id);
    currentNum = "";
    arrOfNums.forEach(element => (currentNum = currentNum + element));
  }
  input.value = currentNum;
}






