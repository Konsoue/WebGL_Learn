
export const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D picture;

varying vec2 v_texcoord;

vec2 changeCoords(vec2 uv, float texture_radio, float canvas_radio) {
  if (texture_radio > canvas_radio) {
    float diff = canvas_radio / texture_radio;
    uv.x *= diff;
    uv.x += (1.0 - diff) / 2.0;
  } else {
    float diff = texture_radio / canvas_radio;
    uv.y *= diff;
    uv.y += (1.0 - diff) / 2.0;
  }
  return uv;
}


void main() {
  vec2 uv = v_texcoord;

  float texture_radio = 1.0;
  float canvas_radio = u_resolution.x / u_resolution.y;
  vec2 coords = changeCoords(uv, texture_radio, canvas_radio);
  vec2 mouse = u_mouse / u_resolution;

  // 分块采样
  float blocks = 8.0;
  float x = floor(uv.x * blocks) / blocks;
  float y = floor(uv.y * blocks) / blocks;

  // 设置一个安全区域, 避免边缘失真问题
  coords = mix(vec2(0.05, 0.05), vec2(0.95, 0.95), coords);

  // 添加扭曲效果
  vec2 distortion = 0.1 * vec2(
     sin(u_time * 0.5 + x * 0.8 + y * 0.9 + mouse.x * 2.0 + mouse.y * 0.5),
     cos(u_time * 0.1 + x * 1.1 + y * 1.5 + mouse.x * 0.5 + mouse.y)
  );

  // Output to screen
  gl_FragColor = texture2D(picture, coords + distortion);
}
`