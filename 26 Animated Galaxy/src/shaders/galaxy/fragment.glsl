varying vec3 vColor;


void main() 
{

    /**
    *  Shaders Patterns
    */ 

    // 1 Disc Pattern
    // float strenght = distance(gl_PointCoord, vec2(0.5));
    // strenght = step(0.5, strenght);
    // strenght = 1.0 - strenght;

    // 2 Diffuse Pattern
    // float strenght = distance(gl_PointCoord, vec2(0.5));
    // strenght *= 2.0;
    // strenght = 1.0 - strenght;

    // 3 Light Point Pattern
    float strenght = distance(gl_PointCoord, vec2(0.5));
    strenght = 1.0 - strenght;
    strenght = pow(strenght, 10.0); 

    // Final Color
    vec3 color = mix(vec3(0.0), vColor, strenght);

    gl_FragColor =  vec4(color, 1.0);
}