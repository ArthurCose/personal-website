import { Press_Start_2P } from "next/font/google";
import styles from "@/styles/Designs.module.css";
import { CSSProperties, useEffect, useState } from "react";
import CatMoo from "../widgets/cat_moo";

const font = Press_Start_2P({ weight: "400", subsets: ["latin"] });

function toRadians(deg: number) {
  return (deg / 180) * Math.PI;
}

const WIDTH = 256;
const HEIGHT = 256;
const SCALE = 2;

const animationCss = `
@keyframes bsod {
  from {
    background-position: 0px 0px;
  }
  to {
    background-position: -${WIDTH * SCALE}px ${HEIGHT * SCALE}px;
  }
}
`;

export default function BSOD() {
  const [style, setStyle] = useState<CSSProperties | undefined>(undefined);

  useEffect(() => {
    const canvas = new OffscreenCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d")!;

    ctx.font = `8px ${font.style.fontFamily}`;
    ctx.fillStyle = "white";

    const text = "Welcome!";
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    console.log(styles.isometric_bg_loop);

    // ctx.setTransform(1, , -1, 1, 0, 0);
    ctx.fillText(text, 0, textHeight + metrics.actualBoundingBoxAscent);
    ctx.fillText(text, WIDTH / 2, HEIGHT / 2 + metrics.actualBoundingBoxAscent);

    // ctx.strokeStyle = "white";
    // ctx.strokeRect(0, 0, canvas.width, canvas.height);

    canvas.convertToBlob().then((blob) => {
      const url = URL.createObjectURL(blob);
      setStyle({
        background: `url(${url}) repeat`,
        backgroundSize: `${WIDTH * SCALE}px ${HEIGHT * SCALE}px`,
        imageRendering: "pixelated",
        animationName: "bsod",
        animationDuration: "5s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
      });
    });

    const styleElement = document.createElement("style");
    styleElement.innerHTML = animationCss;
    document.head.append(styleElement);

    return () => {
      // remove the element for hot reload
      styleElement.remove();
    };
  }, []);

  return (
    <div className={styles.full_fixed} style={style}>
      <CatMoo
        color="white"
        font={`32px ${font.style.fontFamily}`}
        charWidth={32}
        charHeight={35}
      />
    </div>
  );
}
