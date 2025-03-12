import drawGrid from "../pieces/drawGrid";
import drawHorizonGradient from "../pieces/drawHorizonGradient";
import drawSettingSun from "../pieces/drawSettingSun";
import drawSky from "../pieces/drawSky";
import { HORIZON_Y } from "../sharedConstants";
import Theme from "./Theme";

const MAIN_COLOR = "#1D1545";
const LINE_COLOR = "#CC09D7";

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
    SKY_FILL_STYLE.addColorStop(0, MAIN_COLOR);
    SKY_FILL_STYLE.addColorStop(1, LINE_COLOR);

    ctx.fillStyle = SKY_FILL_STYLE;
    drawSky(canvas, ctx);

    drawSettingSun(canvas, ctx, SKY_FILL_STYLE);
    drawHorizonGradient(canvas, ctx, "white", 16);
  }
}
