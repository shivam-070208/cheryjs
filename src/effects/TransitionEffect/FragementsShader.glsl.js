export default /*glsl*/`
varying vec2 vUv;
uniform float uTime;
uniform sampler2D uImage;
uniform sampler2D uImage2;
uniform float uX;
uniform float uY;
void main(){
    vec2 uv = vUv;
    float uvScale=uv.x+uY*uv.y;    
    vec4 color1 = texture2D(uImage, uv);
  vec4 color2 = texture2D(uImage2, uv);
    uvScale/= 2.0;
    uv.x=step(uTime,fract(uX*1.0*uvScale) );
    gl_FragColor = mix(color2, color1, uv.x);
}
`