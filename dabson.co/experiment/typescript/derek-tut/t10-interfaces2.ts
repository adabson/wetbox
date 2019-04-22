interface Vehicle {
	drive(): any;
}

class Car implements Vehicle{
	constructor(private wheels: number) {}
	drive(): void{
		writeLn("The car drives with " + this.wheels + " wheels");
	}
}

class Bike implements Vehicle{ 
	constructor(private wheels: number) {}
	drive(): void{
		writeLn("The bike drives with " + this.wheels + " wheels");
	}
}

var car = new Car(4);
var bike = new Bike(2);

// car.drive();
// bike.drive();

function callDrive<v extends Vehicle>(veh: v): number {
	return veh.drive();
}

callDrive(car);
callDrive(bike);