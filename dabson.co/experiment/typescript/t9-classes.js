class Animal {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        Animal.numOfAnimals++;
    }
}
Animal.numOfAnimals = 0;
