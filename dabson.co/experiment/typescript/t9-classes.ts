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

	static function getNumOfAnimals(): number {
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
writeLn( ani.getNumOfAnimals() );
ani.weight = 23;
writeLn( ani.weight );