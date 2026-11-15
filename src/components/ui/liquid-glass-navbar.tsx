"use client"

/**
 * Nimbus UI · Liquid Navbar — “Waterline”
 * Adapted from the component supplied by guglielmogiannattasio.it.
 * React-only water physics, optional WebGL and synthesized sound, CSS fallback.
 * App integration adds router navigation, unique filter IDs and idle suspension.
 */
import * as React from 'react';

export type NimbusFx = 'plane' | 'drop' | 'spin' | 'glow' | 'wave' | 'pop' | 'none';
export type LiquidNavItem = { label: string; href?: string; icon?: React.ReactNode; fx?: NimbusFx };
export type LiquidNavbarProps = {
  items?: LiquidNavItem[]; defaultActive?: number; active?: number;
  onChange?: (index: number, item: LiquidNavItem) => void;
  onNavigate?: (href: string) => void;
  tone?: 'light' | 'dark'; compact?: boolean; sound?: boolean;
  className?: string; style?: React.CSSProperties;
};
const I = (children: React.ReactNode) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
export const NimbusIcons = {
  home: I(<><path d="M3.5 11.2 12 4l8.5 7.2" /><path d="M6 9.6V20h12V9.6" /><path className="nv-door" d="M10 20v-5h4v5Z" /></>),
  globe: I(<><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" /></>),
  plane: I(<path d="M21 12.2 3.6 5.4l2.7 6.8-2.7 6.4L21 12.2Zm-14.7 0H13" />),
  drop: I(<path d="M12 3.5s6 6.4 6 10.6a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5Z" />),
  user: I(<><circle cx="12" cy="8.5" r="3.8" /><path d="M4.8 20c1.2-3.4 4-5 7.2-5s6 1.6 7.2 5" /></>),
};
const DEFAULT_ITEMS: LiquidNavItem[] = [
  { label: 'Home', icon: NimbusIcons.home, fx: 'glow' },
  { label: 'Explore', icon: NimbusIcons.globe, fx: 'spin' },
  { label: 'Flights', icon: NimbusIcons.plane, fx: 'plane' },
  { label: 'Weather', icon: NimbusIcons.drop, fx: 'drop' },
  { label: 'Profile', icon: NimbusIcons.user, fx: 'wave' },
];
const PAD = 14;
const NIMBUS_CSS = `
.nimbus-nav{--n-tint:rgba(255,255,255,.14);--n-fg:#0b132b;--n-fg-soft:rgba(11,19,43,.72);--n-rim:rgba(255,255,255,.7);position:relative;display:inline-flex;align-items:center;gap:2px;padding:6px;border-radius:999px;isolation:isolate;font-family:ui-sans-serif,-apple-system,"SF Pro Text","Segoe UI",system-ui,sans-serif;-webkit-font-smoothing:antialiased;user-select:none;-webkit-tap-highlight-color:transparent}
.nimbus-nav[data-tone=dark]{--n-tint:rgba(10,18,40,.26);--n-fg:#f1f7ff;--n-fg-soft:rgba(241,247,255,.8);--n-rim:rgba(255,255,255,.34)}
.nimbus-glass{position:absolute;inset:0;border-radius:inherit;z-index:-2;overflow:hidden;background:var(--n-tint);-webkit-backdrop-filter:blur(6px) saturate(1.2);backdrop-filter:blur(6px) saturate(1.2);box-shadow:inset 0 1px 1px var(--n-rim),inset 0 0 0 1px rgba(255,255,255,.2),0 12px 32px -14px rgba(0,40,90,.35),0 2px 6px rgba(0,40,90,.08)}
.nimbus-water{position:absolute;left:-14px;top:-14px;z-index:-1;pointer-events:none;max-width:none}
.nimbus-nav[data-gl=off] .nimbus-water{display:none}
.nimbus-drop{display:none;position:absolute;top:6px;bottom:6px;left:0;border-radius:999px;z-index:-1;pointer-events:none;background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.75),rgba(255,255,255,0) 55%),rgba(255,255,255,.38);box-shadow:inset 0 1px 1px rgba(255,255,255,.95),inset 0 -2px 6px rgba(0,162,255,.22),inset 0 0 0 1px rgba(255,255,255,.55),0 6px 16px -6px rgba(0,70,140,.3)}
.nimbus-nav[data-tone=dark] .nimbus-drop{background:linear-gradient(150deg,rgba(225,242,255,.24),rgba(110,180,235,.13));box-shadow:inset 0 1px 1px rgba(225,242,255,.45),inset 0 0 0 1px rgba(210,235,255,.2),0 6px 16px -6px rgba(0,0,0,.35)}
.nimbus-nav[data-gl=off] .nimbus-drop{display:block}
.nimbus-item{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;gap:8px;height:42px;padding:0 16px;border:0;border-radius:999px;background:none;color:var(--n-fg-soft);font-family:inherit;font-weight:500;font-size:14px;line-height:1;letter-spacing:-.01em;text-decoration:none;cursor:pointer;transition:color .2s}
.nimbus-item:hover,.nimbus-item[aria-current=page]{color:var(--n-fg);text-decoration:none}
.nimbus-item:focus-visible{outline:2px solid #00a2ff;outline-offset:2px}
.nv-ico{position:relative;display:inline-flex;flex:none}.nv-ico svg{transition:transform .45s cubic-bezier(.3,1.6,.5,1)}
.nimbus-item[aria-current=page] .nv-ico svg{transform:translateY(-1px) scale(1.08)}.nv-door{fill:transparent}
.nv-ico[data-fx=pop] svg{animation:nvPop .5s cubic-bezier(.3,1.6,.5,1) both}
@keyframes nvPop{0%{transform:scale(.72)}60%{transform:scale(1.2)}100%{transform:translateY(-1px) scale(1.08)}}
.nv-ico[data-fx=plane] svg{animation:nvPlane 1.15s cubic-bezier(.55,0,.3,1) both}
@keyframes nvPlane{0%{transform:none}12%{transform:translate(-3px,2px) rotate(7deg)}42%{transform:translate(64px,-26px) rotate(-24deg) scale(.9);opacity:0}43%{transform:translate(-60px,16px) rotate(-12deg) scale(.9);opacity:0}58%{opacity:1}80%{transform:translate(3px,-1px) rotate(2deg)}100%{transform:translateY(-1px) scale(1.08)}}
.nv-ico[data-fx=plane]::after{content:"";position:absolute;left:55%;top:48%;height:2px;width:46px;border-radius:2px;transform-origin:0 50%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.95));animation:nvTrail 1.15s ease-out both;pointer-events:none}
@keyframes nvTrail{0%,8%{opacity:0;transform:rotate(-22deg) scaleX(0)}30%{opacity:.9;transform:rotate(-22deg) scaleX(1)}55%,100%{opacity:0;transform:rotate(-22deg) translateX(30px) scaleX(.2)}}
.nv-ico[data-fx=drop] svg{animation:nvDrop .95s cubic-bezier(.4,0,.3,1) both;transform-origin:50% 100%}
@keyframes nvDrop{0%{transform:translateY(-1px)}26%{transform:translateY(-13px) scale(.88,1.12)}46%{transform:translateY(3px) scale(1.3,.68)}62%{transform:translateY(-3px) scale(.92,1.08)}80%{transform:translateY(0) scale(1.04,.97)}100%{transform:translateY(-1px) scale(1.08)}}
.nv-ico[data-fx=drop]::before,.nv-ico[data-fx=drop]::after{content:"";position:absolute;bottom:0;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:currentColor;opacity:0;pointer-events:none}
.nv-ico[data-fx=drop]::before{animation:nvSplashL .95s ease-out both}.nv-ico[data-fx=drop]::after{animation:nvSplashR .95s ease-out both}
@keyframes nvSplashL{0%,44%{opacity:0;transform:none}50%{opacity:.9;transform:translate(-5px,-6px)}75%,100%{opacity:0;transform:translate(-11px,1px) scale(.4)}}
@keyframes nvSplashR{0%,44%{opacity:0;transform:none}50%{opacity:.9;transform:translate(5px,-7px)}75%,100%{opacity:0;transform:translate(12px,1px) scale(.4)}}
.nv-ico[data-fx=spin] svg{animation:nvSpin 1s cubic-bezier(.2,.75,.25,1) both}
@keyframes nvSpin{0%{transform:perspective(80px) rotateY(0)}100%{transform:perspective(80px) rotateY(360deg) translateY(-1px) scale(1.08)}}
.nv-ico[data-fx=glow] svg{animation:nvHop .8s cubic-bezier(.3,1.4,.5,1) both;transform-origin:50% 100%}
@keyframes nvHop{0%{transform:none}30%{transform:translateY(-5px) scale(1.04,.96)}55%{transform:translateY(0) scale(1.12,.88)}75%{transform:translateY(-2px) scale(.98,1.04)}100%{transform:translateY(-1px) scale(1.08)}}
.nv-ico[data-fx=glow] .nv-door{animation:nvDoor 1.3s ease both}@keyframes nvDoor{0%{fill:transparent}30%{fill:#fff3a8}100%{fill:rgba(126,232,255,.6)}}
.nv-ico[data-fx=wave] svg{animation:nvWave .9s ease-in-out both;transform-origin:50% 92%}
@keyframes nvWave{0%{transform:none}20%{transform:rotate(-15deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(4deg)}100%{transform:translateY(-1px) scale(1.08)}}
.nimbus-nav[data-compact=true] .nimbus-item{padding:0 13px}.nimbus-nav[data-compact=true] .nimbus-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media(max-width:520px){.nimbus-nav:not([data-compact=false]) .nimbus-item{padding:0 13px}.nimbus-nav:not([data-compact=false]) .nimbus-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}}
@media(prefers-reduced-motion:reduce){.nv-ico svg,.nv-ico::before,.nv-ico::after,.nv-door{animation:none!important;transition:none}}
@media(prefers-reduced-transparency:reduce){.nimbus-glass{background:var(--club-surface,#fff);backdrop-filter:none!important;-webkit-backdrop-filter:none!important}.nimbus-nav[data-tone=dark] .nimbus-glass{background:var(--club-surface,#162235)}}
/* Keep the navigation centered, with room around its first and last items. */
.nimbus-nav.club-liquid-nav{--n-tint:var(--club-nav-scrolled);padding:6px 16px;gap:2px;font-family:'Geist',system-ui,sans-serif}
.club-liquid-nav .nimbus-glass{inset:0;box-shadow:inset 0 0 0 1px var(--n-rim),0 6px 18px -10px rgba(0,40,90,.28)}
.club-liquid-nav .nimbus-item{--n-item-pad:16px;height:44px;min-height:44px;gap:8px;padding:0 var(--n-item-pad);font-size:14px;line-height:1;font-weight:500;letter-spacing:-.01em;white-space:nowrap}
.club-liquid-nav .nimbus-item[aria-current=page]{font-weight:700}
.club-liquid-nav .nimbus-item[data-first]{margin-left:-15px;padding-inline:calc(var(--n-item-pad) + 7.5px)}
.club-liquid-nav .nimbus-item[data-last]{margin-right:-15px;padding-inline:calc(var(--n-item-pad) + 7.5px)}
.club-liquid-nav .nimbus-item[data-first][data-last]{padding-inline:calc(var(--n-item-pad) + 15px)}
.club-liquid-nav .nimbus-drop{top:6px;bottom:6px}
.club-liquid-nav .nv-ico svg{width:18px;height:18px}
@media(min-width:1400px) and (max-width:1535px){.club-liquid-nav .nimbus-item{font-size:13px;--n-item-pad:13px}.club-liquid-nav .nv-ico svg{width:16px;height:16px}}
@media(min-width:1320px) and (max-width:1399px){.club-liquid-nav .nimbus-item{font-size:12.75px;--n-item-pad:11px;gap:7px}.club-liquid-nav .nv-ico svg{width:15px;height:15px}}
@media(min-width:1250px) and (max-width:1319px){.club-liquid-nav .nimbus-item{font-size:12px;--n-item-pad:9px;gap:6px}.club-liquid-nav .nv-ico svg{width:14px;height:14px}}
@media(min-width:1200px) and (max-width:1249px){.club-liquid-nav .nimbus-item{font-size:11.5px;--n-item-pad:7px;gap:6px}.club-liquid-nav .nv-ico svg{width:13px;height:13px}}
`;

const VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uDpr;uniform float uTime;uniform vec4 uPill;
uniform vec4 uBlob[6];uniform float uSy[6];uniform vec4 uRip[6];uniform vec3 uMouse;uniform float uDark;uniform float uAmb;
float sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float sdCap(vec2 p,vec4 B,float sy){p-=B.xy;p.y/=sy;p.x=max(abs(p.x)-B.z,0.);return(length(p)-B.w)*min(1.,sy);}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float dropD(vec2 p){float d=1e4;for(int i=0;i<6;i++){if(uBlob[i].w>.5){d=smin(d,sdCap(p,uBlob[i],uSy[i]),13.);}}return d;}
float pillD(vec2 p){vec2 h=uPill.zw*.5;return sdRB(p-uPill.xy-h,h,h.y);}
float lens(float d,float w){float t=clamp(-d/w,0.,1.);return sqrt(1.-(1.-t)*(1.-t));}
float waves(vec2 p){float w=0.;for(int i=0;i<6;i++){vec4 R=uRip[i];if(R.w>0.){float x=length(p-R.xy)-R.z*240.;w+=R.w*exp(-R.z*1.7)*sin(x*.3)*exp(-x*x/700.);}}
vec2 m=p-uMouse.xy;w+=uMouse.z*3.6*exp(-dot(m,m)/1000.);w+=uAmb*(sin(p.x*.05+uTime*1.2)*.45+sin(p.x*.13-uTime*.85+p.y*.2)*.25);return w;}
float H(vec2 p){float dp=pillD(p);return lens(dp,uPill.w*.36)*2.4+lens(dropD(p),11.)*7.5+waves(p)*smoothstep(0.,7.,-dp);}
float caus(vec2 p,float t){vec2 q=p;float c=0.;for(int i=0;i<3;i++){q+=vec2(sin(q.y*1.1+t),cos(q.x*1.3-t*.7))*.6;c+=1./(1.+16.*abs(sin(q.x)*sin(q.y)));}return c/3.;}
void main(){vec2 p=vec2(gl_FragCoord.x,uRes.y*uDpr-gl_FragCoord.y)/uDpr;float dp=pillD(p);if(dp>1.){gl_FragColor=vec4(0.);return;}float dd=dropD(p);float h0=lens(dp,uPill.w*.36)*2.4+lens(dd,11.)*7.5+waves(p)*smoothstep(0.,7.,-dp);vec3 n=normalize(vec3(h0-H(p+vec2(1.,0.)),h0-H(p+vec2(0.,1.)),1.));vec3 V=vec3(0.,0.,1.);
float spec=pow(max(dot(reflect(-normalize(vec3(-.45,-.8,.85)),n),V),0.),70.);float spec2=pow(max(dot(reflect(-normalize(vec3(.6,.75,.7)),n),V),0.),22.)*.3;float fres=clamp((1.-n.z)*4.,0.,1.);
vec3 irid=.5+.5*cos(6.2831*(vec3(0.,.33,.67)+fres*.85+p.x*.0028+uTime*.035));float pm=smoothstep(1.,-1.,dp);float dm=smoothstep(1.,-1.,dd)*smoothstep(1.,-2.,dp);float sh=smoothstep(9.,-9.,dropD(p-vec2(0.,5.)))*(1.-dm)*pm*(.11+.07*uDark);
vec3 c=vec3(0.,.14,.36)*sh;float a=sh;float pa=clamp(pm*(fres*.5+spec*.9+spec2),0.,1.)*smoothstep(0.,4.,-dp);c=mix(vec3(1.),irid,.5*fres)*pa+c*(1.-pa);a=pa+a*(1.-pa);if(dd>1.){gl_FragColor=vec4(c,a);return;}
float th=lens(dd,11.);float cs=caus((p+n.xy*th*18.)*.085,uTime*.9);vec3 tint=mix(vec3(.80,.95,1.),vec3(.55,.82,1.),uDark);float rim=dm*(1.-smoothstep(0.,8.,-dd));float cres=dm*smoothstep(.12,.55,dot(n.xy,normalize(vec2(.55,.85))))*smoothstep(0.,3.,-dd);float body=.5+.5*clamp(-n.y*3.,-1.,1.);
float da=dm*(.26+.14*body)*(1.-.35*uDark);vec3 dc=mix(tint,vec3(1.),body*.6);float la=rim*.22;vec3 lc=mix(vec3(0.,.42,.78),vec3(.1,.55,.95),uDark);dc=lc*la+dc*da*(1.-la);da=la+da*(1.-la);
la=clamp(cres*.7+smoothstep(.6,1.,cs)*.28*th*dm,0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);la=clamp(dm*(spec*1.2+spec2*.5),0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);la=dm*smoothstep(-2.,0.,dd)*.4;dc=mix(vec3(1.),irid,.35)*la+dc*(1.-la);da=la+da*(1.-la);c=dc+c*(1.-da);a=da+a*(1.-da);gl_FragColor=vec4(c,a);}`;

type Body = { x: number; v: number };
type Sat = { x: number; y: number; vx: number; vy: number; r: number; k: number };
type Rip = { x: number; y: number; age: number; amp: number };
type GLContext = { gl: WebGLRenderingContext; u: Record<string, WebGLUniformLocation | null>; dispose: () => void };
function makeState() {
  return { a: { x: 0, v: 0 } as Body, b: { x: 0, v: 0 } as Body, sy: { s: 1, v: 0 }, lead: 0, lagFrom: 0,
    sats: [] as Sat[], rips: [] as Rip[], t: { x: 0, cy: 0, q: 0, r: 21 }, q: 0,
    mouse: { x: 0, y: 0, s: 0, on: false }, moving: false, split: false, ready: false, w: 0, h: 0,
    intersecting: true, reduce: false, raf: 0, last: 0, time: 0, glc: null as GLContext | null, buffers: { blobs: new Float32Array(24), sy: new Float32Array(6), ripples: new Float32Array(24) } };
}
function initGL(canvas: HTMLCanvasElement): GLContext | null {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    shaders.push(shader); gl.shaderSource(shader, source); gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vs || !fs || !program) { shaders.forEach(s => gl.deleteShader(s)); if (program) gl.deleteProgram(program); return null; }
  gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return null; }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const location = gl.getAttribLocation(program, 'a');
  gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  const u: GLContext['u'] = {};
  for (const name of ['uRes', 'uDpr', 'uTime', 'uPill', 'uBlob', 'uSy', 'uRip', 'uMouse', 'uDark', 'uAmb']) u[name] = gl.getUniformLocation(program, name);
  return { gl, u, dispose: () => { gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(s => gl.deleteShader(s)); } };
}
export function getLiquidIndicatorBounds(left: number, width: number, navWidth: number, index: number, count: number) {
  const start = index === 0 ? 1 : left;
  const end = index === count - 1 ? navWidth - 1 : left + width;
  return { left: start, width: Math.max(0, end - start) };
}

export function LiquidNavbar({ items = DEFAULT_ITEMS, defaultActive = 0, active, onChange, onNavigate, tone = 'light', compact, sound = false, className, style }: LiquidNavbarProps) {
  const [inner, setInner] = React.useState(defaultActive);
  const current = active ?? inner;
  const navRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const dropRef = React.useRef<HTMLSpanElement>(null);
  const itemRefs = React.useRef<(HTMLElement | null)[]>([]);
  const iconRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const audio = React.useRef<AudioContext | null>(null);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const st = React.useRef(makeState());
  const [gl, setGl] = React.useState<'on' | 'off'>('off');
  const [fx, setFx] = React.useState({ i: -1, n: 0 });
  const darkRef = React.useRef(0);
  darkRef.current = tone === 'dark' ? 1 : 0;

  const draw = React.useCallback(() => {
    const s = st.current, T = s.t;
    if (!s.ready) return;
    const separation = Math.abs(s.a.x - s.b.x);
    const thin = Math.min(separation / (2 * (s.q + T.r) || 1), 1);
    const radius = T.r * (1 - .3 * thin);
    if (s.glc) {
      const { gl: g, u } = s.glc;
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      g.viewport(0, 0, g.drawingBufferWidth, g.drawingBufferHeight);
      g.uniform2f(u.uRes, s.w + PAD * 2, s.h + PAD * 2); g.uniform1f(u.uDpr, dpr); g.uniform1f(u.uTime, s.time);
      g.uniform4f(u.uPill, PAD, PAD, s.w, s.h);
      const { blobs, sy, ripples } = s.buffers;
      blobs.fill(0); sy.fill(1); ripples.fill(0);
      const head = s.lead === 0 ? s.a : s.b, tail = s.lead === 0 ? s.b : s.a;
      blobs.set([head.x, T.cy, s.q * (1 - .25 * thin), T.r * (1 - .12 * thin), tail.x, T.cy, s.q * (1 - .8 * thin), T.r * (1 - .5 * thin)]);
      sy[0] = sy[1] = s.sy.s;
      s.sats.slice(0, 4).forEach((d, i) => blobs.set([d.x, d.y, 0, d.r], 8 + i * 4));
      g.uniform4fv(u.uBlob, blobs); g.uniform1fv(u.uSy, sy);
      s.rips.slice(-6).forEach((r, i) => ripples.set([r.x, r.y, r.age, r.amp], i * 4));
      g.uniform4fv(u.uRip, ripples); g.uniform3f(u.uMouse, s.mouse.x, s.mouse.y, s.mouse.s);
      g.uniform1f(u.uDark, darkRef.current); g.uniform1f(u.uAmb, s.reduce ? 0 : (s.moving || s.rips.length ? .2 : 0));
      g.clearColor(0, 0, 0, 0); g.clear(g.COLOR_BUFFER_BIT); g.drawArrays(g.TRIANGLES, 0, 3);
    } else if (dropRef.current) {
      dropRef.current.style.width = `${separation + 2 * (s.q + radius)}px`;
      dropRef.current.style.transform = `translateX(${Math.min(s.a.x, s.b.x) - s.q - radius - PAD}px) scaleY(${s.sy.s})`;
    }
  }, []);
  const step = React.useCallback((dt: number, now: number) => {
    const s = st.current, T = s.t;
    s.time += dt; s.q += (T.q - s.q) * Math.min(1, dt * 12);
    const bodies = [s.a, s.b]; let still = true;
    if (s.reduce) { s.a.x = s.b.x = T.x; s.a.v = s.b.v = 0; s.q = T.q; s.sy.s = 1; s.sats = []; s.rips = []; }
    else {
      bodies.forEach((body, i) => {
        const lead = i === s.lead, k = lead ? 320 : 180, damping = lead ? 34 : 26;
        body.v += (k * (T.x - body.x) - damping * body.v) * dt * (!lead && now < s.lagFrom ? .08 : 1);
        body.x += body.v * dt;
        const lo = Math.min(PAD + 1 + s.q + T.r, T.x), hi = Math.max(PAD + s.w - 1 - s.q - T.r, T.x);
        if (body.x < lo || body.x > hi) { s.sy.v -= Math.min(Math.abs(body.v), 900) * .0016; body.x = Math.max(lo, Math.min(hi, body.x)); body.v *= -.25; }
        if (Math.abs(T.x - body.x) > .3 || Math.abs(body.v) > 3) still = false;
      });
      const syTarget = 1 - .2 * Math.min(Math.abs(bodies[s.lead].v) / 1500, 1);
      s.sy.v += (320 * (syTarget - s.sy.s) - 22 * s.sy.v) * dt; s.sy.s += s.sy.v * dt;
      if (Math.abs(s.sy.s - 1) > .002 || Math.abs(s.sy.v) > .02) still = false;
      const separation = Math.abs(s.a.x - s.b.x);
      const radius = T.r * (1 - .3 * Math.min(separation / (2 * (T.q + T.r) || 1), 1));
      if (!s.split && s.moving && separation - 2 * T.q - 2 * radius > -6) {
        s.split = true;
        const lo = bodies[1 - s.lead], hi = bodies[s.lead];
        [.3, .5, .72].forEach((t, j) => s.sats.push({ x: lo.x + (hi.x - lo.x) * t + (Math.random() - .5) * 6, y: T.cy + (Math.random() - .5) * 10, vx: (lo.v + hi.v) * .45, vy: (Math.random() - .5) * 60, r: 5 + Math.random() * 3 - j * .5, k: 120 + Math.random() * 80 }));
      }
      s.sats = s.sats.filter(d => {
        d.vx += (d.k * (T.x - d.x) - 18 * d.vx) * dt; d.vy += (90 * (T.cy - d.y) - 16 * d.vy) * dt;
        d.x += d.vx * dt; d.y += d.vy * dt;
        d.x = Math.max(PAD + 8 + d.r, Math.min(PAD + s.w - 8 - d.r, d.x));
        d.y = Math.max(T.cy - T.r + d.r, Math.min(T.cy + T.r - d.r, d.y));
        if (Math.abs(T.x - d.x) < T.q + T.r * .5) d.r -= dt * 26;
        return d.r > .6;
      });
      if (s.sats.length) still = false;
    }
    if (s.moving && still) { s.moving = false; if (!s.reduce) s.rips.push({ x: T.x, y: T.cy, age: 0, amp: s.split ? 1.2 : .7 }); }
    s.rips = s.rips.slice(-6); s.rips.forEach(r => { r.age += dt; }); s.rips = s.rips.filter(r => r.age < 1.1);
    s.mouse.s = s.reduce ? 0 : s.mouse.s + ((s.mouse.on ? 1 : 0) - s.mouse.s) * Math.min(1, dt * 7);
  }, []);
  const loop = React.useCallback(() => {
    const s = st.current;
    if (s.raf || !s.intersecting || document.hidden) return;
    s.last = performance.now();
    const tick = (now: number) => {
      s.raf = 0;
      if (!s.intersecting || document.hidden) return;
      const dt = Math.min((now - s.last) / 1000, 1 / 30); s.last = now;
      step(dt, now); draw();
      const busy = s.moving || s.rips.length || s.sats.length || Math.abs(s.q - s.t.q) > .1 || (!s.reduce && Math.abs((s.mouse.on ? 1 : 0) - s.mouse.s) > .01);
      if (busy) s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
  }, [draw, step]);
  const measure = React.useCallback(() => {
    const nav = navRef.current, element = itemRefs.current[current], s = st.current;
    if (!nav) return;
    if (!element) { s.ready = false; if (dropRef.current) dropRef.current.style.opacity = '0'; if (canvasRef.current) canvasRef.current.style.opacity = '0'; return; }
    if (dropRef.current) dropRef.current.style.opacity = '1'; if (canvasRef.current) canvasRef.current.style.opacity = '1';
    const navBounds = nav.getBoundingClientRect(), itemBounds = element.getBoundingClientRect();
    s.w = navBounds.width; s.h = navBounds.height;
    const bounds = getLiquidIndicatorBounds(itemBounds.left - navBounds.left, itemBounds.width, s.w, current, items.length);
    const T = s.t; T.r = itemBounds.height / 2; T.q = Math.max(0, bounds.width / 2 - T.r); T.cy = PAD + itemBounds.top - navBounds.top + itemBounds.height / 2;
    const nx = PAD + bounds.left + bounds.width / 2;
    if (!s.ready) { s.a.x = s.b.x = nx; s.q = T.q; s.ready = true; }
    else if (Math.abs(nx - T.x) > .5) { s.lead = Math.abs(nx - s.a.x) <= Math.abs(nx - s.b.x) ? 0 : 1; s.lagFrom = performance.now() + 30; s.moving = true; s.split = false; }
    T.x = nx;
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 1), width = s.w + PAD * 2, height = s.h + PAD * 2;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; }
    }
    loop();
  }, [current, loop, items.length]);
  const measureRef = React.useRef(measure); measureRef.current = measure;
  React.useEffect(() => {
    const s = st.current, canvas = canvasRef.current, pendingTimers = timers.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const configure = () => {
      cancelAnimationFrame(s.raf); s.raf = 0; s.reduce = preference.matches;
      s.glc?.dispose(); s.glc = !s.reduce && canvas ? initGL(canvas) : null;
      setGl(s.glc ? 'on' : 'off'); measureRef.current();
    };
    const lost = (event: Event) => { event.preventDefault(); s.glc = null; setGl('off'); loop(); };
    const observer = new IntersectionObserver(([entry]) => { s.intersecting = entry.isIntersecting; if (s.intersecting) loop(); else { cancelAnimationFrame(s.raf); s.raf = 0; } });
    if (navRef.current) observer.observe(navRef.current);
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(s.raf); s.raf = 0; } else loop(); };
    configure(); preference.addEventListener('change', configure);
    canvas?.addEventListener('webglcontextlost', lost); canvas?.addEventListener('webglcontextrestored', configure);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect(); preference.removeEventListener('change', configure);
      canvas?.removeEventListener('webglcontextlost', lost); canvas?.removeEventListener('webglcontextrestored', configure);
      document.removeEventListener('visibilitychange', visibility);
      cancelAnimationFrame(s.raf); s.raf = 0; s.glc?.dispose(); s.glc = null;
      pendingTimers.forEach(clearTimeout); void audio.current?.close(); audio.current = null;
    };
  }, [loop]);
  React.useLayoutEffect(() => { measure(); }, [measure, items.length, compact]);
  React.useEffect(() => {
    const observer = new ResizeObserver(() => { measureRef.current(); });
    if (navRef.current) observer.observe(navRef.current);
    void document.fonts?.ready.then(() => measureRef.current());
    return () => observer.disconnect();
  }, []);
  React.useEffect(() => { loop(); }, [tone, loop]);

  const local = (clientX: number, clientY: number) => { const r = navRef.current!.getBoundingClientRect(); return { x: clientX - r.left + PAD, y: clientY - r.top + PAD }; };
  const ripple = (x: number, y: number, amp: number) => { if (!st.current.reduce) { st.current.rips.push({ x, y, age: 0, amp }); loop(); } };
  const plip = () => {
    if (!sound || st.current.reduce) return;
    const AC = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    try {
      const ctx = audio.current || (audio.current = new AC()), time = ctx.currentTime;
      const oscillator = ctx.createOscillator(), gain = ctx.createGain();
      oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(420 + Math.random() * 80, time); oscillator.frequency.exponentialRampToValueAtTime(1500, time + .07);
      gain.gain.setValueAtTime(.0001, time); gain.gain.exponentialRampToValueAtTime(.16, time + .008); gain.gain.exponentialRampToValueAtTime(.0001, time + .16);
      oscillator.connect(gain).connect(ctx.destination); oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); }; oscillator.start(time); oscillator.stop(time + .18);
    } catch { /* Sound is optional when the browser restricts audio. */ }
  };
  const select = (index: number) => {
    const item = items[index]; if (!item) return;
    const kind = item.fx ?? (item.icon ? 'pop' : 'none');
    if (!st.current.reduce) setFx(f => ({ i: index, n: f.n + 1 }));
    plip();
    const icon = iconRefs.current[index];
    if (icon) {
      const bounds = icon.getBoundingClientRect(), center = local(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
      if (kind === 'drop') timers.current.push(setTimeout(() => ripple(center.x, st.current.t.cy, 1.4), 430));
      if (kind === 'plane') ripple(center.x, center.y, .6);
    }
    if (index !== current) { if (active === undefined) setInner(index); onChange?.(index, item); }
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key) || !items.length) return;
    event.preventDefault();
    const focused = itemRefs.current.findIndex(e => e === document.activeElement), start = focused < 0 ? Math.max(current, 0) : focused;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (start + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    if (!items[next].href) select(next);
    itemRefs.current[next]?.focus();
  };
  return (
    <nav ref={navRef} className={['nimbus-nav', className].filter(Boolean).join(' ')} data-tone={tone} data-gl={gl} data-compact={compact === undefined ? undefined : String(compact)} aria-label="Main navigation" onKeyDown={onKeyDown}
      onPointerMove={event => { if (event.pointerType !== 'mouse') return; const position = local(event.clientX, event.clientY); Object.assign(st.current.mouse, position, { on: true }); loop(); }}
      onPointerLeave={() => { st.current.mouse.on = false; loop(); }}
      onPointerDown={event => { const position = local(event.clientX, event.clientY); ripple(position.x, position.y, .8); }}
      style={style}>
      <style>{NIMBUS_CSS}</style>
      <span className="nimbus-glass" aria-hidden="true" /><canvas className="nimbus-water" ref={canvasRef} aria-hidden="true" /><span className="nimbus-drop" ref={dropRef} aria-hidden="true" />
      {items.map((item, index) => {
        const kind = item.fx ?? 'pop', playing = fx.i === index && kind !== 'none';
        const content = <>{item.icon && <span className="nv-ico" key={playing ? fx.n : 0} data-fx={playing ? kind : undefined} ref={element => { iconRefs.current[index] = element; }}>{item.icon}</span>}<span className="nimbus-label">{item.label}</span></>;
        const common = { className: 'nimbus-item', 'data-first': index === 0 ? 'true' : undefined, 'data-last': index === items.length - 1 ? 'true' : undefined, 'aria-current': index === current ? 'page' as const : undefined, 'aria-label': item.label };
        return item.href ? <a key={item.label + index} {...common} ref={element => { itemRefs.current[index] = element; }} href={item.href} onClick={event => { select(index); if (onNavigate && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onNavigate(item.href!); } }}>{content}</a>
          : <button key={item.label + index} {...common} ref={element => { itemRefs.current[index] = element; }} type="button" onClick={() => select(index)}>{content}</button>;
      })}
    </nav>
  );
}
export { LiquidNavbar as Component };
export default LiquidNavbar;
