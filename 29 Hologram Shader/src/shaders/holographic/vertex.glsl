uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

#include  ../includes/random2D.glsl

void main(){
    // position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // glitch Effect
    float glitchTime = uTime - modelPosition.y;
    float glitchStrenght = sin(glitchTime) + sign(glitchTime * 3.45) + sin(glitchTime * 8.76);
    glitchStrenght /= 3.0;
    glitchStrenght = smoothstep(0.3, 1.0, glitchStrenght);
    glitchStrenght *= 0.25;
    modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrenght;
    modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrenght;

    // Final Position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Model Normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varying
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}
