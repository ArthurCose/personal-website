import drawGrid from "../pieces/drawGrid";
import drawSky from "../pieces/drawSky";
import drawCityScape from "../pieces/drawCityScape";
import Theme from "./Theme";
import { HORIZON_Y } from "../sharedConstants";

const MAIN_COLOR = "hsl(30, 80%, 55%)";
const LINE_COLOR = "#D26A10";

export default class implements Theme {
  TOTAL_FRAMES = 24;
  FRAME_DURATION = 2;

  draw(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    frame_number: number
  ) {
    ctx.fillStyle = MAIN_COLOR;
    ctx.strokeStyle = LINE_COLOR;
    drawGrid(canvas, ctx, frame_number);

    const SKY_FILL_STYLE = ctx.createLinearGradient(0, 0, 0, HORIZON_Y);
    SKY_FILL_STYLE.addColorStop(0.0, "#FFF5D9");
    SKY_FILL_STYLE.addColorStop(1.0, "#F39923");

    ctx.fillStyle = SKY_FILL_STYLE;
    drawSky(canvas, ctx);

    drawMorningSun(canvas, ctx);

    const BUILDING_FILL_STYLE = ctx.createLinearGradient(
      0,
      HORIZON_Y - 10,
      0,
      HORIZON_Y
    );
    BUILDING_FILL_STYLE.addColorStop(0.0, "#FAC771");
    BUILDING_FILL_STYLE.addColorStop(0.5, "#F19C2C");
    BUILDING_FILL_STYLE.addColorStop(1.0, "#CF650D");

    ctx.fillStyle = BUILDING_FILL_STYLE;
    drawCityScape(ctx);
  }
}

function drawMorningSun(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  const SUN_RADIUS = 36;
  const SUN_X = canvas.width / 2;
  const SUN_Y = HORIZON_Y - SUN_RADIUS * 0.98;

  ctx.fillStyle = "#FFEAC2";
  ctx.beginPath();
  ctx.arc(SUN_X, SUN_Y, SUN_RADIUS, -Math.PI * 1.4, Math.PI * 0.4);
  ctx.fill();
}
