import Theme from "./themes/Theme";

export default function animate(canvas: HTMLCanvasElement, theme: Theme) {
  const ctx = canvas.getContext("2d")!;

  if (theme.prepare) {
    theme.prepare(canvas, ctx);
  }

  let frame_number = 0;

  return setInterval(() => {
    theme.draw(canvas, ctx, frame_number);
    frame_number += 1;
  }, theme.FRAME_DURATION * (1000 / 60));
}
