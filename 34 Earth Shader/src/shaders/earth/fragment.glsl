uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwiLightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // Sun Orientation
    float sunOrientation = dot(uSunDirection, normal);

    // Day / Night Color
    float dayMix = smoothstep(- 0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uDayTexture, vUv).rgb;
    vec3 nightColor = texture(uNightTexture, vUv).rgb;
    color = mix(nightColor, dayColor, dayMix);

    // Specular Clouds color
    vec2 specularCloudsColor = texture(uSpecularCloudsTexture, vUv).rg;

    // Clouds Color
    float CloudsMix = smoothstep(0.5, 1.0, specularCloudsColor.g);
    CloudsMix *= dayMix;
    CloudsMix *= specularCloudsColor.r;
    color = mix(color, vec3(1.0), CloudsMix);

    // Fresnel
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    // Atmosphere Color
    float atmosphereDayMix = smoothstep(- 0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwiLightColor, uAtmosphereDayColor, atmosphereDayMix);
    color = mix(color, atmosphereColor, fresnel * atmosphereDayMix);

    // Specular
    vec3 refelection = reflect(- uSunDirection, normal);
    float specular =  - dot(refelection, viewDirection);
    specular = max(specular, 0.0);
    specular = pow(specular, 40.0);
    specular *= specularCloudsColor.r;

    vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
    color += specular * specularColor;
    


    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}