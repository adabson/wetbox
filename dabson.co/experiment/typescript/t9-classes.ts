class Animal {
	public favFood: string;
	static numOfAnimals: number = 0;
	constructor(private name: string, private owner: string ){
		Animal.numOfAnimals++;
	}

	ownerInfo() {
		writeLn(this.name + " is owned by " + this.owner);
	}
}

let ani = new Animal("Sir fluffkins", "Cruella De Vil");
ani.ownerInfo();