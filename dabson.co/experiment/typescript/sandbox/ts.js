import { printLn } from './printLn';
let x = 3;
printLn(x);
let mySum = (num1, num2) => {
    if (typeof num1 == 'string') {
        num1 = parseInt(num1);
    }
    if (typeof num2 == 'string') {
        num2 = parseInt(num2);
    }
    return num1 + num2;
};
