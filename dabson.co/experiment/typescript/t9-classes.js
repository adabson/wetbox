class Animal {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        Animal.numOfAnimals++;
    }
    ownerInfo() {
        writeLn(this.name + " is owned by " + this.owner);
    }
}
Animal.numOfAnimals = 0;
let ani = new Animal("Sir fluffkins", "Cruella De Vil");
ani.ownerInfo();
