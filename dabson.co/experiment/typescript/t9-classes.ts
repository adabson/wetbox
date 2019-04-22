class Animal {
	public favFood: string;
	static numOfAnimals: number = 0;
	constructor(private name: string, private owner: string ){
		Animal.numOfAnimals++;
	}
}