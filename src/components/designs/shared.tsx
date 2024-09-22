export function lerp(start: number, end: number, progress: number): number {
  return (end - start) * progress + start;
}
