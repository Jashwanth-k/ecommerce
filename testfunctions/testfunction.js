function sum(a, b) {
  return a + b;
}

function checkNumbersErr(n) {
  if (typeof n === "number") throw "n is a number";
  else throw "n is not a number";
}

module.exports = { sum, checkNumbersErr };
