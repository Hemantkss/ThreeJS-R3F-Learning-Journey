uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl
#include ../includes/pointLight.glsl

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;

    // Lights
    vec3 light = vec3(0.0);

    // Ambient Light
    light += ambientLight(
        vec3(1.0),     // Light Color
        0.03                 // Light Intensity
    );

    // Directional Light
    light += directionalLight(
        vec3(0.1, 0.1, 1.0),  // Light Color
        1.0,                            // Light Intensity
        normal,                         // Normal
        vec3(0.0, 0.0, 3.0), // Light Position
        viewDirection,                 // ViewDirection
        20.0                           // Specular Power
    );

    // Point Light
    light += pointLight(
        vec3(1.0, 0.1, 0.1),  // Light Color
        1.0,                            // Light Intensity
        normal,                         // Normal
        vec3(0.0, 2.5, 0.0), // Light Position
        viewDirection,                 // ViewDirection
        20.0,                          // Specular Power
        vPosition,                     // Position
        0.25                          // Light Decay
    );

    // Point Light
    light += pointLight(
        vec3(0.1, 1.0, 0.5),  // Light Color
        1.0,                            // Light Intensity
        normal,                         // Normal
        vec3(3.0, 1.0, 2.0), // Light Position
        viewDirection,                 // ViewDirection
        20.0,                          // Specular Power
        vPosition,                    // Position
        0.2                          // Light Decay
    );

    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}