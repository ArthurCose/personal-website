export default interface Theme {
  TOTAL_FRAMES: number;
  FRAME_DURATION: number;

  prepare?(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;

  draw(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    frame_number: number
  ): void;
}
