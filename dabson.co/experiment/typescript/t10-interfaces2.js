class Car {
    constructor(wheels) {
        this.wheels = wheels;
    }
    drive() {
        writeLn("The car drives with " + this.wheels + " wheels");
    }
}
class Bike {
    constructor(wheels) {
        this.wheels = wheels;
    }
    drive() {
        writeLn("The bike drives with " + this.wheels + " wheels");
    }
}
var car = new Car(4);
var bike = new Bike(2);
// car.drive();
// bike.drive();
function callDrive(veh) {
    return veh.drive();
}
callDrive(car);
callDrive(bike);
