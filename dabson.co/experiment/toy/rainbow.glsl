uniform float time;
uniform vec2 resolution;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv -= .5;
    uv.x *= resolution.x / resolution.y;
    float d = length(uv);
    float r = .3;
    float c = smoothstep( r, r-.01, d );

    //get the vector if its in the circle 
    vec2 veccyBoi = vec2(0.,0.);
    if( c != 0. ) {
      veccyBoi = vec2((gl_FragCoord.x-.5), (gl_FragCoord.y-.5));
    }
    float len = length( veccyBoi )/1000.;

    float red   = d;
    float green = len;
    float blue  = len * .5;

    vec4 fragColor = vec4(red,green,blue, 1.);
    gl_FragColor = fragColor;
}