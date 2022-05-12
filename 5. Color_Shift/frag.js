
export const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D picture;
uniform float strength;
uniform float dpi;

varying vec2 v_texcoord;

vec4 edgeHandler(vec2 uv) {
  vec4 color = texture2D(picture, uv);
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) {
    color = vec4(0.0, 0.0, 0.0, 0.0); // 透明像素
  }
  return color;
}

mat2 rotation2d(float angle) {
	float s = sin(angle);
	float c = cos(angle);

	return mat2(
		c, -s,
		s, c
	);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 50.0 * dpi) / (u_resolution.xy - 100.0 * dpi);

  // 添加像素的长宽变化效果
  vec2 distortion = 0.06 * pow(strength, 0.4) * vec2(
    sin(u_time + uv.x * 8.0 + uv.y * 6.0),
    sin(u_time + uv.x * 7.0 + uv.y * 8.0)
  );

  vec4 blackChannel = edgeHandler(uv + distortion);
  blackChannel.r = 0.0;
  blackChannel.g = 0.0;
  blackChannel.b = 0.0;

  vec4 redChannel = edgeHandler(uv + distortion * rotation2d(3.0));
  redChannel.g = 0.0;
  redChannel.b = 0.0;
  redChannel.a = redChannel.r;

  vec4 greenChannel = edgeHandler(uv + distortion * rotation2d(1.0));
  greenChannel.r = 0.0;
  greenChannel.b = 0.0;
  greenChannel.a = greenChannel.g;

  vec4 blueChannel = edgeHandler(uv + distortion * rotation2d(2.0));
  blueChannel.r = 0.0;
  blueChannel.g = 0.0;
  blueChannel.a = blueChannel.b;


  vec4 color = blackChannel + redChannel + greenChannel + blueChannel;

  // Output to screen
  gl_FragColor = color;
}
`