import { Press_Start_2P } from "next/font/google";
import styles from "@/styles/Designs.module.css";
import { CSSProperties, useEffect, useState } from "react";
import CatMoo from "../widgets/cat_moo";
import classNames from "classnames";

const font = Press_Start_2P({ weight: "400", subsets: ["latin"] });

function toRadians(deg: number) {
  return (deg / 180) * Math.PI;
}

const WIDTH = 256;
const HEIGHT = 256;
const SCALE = 2;

function generateCss(url: string) {
  return `
.bsod {
  background: url(${url}) repeat;
  background-size: ${WIDTH * SCALE}px ${HEIGHT * SCALE}px;
  image-rendering: pixelated;
  animation-name: bsod;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes bsod {
  from {
    background-position: 0px 0px;
  }
  to {
    background-position: ${WIDTH * SCALE}px ${HEIGHT * SCALE}px;
  }
}
`;
}

export default function BSOD({
  reduceAnimations,
}: {
  reduceAnimations: boolean;
}) {
  const [style, setStyle] = useState<CSSProperties | undefined>(undefined);

  useEffect(() => {
    if (reduceAnimations) {
      setStyle(undefined);
      return;
    }

    const canvas = new OffscreenCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d")!;

    ctx.font = `8px ${font.style.fontFamily}`;
    ctx.fillStyle = "white";

    const text = "Welcome!";
    const metrics = ctx.measureText(text);
    const textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    console.log(styles.isometric_bg_loop);

    ctx.fillText(text, 0, textHeight + metrics.actualBoundingBoxAscent);
    ctx.fillText(text, WIDTH / 2, HEIGHT / 2 + metrics.actualBoundingBoxAscent);

    const stylePromise = canvas.convertToBlob().then((blob) => {
      const url = URL.createObjectURL(blob);

      const styleElement = document.createElement("style");
      styleElement.innerHTML = generateCss(url);
      document.head.append(styleElement);

      return styleElement;
    });

    return () => {
      stylePromise.then((styleElement) => styleElement.remove());
    };
  }, [reduceAnimations]);

  return (
    <div className={classNames("bsod", styles.full_fixed)} style={style}>
      <CatMoo
        color="white"
        font={`32px ${font.style.fontFamily}`}
        charWidth={32}
        charHeight={35}
      />
    </div>
  );
}
