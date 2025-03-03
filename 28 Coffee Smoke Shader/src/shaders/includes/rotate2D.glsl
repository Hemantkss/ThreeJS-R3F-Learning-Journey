vec2 rotate2d(vec2 value, float angle) 
{
    float s = sign(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}