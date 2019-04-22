class Animal {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        Animal.numOfAnimals++;
    }
    ownerInfo() {
        writeLn(this.name + " is owned by " + this.owner);
    }
    getNumOfAnimals() {
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
writeLn(ani.getNumOfAnimals());
ani.weight = 23;
writeLn(ani.weight);
