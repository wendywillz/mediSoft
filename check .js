// const express = require("express");

// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.listen = (port, () => {
//   console.log(`Example app listening at ${port}`);
// });

// function countOccurrences(str, char) {
//   return str.split("").filter((ch) => ch === char).length;
// }

// function sumOfMultiples(limit){
//   let result = 0;
//   for (let i = 0; i <=limit; i++){
//     if (i % 3 === 0 || i % 5 === 0){
//       result += i;
//     }
//   }
//   return result;
// }

// console.log(sumOfMultiples(10));

// const mark = [90, 90, 90, 90];


// function calculateGrade(mark) {
  
//   let sum = 0;

//   for (let i = 0; i < mark.length; i++){
//     sum += mark[i];
//   }
//   let average = Math.floor(sum / mark.length);

//   if (average >= 1 && average <= 59){
//     return "F";
//   }
//   if (average >= 60 && average <= 69) {
//     return "D";
//   }
//   if (average >= 70 && average <= 79) {
//     return "C";
//   }
//   if (average >= 80 && average <= 89) {
//     return "B";
//   }
//   if (average >= 90 && average <= 100) {
//     return "A";
//   }
// }
// console.log(calculateGrade(mark));


// function showStars(rows){
//   for (let i = 0; i < rows; i++){

//   }
// }

let arr = [121, 122, 123, 124, 125, 120, 122, 132];
let str = arr.join("");
console.log(str);
console.log(str.charAt(0));
console.log(str.charAt(1));