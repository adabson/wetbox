import 'core-js/fn/array/includes';

let currentBlurbIndex = 4;
const blurbSpeedMs = 4000;
const blurbs = [
  "Functional, configurable,<br>fully customisable<br>solutions ",
  "Tens of millions<br>of transactions<br>processed daily",
  "Innovative payment<br>platforms",
  "Industry and<br>technical experts",
  "PCI-DSS compliant",
  "Westpac fintech"
];


function randInt( n ) {
  return Math.floor( Math.random() * n );
}

function setBlurb() {
  document.getElementById( "blurb" ).innerHTML = blurbs[currentBlurbIndex];
}

function generateBlurb() {
  let next = currentBlurbIndex;
  while( currentBlurbIndex === next ) {
    next=randInt(blurbs.length); //get distinct 
  }

  currentBlurbIndex = next;
  setBlurb();
}

setInterval( generateBlurb, blurbSpeedMs );
document.getElementById('copyYear').innerText = ((new Date()).getFullYear());

window.requestAnimFrame = function() {
  return (
    window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    }
  );
}();

let canvas = document.getElementById( "home" ); 
let context = canvas.getContext( "2d" );
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particle_count = 80,
particles = [],
couleurs = ["#f8c343", "#f7d27c", "#dada36", "#aa9", "#fbee62", "#eeee44"];
function Particle() {
  this.radius = Math.round(Math.random()*4+1);
  this.x = Math.floor((Math.random() * canvas.width) + this.radius); 
  this.y =  Math.floor((Math.random() * canvas.height) + this.radius); 
  this.color = couleurs[Math.round(Math.random()*couleurs.length)];
  this.speedx = Math.round((Math.random()*201)+0)/100;
  this.speedy = Math.round((Math.random()*201)+0)/100;

  switch (Math.round(Math.random()*couleurs.length)) {
    case 1:
    this.speedx *= 1;
    this.speedy *= 1;
    break;
    case 2:
    this.speedx *= -1;
    this.speedy *= 1;
    break;
    case 3:
    this.speedx *= 1;
    this.speedy *= -1;
    break;
    case 4:
    this.speedx *= -1;
    this.speedy *= -1;
    break;
  }

  this.move = function() {
    context.beginPath();
    context.globalCompositeOperation = "source-over";
    context.fillStyle   = this.color;
    context.globalAlpha = 1;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();

    this.x = this.x + this.speedx;
    this.y = this.y + this.speedy;
    
    if(this.x <= 0+this.radius) {
      this.speedx *= -1;
    }
    if(this.x >= canvas.width-this.radius) {
      this.speedx *= -1;
    }
    if(this.y <= 0+this.radius) {
      this.speedy *= -1;
    }
    if(this.y >= canvas.height-this.radius) {
      this.speedy *= -1;
    }

    for (let j = 0; j < particle_count; j++) {
      let particleActuelle = particles[j],
        yd = particleActuelle.y - this.y,
        xd = particleActuelle.x - this.x,
        d  = Math.sqrt(xd * xd + yd * yd);

      if ( d < 200 ) {
        context.beginPath();
        context.globalAlpha = (200 - d) / (200 - 0);
        context.globalCompositeOperation = "source-over"; //destination-over ?
        context.lineWidth = .5;
        context.moveTo(this.x, this.y);
        context.lineTo(particleActuelle.x, particleActuelle.y);
        context.strokeStyle = this.color;
        context.lineCap = "round";
        context.stroke();
        context.closePath();
      }
    }
  };
};
for (let i = 0; i < particle_count; i++) {
  let particle = new Particle();
  particles.push(particle);
}

let drawBg = function() {
  // Dynamic resize 
  context.canvas.width  = window.innerWidth;
  context.canvas.height = window.innerHeight;

  let grd=context.createRadialGradient( canvas.width * .5, canvas.height * 1.5, 5,
    canvas.width * .5, canvas.height * .9, canvas.width * .7 );
  grd.addColorStop(0,"#621a4b");
  grd.addColorStop(1,"#231433");


  // Fill with gradient
  context.globalCompositeOperation = "source-over";
  context.fillStyle=grd;
  context.fillRect(0,0,canvas.width,canvas.height);
};

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBg();
  for (let i = 0; i < particle_count; i++) {
    particles[i].move();
  }
  requestAnimFrame(animate);
}

function generateStatus() {
  fetchStatus( "https://qvalent.statuspage.io/index.json", updateStatus );
}

function fetchStatus( url, callback ) {
  let xhr = new XMLHttpRequest();
  xhr.open( "GET", url, true );
  xhr.responseType = "json";
  xhr.onload = function() {
    let status = xhr.status;
    if (status === 200) {
      callback( null, xhr.response );
    } else {
      callback( status, xhr.response );
    }
  };
  xhr.send();
}

function updateStatus( errorCode, response ) {
  if( errorCode != null ) {
    document.getElementById( "systemList" ).innerHTML = "Service is currently unavailable";
    return; 
  }
  let relevant = new Array( "PayWay", "WIBS", "QuickSuper", "PaymentsPlus", "QuickStream: General" );
  let components = !(response.components) ? JSON.parse( response ).components : response.components;
  let component;
  for( let i=0; i<components.length; i++ ) {
    component = components[i];
    if( relevant.includes( component.name ) ) {
      setStatus( component.name, component.status );
    }
  }
}

function setStatus( componentName, componentStatus ) {
  let componentId = "sys_" + ( componentName === "QuickStream: General" ? "QuickStream" : componentName );
  let el  = document.getElementById( componentId );
  let img = el.getElementsByTagName( "div" )[0];
  let bar = el.getElementsByTagName( "a" )[0];
  bar.classList.remove( "up" );
  bar.classList.remove( "down" );
  bar.classList.remove( "poll" );
  img.classList.remove( "up" );
  img.classList.remove( "down" );
  img.classList.remove( "poll" );
  img.alt = img.title = bar.title = "";

  if( el && ( componentStatus === "operational" || componentStatus === "under_maintenance" ) ) {
    bar.classList.add( "up" );
    img.classList.add( "up" );
  } else if( el && componentStatus === "major_outage" ) {
    bar.classList.add( "down" );
    img.classList.add( "down" );
  } else {
    bar.classList.add( "poll" );
    img.classList.add( "poll" );
  }
  let validStatus = new Array( "operational", " major_outage", "partial_outage", "degraded_performance", "under_maintenance" );
  img.alt = img.title = bar.title = ( validStatus.includes( componentStatus ) ? componentStatus : "unknown" );
}

animate(); 
generateBlurb();
generateStatus();

let favIcon = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0NEY4NDFCM0U0NzFFODExOEU2QTg2RDlGQzUyQ0Q2QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNDBFOTg1ODcyMUExMUU4ODhGOEFBQzJGOTZEMzdBQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNDBFOTg1NzcyMUExMUU4ODhGOEFBQzJGOTZEMzdBQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2Rjg0MUIzRTQ3MUU4MTE4RTZBODZEOUZDNTJDRDZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ0Rjg0MUIzRTQ3MUU4MTE4RTZBODZEOUZDNTJDRDZCIi8+IDwvcmRmOkRlc2NyaXB0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";
let docHead = document.getElementsByTagName( "head" )[0];       
let favLink = document.createElement( "link" );
favLink.rel = "shortcut icon";
favLink.href = "data:image/png;base64,"+favIcon;
docHead.appendChild(favLink);

let manifestJson = {"name":"Qvalent","short_name":"Qvalent","start_url":".","display":"standalone","background_color":"#462866","theme_color":"#462866","description":"A brochure of Qvalent and their product offerings."};    
let manifestLink = document.createElement( "link" );
manifestLink.rel = "manifest";
manifestLink.href = "data:application/manifest+json,"+JSON.stringify(manifestJson);
docHead.appendChild(manifestLink);
