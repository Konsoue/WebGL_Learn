export const frag = `
#ifdef GL_ES
precision highp float;
#endif

#define SENGMENTS 32.0
#define PI 3.141592653589

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D image;

varying vec2 v_texcoord;

void main() {
  // 将坐标原点移动到中心
  vec2 uv = v_texcoord;
  uv *= 2.0;
  uv -= 1.0;

  vec2 mouse = u_mouse / u_resolution;


  // 计算极坐标的半径与角度
  float radius = length(uv) * mix(1.3, 1.7, mouse.x);
  float angle = atan(uv.y, uv.x);


  angle /= PI;
  angle *= SENGMENTS / 4.0;

  // 重复片段
  if(mod(angle, 2.0) >= 1.0) {
    angle = fract(angle);
  } else {
    angle = 1.0 - fract(angle);
  }

  angle += u_time * 0.2;
  angle += mouse.y;

  vec2 point = vec2(radius * cos(angle), radius * sin(angle));

  point = fract(point);

  vec4 color = texture2D(image, point);

  gl_FragColor = color;
}
`