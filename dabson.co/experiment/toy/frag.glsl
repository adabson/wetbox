  uniform float time;
  uniform vec2 resolution;
  //fragCoord.xy; = gl_FragCoord
  //gl_FragCoord.xy / resolution.xy;

//ORIGINAL 
/*
    float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
    float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
    gl_FragColor = vec4(vec3(max(x, y)), 1.); //,.2,1.
*/

//FIRSTBLOOD
  // gl_FragColor = vec4( gl_FragCoord.x, sin(time*.01), 1., 1.);

  void main() {
    float t = time * .01; //slowtime
    float x = gl_FragCoord.x;
    float y = gl_FragCoord.y;

    float red = sin( t + gl_FragCoord.x * 14. / resolution.x );
    float green = cos( t + gl_FragCoord.y * 14. / resolution.y );
    float blue = sin( time * .01 );

    //gl_FragColor = vec4( red, green, blue, 1. );
    vec3 triplet = vec3( red, green, blue );

//if( mod( x, 50. ) < 15. && mod( y, 50. ) < 15. ) { good, but no rotate
    if( mod( x, 50. ) < 15. && mod( y, 50. ) < 15. ) {
      triplet = vec3( 1. ); //white aka 1,1,1
    }

    gl_FragColor = vec4( triplet, 1. );
    /*
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        gl_fragColor = vec4( uv, 0.5+0.5*sin(time), 1. );
    */

  }