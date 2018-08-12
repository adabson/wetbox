uniform float time;
uniform vec2 resolution;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 fragColor = vec4(vec3(length(uv)), 1.);
    gl_FragColor = fragColor;
}