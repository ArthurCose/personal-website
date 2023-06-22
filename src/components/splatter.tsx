import { useEffect, useRef } from "react";
import styles from "@/styles/Splatter.module.css";

const CANVAS_W = 600;
const CANVAS_H = 800;
const MIN_RANGE = 100;
const MAX_RANGE = 500;
const MAX_RANGE_BLOT_COUNT = 750;

export default function Splatter() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      return;
    }

    console.time("splat");
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    const colors = [
      // "red",
      // "green",
      "blue",
      "magenta",
      "yellow",
      "white",
      "cyan",
      // "pink",
    ];

    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * colors.length);
      const [color] = colors.splice(index, 1);

      const range = lerp(MIN_RANGE, MAX_RANGE, Math.random());
      const minX = range / CANVAS_W;
      const minY = range / CANVAS_H;

      const x = lerp(minX, 1, Math.random());
      const y = lerp(minY, 1, Math.random());

      splat(ctx, CANVAS_W * x, CANVAS_H * y, color, range);
    }
    console.timeEnd("splat");
  }, [ref]);

  return (
    <canvas
      className={styles.canvas}
      width={CANVAS_W}
      height={CANVAS_H}
      ref={ref}
    />
  );
}

function splat(
  ctx: CanvasRenderingContext2D,
  splatX: number,
  splatY: number,
  color: string,
  range: number
) {
  ctx.save();
  ctx.translate(splatX, splatY);
  ctx.fillStyle = color;

  const HALF_MAX_BLOT_WIDTH = 4;
  const blotCount = Math.floor((range / MAX_RANGE) * MAX_RANGE_BLOT_COUNT);

  for (let i = 0; i < blotCount; i++) {
    const distance = Math.random() ** 2 * range;

    const normalizedDistance = distance / range;
    const halfWidth = (1 - normalizedDistance) ** 2 * HALF_MAX_BLOT_WIDTH;
    const halfHeight = lerp(halfWidth, halfWidth * 10, Math.random());

    ctx.rotate(Math.random() * Math.PI * 2);
    ctx.beginPath();
    ctx.ellipse(distance, 0, halfHeight, halfWidth, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function lerp(start: number, end: number, progress: number): number {
  return (end - start) * progress + start;
}
