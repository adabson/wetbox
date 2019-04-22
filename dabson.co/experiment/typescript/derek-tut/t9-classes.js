class Animal {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        Animal.numOfAnimals++;
    }
    ownerInfo() {
        writeLn(this.name + " is owned by " + this.owner);
    }
    static showNumOfAnimals() {
        return Animal.numOfAnimals;
    }
    get weight() {
        return this._weight;
    }
    set weight(weight) {
        this._weight = weight;
    }
}
Animal.numOfAnimals = 0;
let ani = new Animal("Sir fluffkins", "Cruella De Vil");
ani.ownerInfo();
writeLn("No of Animals: " + Animal.showNumOfAnimals());
ani.weight = 23;
writeLn(ani.name + " weight = " + ani.weight);
class Dog extends Animal {
    constructor(name, owner) {
        super(name, owner);
        Dog.numOfAnimals++;
    }
}
var grover = new Dog("Grover", "Jimmy");
writeLn("#Animals= " + Animal.showNumOfAnimals());
writeLn("Is a dog an animal? " + (grover instanceof Animal));
writeLn("Does grover have a name? " + ('name' in grover));
