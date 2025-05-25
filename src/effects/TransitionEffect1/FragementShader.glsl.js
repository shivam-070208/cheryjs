export default /* glsl */`
precision highp float;
uniform vec2 uMouse;
varying vec2 vUv;
uniform sampler2D uImage;
uniform float uTime;
uniform float uRadius;
uniform float uStrength;
uniform float uNoise;
uniform bool uLight;
uniform sampler2D uImage2;
float rand(float n){return fract(sin(n) * 43758.5453123);}
float rand(vec2 n){return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453123);}

float noise(float p){
    float fl = floor(p);
    float fc = fract(p);
    return mix(rand(fl), rand(fl + 1.0), fc);
}
    
float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

void main() {
    vec2 uv = vUv;
      vec2 guv = vUv;
    guv.x -= 0.5;
    guv.y -= 0.5;

    // Calculate distance from mouse
    float dist = length(guv - uMouse);

   
    float edgeNoise = noise(guv * 10.0 + uTime * 2.0 ) * uNoise;

    // Create mask for area following mouse, with wobbly edge
    float inside = step(dist, uRadius *edgeNoise);

    // Apply noise only inside the circle
    float n = noise(guv * 0.2);

    vec3 circle = mix(vec3(1.0), vec3(n), inside);

    // Apply wave distortion
    float waveX = sin(10.0 * uv.y + uTime * 2.0);
    float waveY = cos(10.0 * uv.x + uTime * 2.0);
    uv.x += (uStrength * 0.05) * waveX;
    uv.y += (uStrength * 0.05) * waveY;

    

    vec4 color = texture2D(uImage, uv);
   
    vec4 color2 = texture2D(uImage2,uv);
   gl_FragColor = mix(color,(vec4(n)+color2),inside);
}
`
