var myName: string = "Dabson";
var myAge: number = 41;
var canVote: boolean = true;
var anything: any = "dog";
anything = 2;

let tsEl = document.getElementById("tsStuff");

tsEl.innerHTML = "My Name is " + myName;

document.write("myName is a " + typeof (myName) + "<br>");
document.write("canVote is a " + typeof (canVote) + "<br>");
document.write("myAge is a " + typeof (myAge) + "<br>");
document.write("anything is a " + typeof (anything) + "<br>");