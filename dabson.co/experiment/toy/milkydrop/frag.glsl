uniform float time;
uniform vec2 resolution;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv -= .5; //dvds
    uv.x *= resolution.x / resolution.y;
    float d = length(uv);
    float r = .3;
    float c = smoothstep( r, r-.01, d );

    vec4 fragColor = vec4(vec3(c), 1.);
    gl_FragColor = fragColor;
}