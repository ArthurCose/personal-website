// adapted from something I previously made

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Designs.module.css";

type Props = {
  color: string;
  font: string;
  charWidth: number;
  charHeight: number;
};

const cat = `
      |*___/|
      | o o |
      =*___/=
       /   *
      |_> <_|===
`;
const cat_blink = cat.replace(/o/g, "-");
const moo_bubble_lines = ["", "(moo)", "     *"];
const cat_moo = cat
  .split("\n")
  .map((line, i) => {
    const moo_line = moo_bubble_lines[i];

    if (!moo_line) {
      return line;
    }

    return moo_line + line.slice(moo_line.length);
  })
  .join("\n");

const FRAME_DURATION = 16 * (1000 / 60);

class AnimationQueue {
  current?: NodeJS.Timeout;
  pending: (() => void)[];

  constructor() {
    this.pending = [];
  }

  clear() {
    this.pending.length = 0;
    clearTimeout(this.current);
    this.current = undefined;
  }

  push(duration: number, callback: () => void) {
    const exec = () => {
      this.current = setTimeout(() => {
        const next = this.pending.shift();

        if (next) {
          next();
        } else {
          this.current = undefined;
        }

        callback();
      }, duration);
    };

    if (this.current != undefined) {
      // queue
      this.pending.push(exec);
    } else {
      // process immediately
      exec();
    }
  }
}

function animateMoo(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  props: Props,
  queue: AnimationQueue
) {
  drawFrame(canvas, ctx, cat_moo, props);
  queue.push(FRAME_DURATION * 5, () => drawFrame(canvas, ctx, cat, props));
  queue.push(FRAME_DURATION * 6, () =>
    drawFrame(canvas, ctx, cat_blink, props)
  );
  queue.push(FRAME_DURATION, () => drawFrame(canvas, ctx, cat, props));
  queue.push(FRAME_DURATION, () => drawFrame(canvas, ctx, cat_blink, props));
  queue.push(FRAME_DURATION, () => drawFrame(canvas, ctx, cat, props));
}

function drawFrame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  frame: string,
  props: Props
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const text = frame.replace(/\*/g, "\\");

  let x = 0;
  let y = 0;

  for (const char of text) {
    switch (char) {
      case "\n":
        x = 0;
        y += props.charHeight;
        break;
      case " ":
        x += props.charWidth;
        break;
      default:
        {
          const offset = Math.floor(
            (props.charWidth - ctx.measureText(char).width) / 2
          );
          ctx.fillText(char, x + offset, y);
          x += props.charWidth;
        }
        break;
    }
  }
}

export default function CatMoo(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>();
  const queueRef = useRef<AnimationQueue>();
  const [pressCount, setPressCount] = useState(0);

  useEffect(() => {
    const queue = new AnimationQueue();
    queueRef.current = queue;

    const canvas = canvasRef.current!;
    canvas.width = props.charWidth * 16;
    canvas.height = props.charHeight * 5.5;

    const ctx = canvas.getContext("2d")!;
    ctx.font = props.font;
    ctx.fillStyle = props.color;
    ctx.imageSmoothingEnabled = false;

    ctxRef.current = ctx;
    drawFrame(canvas, ctx, cat, props);

    return () => {
      queue.clear();
    };
  }, []);

  useEffect(() => {
    if (pressCount == 0) {
      return;
    }

    const canvas = canvasRef.current!;
    const ctx = ctxRef.current!;
    const queue = queueRef.current!;

    queue.clear();
    animateMoo(canvas, ctx, props, queue);
  }, [pressCount]);

  return (
    <canvas
      onClick={() => setPressCount((count) => count + 1)}
      ref={canvasRef}
      className={styles.cat}
      width={200}
      height={200}
    />
  );
}
