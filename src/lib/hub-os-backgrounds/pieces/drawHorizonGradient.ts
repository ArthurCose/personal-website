import { HORIZON_Y } from "../sharedConstants";

export default function drawHorizonGradient(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  color: string,
  radius: number
) {
  const gradient = ctx.createLinearGradient(
    0,
    HORIZON_Y - radius,
    0,
    HORIZON_Y + radius
  );

  gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
  gradient.addColorStop(0.5, color);
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, HORIZON_Y - radius, canvas.width, HORIZON_Y + radius);
}
