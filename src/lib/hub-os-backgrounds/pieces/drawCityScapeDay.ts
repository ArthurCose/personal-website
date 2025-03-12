import { HORIZON_Y } from "../sharedConstants";
import { buildings } from "./drawCityScape";

export default function drawCityScapeDay(
  ctx: CanvasRenderingContext2D,
  frame_number: number
) {
  let x = 0;

  for (const building of buildings) {
    // const wave = Math.sin((frame_number / 12) * Math.PI + x / 2);
    // const offset = Math.floor(wave * 6 + 8);

    // const wave = Math.sin((frame_number / 12) * Math.PI + x / 2);
    // const offset = Math.floor(wave * 14 + 14);

    const strength = ((Math.sin(x / 8) + 1.0) / 2) * 14;
    const wave = Math.sin((frame_number / 12) * Math.PI + x / 2);
    const offset = Math.floor(wave * strength + strength);

    ctx.fillRect(
      x,
      HORIZON_Y - building.height - offset,
      building.width,
      building.height + offset
    );
    x += building.width;
  }
}
