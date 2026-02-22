precision highp float;
uniform sampler2D tMap;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(tMap, vUv);
  if (color.a < 0.1) discard;
  gl_FragColor = color;
}