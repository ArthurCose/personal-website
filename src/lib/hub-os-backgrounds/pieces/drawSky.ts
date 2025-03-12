import { HORIZON_Y } from "../sharedConstants";

export default function drawSky(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.fillRect(0, 0, canvas.width, HORIZON_Y);
}
