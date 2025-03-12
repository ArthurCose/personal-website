import drawGrid from "../pieces/drawGrid";
import drawSky from "../pieces/drawSky";
import drawStars from "../pieces/drawStars";
import drawCityScape from "../pieces/drawCityScape";
import Theme from "./Theme";

const MAIN_COLOR = "hsl(241, 100%, 10%)";
const LINE_COLOR = "hsl(197, 74%, 50%)";

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

    const STARS_FILL_STYLE = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    STARS_FILL_STYLE.addColorStop(0, "hsl(330, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(30 / 360, "hsl(300, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(60 / 360, "hsl(270, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(90 / 360, "hsl(240, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(120 / 360, "hsl(210, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(150 / 360, "hsl(150, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(180 / 360, "hsl(180, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(210 / 360, "hsl(210, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(240 / 360, "hsl(240, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(270 / 360, "hsl(270, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(300 / 360, "hsl(300, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(330 / 360, "hsl(330, 100%, 65%)");
    STARS_FILL_STYLE.addColorStop(360 / 360, "hsl(360, 100%, 65%)");

    ctx.fillStyle = STARS_FILL_STYLE;
    drawStars(ctx, this, frame_number, 0.2, 1);

    ctx.fillStyle = BUILDING_FILL_STYLE;
    drawCityScape(ctx);
  }
}
