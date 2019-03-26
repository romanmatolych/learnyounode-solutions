/**
 * BABY STEPS (Exercise 2 of 13)
 * Write a program that accepts one or more numbers as command-line arguments
  and prints the sum of those numbers to the console (stdout).
 */
console.log(process.argv.slice(2).reduce((a, b) => a + +b, 0));