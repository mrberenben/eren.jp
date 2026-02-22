#version 300 es
precision highp float;
in vec2 a_position;
out vec2 vP;

void main(){
  vP = a_position * .5 + .5;
  gl_Position = vec4(a_position,0.,1.);
}