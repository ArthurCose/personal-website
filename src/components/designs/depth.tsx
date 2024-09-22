import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Designs.module.css";
import { lerp } from "./shared";

const TICK_RATE = 1 / 60;
const MAX_PARTICLE_T = 60 * 3;
const REVIVE_INTERVAL = 2;
const TOTAL_PARTICLES = MAX_PARTICLE_T / REVIVE_INTERVAL;
const PARTICLE_DIAMETER = 10;
const PARTICLE_VEL_X = -0.5;
const PARTICLE_VEL_Y = -0.8;

type CanvasLoopData = {
  particles: { x: number; y: number; t: number }[];
  last_tick: number;
  revive_ticks: number;
  valid: boolean;
};

export default function Depth() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(0);
  const height = MAX_PARTICLE_T * -PARTICLE_VEL_Y + PARTICLE_DIAMETER;

  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth);
    };

    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, []);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d")!;

    const particles = [];
    for (var i = 0; i < TOTAL_PARTICLES; i++) {
      particles.push({ x: 0, y: 0, t: MAX_PARTICLE_T });
    }

    const data = {
      particles,
      last_tick: -Infinity,
      revive_ticks: 0,
      valid: true,
    };

    renderLoop(canvas, ctx, data, 0);

    return () => {
      data.valid = false;
    };
  }, [ref]);

  return (
    <canvas className={styles.canvas} width={width} height={height} ref={ref} />
  );
}

function renderLoop(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  data: CanvasLoopData,
  time: number
) {
  if (time - data.last_tick > TICK_RATE) {
    data.last_tick = time;

    update(canvas, data);
    render(canvas, ctx, data);
  }

  if (data.valid) {
    requestAnimationFrame((time) => renderLoop(canvas, ctx, data, time));
  }
}

function update(canvas: HTMLCanvasElement, data: CanvasLoopData) {
  let can_revive = false;

  data.revive_ticks += 1;

  if (data.revive_ticks >= REVIVE_INTERVAL) {
    can_revive = true;
    data.revive_ticks = 0;
  }

  for (const particle of data.particles) {
    if (particle.t > MAX_PARTICLE_T) {
      if (!can_revive) {
        continue;
      }

      can_revive = false;

      particle.y = 0;
      particle.x = lerp(-0.2, 1, Math.random()) * canvas.width;
      particle.t = 0;
    }

    particle.y += PARTICLE_VEL_Y;
    particle.x += -PARTICLE_VEL_X;
    particle.t += 1;
  }
}

function render(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  data: CanvasLoopData
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "gray";

  let alive_count = 0;

  for (const particle of data.particles) {
    if (particle.t > MAX_PARTICLE_T) {
      continue;
    }

    alive_count += 1;

    ctx.globalAlpha = 1 - particle.t / MAX_PARTICLE_T;

    ctx.fillRect(
      canvas.width - particle.x,
      canvas.height + particle.y,
      PARTICLE_DIAMETER,
      PARTICLE_DIAMETER
    );
  }
}
