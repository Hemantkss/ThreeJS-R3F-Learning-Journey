uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

//  import Rotate 2d File
#include ../includes/rotate2D.glsl

void main() {
    vec3 newPosition = position;

    // Twist
    float twistPeriln = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.005)).r;

    float angle = twistPeriln * 10.0;
    newPosition.xz = rotate2d(newPosition.xz, angle);

    // Wind
    vec2 winfOffSet = vec2(
        texture(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.5, 
        texture(uPerlinTexture, vec2(0.75, uTime * 0.01)).r - 0.5
    );

    winfOffSet *= pow(uv.y, 2.0) * 10.0;
    newPosition.xz += winfOffSet;

    // Final Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // varying
    vUv = uv;
}