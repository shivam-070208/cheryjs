export default /* glsl */`
precision highp float;

varying vec2 vUv;
uniform sampler2D uImage;
uniform float uTime;

uniform float uStrength;
uniform bool uLight;


void main() {
    vec2 uv = vUv;
    

   
  

    // Apply wave distortion
    float waveX = sin(10.0 * uv.y + uTime * 2.0);
    float waveY = cos(10.0 * uv.x + uTime * 2.0);
    uv.x += (uStrength * 0.05) * waveX;
    uv.y += (uStrength * 0.05) * waveY;

    

    vec4 color = texture2D(uImage, uv);
    if(uLight){
        color.x+=smoothstep(0.001,0.6,sin(2.0*uTime));
        color.y+=smoothstep(0.2,0.6,sin(0.2*uTime));
    }
    
   gl_FragColor = color;
}
`;
