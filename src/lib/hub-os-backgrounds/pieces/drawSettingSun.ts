import { HORIZON_Y } from "../sharedConstants";

export default function drawSettingSun(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  skyFillStyle: string | CanvasGradient | CanvasPattern
) {
  const SUN_RADIUS = 36;
  const SUN_X = canvas.width / 2;
  const SUN_Y = HORIZON_Y - SUN_RADIUS * 0.7;

  const gradient = ctx.createLinearGradient(
    SUN_X,
    SUN_Y - SUN_RADIUS,
    SUN_X,
    HORIZON_Y
  );

  gradient.addColorStop(0, "#FFF646");
  gradient.addColorStop(0.25, "#FFDF54");
  gradient.addColorStop(0.5, "#FF8283");
  gradient.addColorStop(1, "#FD23B2");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(SUN_X, SUN_Y, SUN_RADIUS, -Math.PI * 1.25, Math.PI * 0.25);
  ctx.fill();

  // chop up the sun
  let y = SUN_Y - SUN_RADIUS * 0.25;
  let h = 1;

  ctx.fillStyle = skyFillStyle;

  while (y + h < HORIZON_Y) {
    ctx.fillRect(SUN_X - SUN_RADIUS, y, SUN_RADIUS * 2, h);

    if (h < 3) {
      h += 1;
    }

    y += h + h;
  }
}
