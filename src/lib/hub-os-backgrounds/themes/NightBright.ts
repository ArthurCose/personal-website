import drawGrid from "../pieces/drawGrid";
import drawSky from "../pieces/drawSky";
import drawStars from "../pieces/drawStars";
import drawCityScape from "../pieces/drawCityScape";
import Theme from "./Theme";

const MAIN_COLOR = "hsl(241, 100%, 10%)";
const LINE_COLOR = "hsl(197, 74%, 50%)";

const STARS_FILL_STYLE = `hsl(120, 100%, 65%)`;

const BUILDING_FILL_STYLE = "#010029";

export default class implements Theme {
  TOTAL_FRAMES = 24 * 6;
  FRAME_DURATION = 2;

  draw(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    frame_number: number
  ) {
    ctx.fillStyle = MAIN_COLOR;
    ctx.strokeStyle = LINE_COLOR;
    drawGrid(canvas, ctx, frame_number);

    const SKY_FILL_STYLE = ctx.createLinearGradient(0, 0, 0, canvas.height);
    SKY_FILL_STYLE.addColorStop(0.25, "hsl(241, 100%, 8%)");
    SKY_FILL_STYLE.addColorStop(1.0, "hsl(197, 100%, 35%)");

    ctx.fillStyle = SKY_FILL_STYLE;
    drawSky(canvas, ctx);

    ctx.fillStyle = STARS_FILL_STYLE;
    drawStars(ctx, this, frame_number, 0.2, 1);

    ctx.fillStyle = BUILDING_FILL_STYLE;
    drawCityScape(ctx);
  }
}
