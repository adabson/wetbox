import { printLn } from './printLn';

let x: number = 3;

printLn(x);

let mySum = (num1:any, num2:any):number => {
	if(typeof num1=='string'){
		num1=parseInt(num1);
	}	
	if(typeof num2=='string'){
		num2=parseInt(num2);
	}

	return num1 + num2;
}