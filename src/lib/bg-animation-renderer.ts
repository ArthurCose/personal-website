import {
  BoomSheetsAnimation,
  BoomSheetsFrame,
} from "@/lib/boomsheets-animations";

function parseFrameDuration(durationString: string) {
  const duration =
    durationString.endsWith("f") || durationString.endsWith("F")
      ? parseInt(durationString)
      : Math.round(parseFloat(durationString) * 60);

  // prevent negative values
  return Math.max(duration, 0);
}

function frameAt(anim: BoomSheetsAnimation, frameTime: number) {
  frameTime %= anim.frames.reduce(
    (acc, frame) => acc + parseFrameDuration(frame.duration),
    0,
  );

  let visibleFrame;

  for (const frame of anim.frames) {
    let duration = parseFrameDuration(frame.duration);

    frameTime -= duration;

    visibleFrame = frame;

    if (frameTime < 0) {
      break;
    }
  }

  return visibleFrame;
}

function drawFrameAt(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  frame: BoomSheetsFrame,
  x: number,
  y: number,
) {
  if (frame.flipx || frame.flipy) {
    let xScale = 1;
    let yScale = 1;

    if (frame.flipx) {
      xScale = -1;
      x = -x - frame.originx * 2;
    }

    if (frame.flipy) {
      yScale = -1;
      y = -y - frame.originy * 2;
    }

    ctx.save();
    ctx.scale(xScale, yScale);
  }

  ctx.drawImage(
    image,
    frame.x,
    frame.y,
    frame.w,
    frame.h,
    x,
    y,
    frame.w,
    frame.h,
  );

  if (frame.flipx || frame.flipy) {
    ctx.restore();
  }
}

export function createBgRenderer(
  image: HTMLImageElement,
  anim: BoomSheetsAnimation,
) {
  const offscreenCanvas = document.createElement("canvas");

  return (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    frameTime: number,
  ) => {
    const frame = frameAt(anim, frameTime);

    if (!frame) {
      return;
    }

    // render frame to offscreen canvas
    const offscreenCtx = offscreenCanvas.getContext("2d")!;

    offscreenCanvas.width = frame.w;
    offscreenCanvas.height = frame.h;

    // must reset after the canvas is modified
    offscreenCtx.imageSmoothingEnabled = false;

    drawFrameAt(offscreenCtx, image, frame, 0, 0);

    // render to main canvas as a repeating pattern
    const pattern = ctx.createPattern(offscreenCanvas, "repeat")!;

    // resolve current offset
    let x = -frame.originx;
    let y = -frame.originy;

    const velPoint = anim.frames[0].points.find(
      (point) => point.label == "VELOCITY",
    );

    if (velPoint) {
      x += Math.floor(velPoint.x * frameTime);
      y += Math.floor(velPoint.y * frameTime);
    }

    ctx.translate(x, y);
    ctx.fillStyle = pattern;
    ctx.fillRect(-x, -y, canvas.width, canvas.height);

    ctx.translate(-x, -y);
  };
}
