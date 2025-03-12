import { HORIZON_Y } from "../sharedConstants";

const STEP = 10;

export default function (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.beginPath();

  for (let x = STEP / 2 + 0.5; x < canvas.width; x += STEP) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HORIZON_Y);
  }

  for (let y = STEP / 2 + 1.5; y < HORIZON_Y; y += STEP) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }

  ctx.stroke();
  HORIZON_Y;
}
