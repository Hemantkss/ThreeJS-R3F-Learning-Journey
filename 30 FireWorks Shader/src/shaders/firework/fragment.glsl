uniform sampler2D uTextures;
uniform vec3 uColor;

void main(){

    float textureAlpha = texture(uTextures, gl_PointCoord).r;
    
    // Final Color
    gl_FragColor = vec4(uColor, textureAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}