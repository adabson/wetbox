var employees: string[] = ["Bob", "Sally", "Sam"];

employees.push("x5");

document.write(employees.toString()+"<br>");

interface SuperHero {
	realName: String;
	superName: String;
}

var superheros: SuperHero[] = [];

superheros.push({
	realName: 'Bruce Wayne',
	superName: 'Batman'
});

document.write(superheros[0].realName + " is " + superheros[0].superName + "<br>");