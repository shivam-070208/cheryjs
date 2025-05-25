export default /* glsl */`
precision highp float;
    varying vec2 vUv;
    varying vec3 pos;
    uniform float uTime;
    uniform float uStrength;

    void main() {
    
        vUv = uv;
       
        vec3 newPosition = position;

        
        float waveX = uStrength * sin(10.0 * uv.y + uTime * 2.0);
        float waveY = uStrength * cos(12.0 * uv.x + uTime * 1.5);
        
        float waveZ = uStrength * sin(10.0 * uv.x + uTime * 2.5);

        newPosition.x += waveX;
        newPosition.y += waveY;
        newPosition.z += waveZ;

        pos = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }`



