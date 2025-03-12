import drawGrid from "../pieces/drawGrid";
import drawSky from "../pieces/drawSky";
import Theme from "./Theme";

const MAIN_COLOR = "#44C7F2";
const LINE_COLOR = "#BFEEFF";

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
    drawSky(canvas, ctx);
  }
}
