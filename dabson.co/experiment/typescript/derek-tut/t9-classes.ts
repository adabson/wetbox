class Animal {
	public favFood: string;
	static numOfAnimals: number = 0;
	private _weight: number;

	constructor(private name: string, private owner: string ){
		Animal.numOfAnimals++;
	}

	ownerInfo() {
		writeLn(this.name + " is owned by " + this.owner);
	}

	static showNumOfAnimals(): number {
		return Animal.numOfAnimals;
	}

	get weight(): number {
		return this._weight;
	}

	set weight( weight: number ) {
		this._weight = weight;
	}
}

let ani = new Animal("Sir fluffkins", "Cruella De Vil");
ani.ownerInfo();
writeLn( "No of Animals: " + Animal.showNumOfAnimals() );
ani.weight = 23;
writeLn( ani.name + " weight = " + ani.weight );

class Dog extends Animal{
	constructor(name: string, owner: string) {
		super(name, owner);
		Dog.numOfAnimals++;
	}
}

var grover = new Dog("Grover", "Jimmy");
writeLn( "#Animals= " + Animal.showNumOfAnimals() );
writeLn( "Is a dog an animal? " + (grover instanceof Animal));
writeLn( "Does grover have a name? " + ('name' in grover) );