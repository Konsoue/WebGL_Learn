export const includes = `
#define NUM_OCTAVES 5

float random(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898, 72.15643))) * 43758.5453);
}

float noise (in vec2 _st) {
  vec2 i = floor(_st);
  vec2 f = fract(_st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

float fbm(vec2 _st) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  // Rotate to reduce axial bias
  mat2 rot = mat2(cos(0.5), sin(0.5),
                  -sin(0.5), cos(0.50));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(_st);
      _st = rot * _st * 2.0 + shift;
      a *= 0.5;
  }
  return v;
}

mat2 rotation2d(float angle) {
	float s = sin(angle);
	float c = cos(angle);

	return mat2(
		c, -s,
		s, c
	);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`