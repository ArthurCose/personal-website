import drawGrid from "../pieces/drawGrid";
import drawSky from "../pieces/drawSky";
import drawCityScapeDay from "../pieces/drawCityScapeDay";
import Theme from "./Theme";
import drawSkyGrid from "../pieces/drawSkyGrid";

const MAIN_COLOR = "#5070D8";
const LINE_COLOR = "#44C7F2";
const BUILDING_FILL_STYLE = "hsl(95, 100%, 60%)";
// const BUILDING_FILL_STYLE = "#2DF92D";
const SKY_FILL_STYLE = "#44C7F2";
const SKY_GRID_STYLE = "#B8F0F8";

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

    ctx.fillStyle = SKY_FILL_STYLE;
    drawSky(canvas, ctx);

    ctx.strokeStyle = SKY_GRID_STYLE;
    drawSkyGrid(canvas, ctx);

    ctx.fillStyle = BUILDING_FILL_STYLE;
    drawCityScapeDay(ctx, frame_number);
  }
}
