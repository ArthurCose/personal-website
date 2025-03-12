export function lerp(a: number, b: number, progress: number) {
  return (b - a) * progress + a;
}

export function inverseLerp(start: number, end: number, value: number) {
  let range = end - start;
  return (value - start) / range;
}
