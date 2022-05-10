import { includes } from './commonUtil.js'

export const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float seed;

varying vec2 v_texcoord;

${includes}

void main() {
  vec2 uv = v_texcoord;
  uv *= 2.0;
  uv -= 1.0;

  // find the distance between the mouse and points
  vec2 mouse = u_mouse / u_resolution;
  float dist = distance(uv, mouse);
  float strength = smoothstep(0.5, 0.0, dist);

  float hue = u_time * 0.02 + seed;

  // create two hsv colors
  vec3 hsv1 = vec3(hue,        0.9, 0.85);
  vec3 hsv2 = vec3(hue + 0.07, 0.85, 0.75);

  // convert hsv to rgb
  vec3 rgb1 = hsv2rgb(hsv1);
  vec3 rgb2 = hsv2rgb(hsv2);

  vec4 color1 = vec4(rgb1, 1.0);
  vec4 color2 = vec4(rgb2, 1.0);

  // make movement for fbm
  vec2 movement = vec2(u_time * 0.01, u_time * -0.01);
  movement *= rotation2d(u_time * 0.005);

  float f = fbm(uv + movement);
  f *= 10.0;
  f += u_time * 0.2;
  f = fract(f);

  float mixer = smoothstep(0.0, 0.1, f) - smoothstep(0.1, 0.2, f);
  vec4 color = mix(color1, color2, mixer);

  gl_FragColor = color;
}
`