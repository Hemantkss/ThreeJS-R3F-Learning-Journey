uniform float uTime;
uniform float uSize;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;


void main()
{

    /**
    * Position
    */
    vec4 modelPosition = modelMatrix *  vec4(position, 1.0);

    // Spin the Galaxy
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffSet = ( 1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffSet;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness
    modelPosition.xyz += aRandomness;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    /**
    * Size
    */
    gl_PointSize = uSize * aScale;

    // Size Attinuation
    gl_PointSize *= ( 1.0 / - viewPosition.z );

    /**
    * Color
    */
    vColor = color;
    

}