import { HORIZON_Y, VANISHING_Y } from "../sharedConstants";
import { inverseLerp } from "../lerp";

const HORIZONTAL_LINE_SPACING = 24;
const VERTICAL_LINE_SPACING = 80;

export default function drawGrid(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  frame_number: number
) {
  const horizontal_offset = frame_number % HORIZONTAL_LINE_SPACING;

  // fill with main bg color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw lines
  ctx.beginPath();

  // draw horizon line
  ctx.moveTo(0, HORIZON_Y + 0.5);
  ctx.lineTo(canvas.width, HORIZON_Y + 0.5);

  // horizontal lines
  let y =
    HORIZON_Y +
    inverseLerp(VANISHING_Y, canvas.height, HORIZON_Y) * horizontal_offset;

  while (y < canvas.height) {
    const multiplier = inverseLerp(VANISHING_Y, canvas.height, y);

    ctx.moveTo(0, Math.floor(y) + 0.5);
    ctx.lineTo(canvas.width, Math.floor(y) + 0.5);

    y += multiplier * HORIZONTAL_LINE_SPACING;
  }

  // vertical lines
  let x = VERTICAL_LINE_SPACING * 0.5;

  while (x < canvas.width * 5) {
    ctx.moveTo(canvas.width / 2, VANISHING_Y);
    ctx.lineTo(Math.floor(canvas.width / 2 - x) + 0.5, canvas.height);

    ctx.moveTo(canvas.width / 2, VANISHING_Y);
    ctx.lineTo(Math.floor(canvas.width / 2 + x) + 0.5, canvas.height);

    x += VERTICAL_LINE_SPACING;
  }

  // draw all lines
  ctx.stroke();
}
