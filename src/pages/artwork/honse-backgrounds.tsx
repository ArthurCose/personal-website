import { useEffect, useRef, useState } from "react";
import animate from "@/lib/hub-os-backgrounds/runtime";
import Theme from "@/lib/hub-os-backgrounds/themes/Theme";
import Day from "@/lib/hub-os-backgrounds/themes/Day";
import MorningBladeRunner from "@/lib/hub-os-backgrounds/themes/MorningBladeRunner";
import NightBright from "@/lib/hub-os-backgrounds/themes/NightBright";
import NightBrightRainbow from "@/lib/hub-os-backgrounds/themes/NightBrightRainbow";
import NightBrightRainbowLowRed from "@/lib/hub-os-backgrounds/themes/NightBrightRainbowLowRed";
import NightMuted from "@/lib/hub-os-backgrounds/themes/NightMuted";
import Plain from "@/lib/hub-os-backgrounds/themes/Plain";
import Sunset from "@/lib/hub-os-backgrounds/themes/Sunset";
import styles from "@/styles/Gallery.module.css";
import GalleryFullscreen from "@/components/gallery_fullscreen";
import classNames from "classnames";

export function PreviewComponent() {
  return <Piece animateAlways theme={Day} />;
}

const pieceList = [
  Day,
  MorningBladeRunner,
  Sunset,
  NightBrightRainbowLowRed,
  NightBrightRainbow,
  NightBright,
  NightMuted,
  Plain,
];

type PieceProps<T> = {
  animateAlways?: boolean;
  theme: T;
  onClick?: () => void;
};

function Piece<T extends new () => Theme>({
  animateAlways,
  theme: Theme,
  onClick,
}: PieceProps<T>) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [animating, setAnimating] = useState(animateAlways);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const theme = new Theme();

    theme.prepare?.(canvas, ctx);
    theme.draw(canvas, ctx, 0);
  }, []);

  useEffect(() => {
    if (!animating) {
      return;
    }

    const canvas = ref.current!;
    const theme = new Theme();
    const interval = animate(canvas, theme);

    return () => {
      clearInterval(interval);
    };
  }, [animating]);

  return (
    <div className={styles.item_container}>
      <canvas
        onClick={onClick}
        className={classNames(styles.item, styles.wide_item)}
        onMouseOver={() => setAnimating(animateAlways || true)}
        onMouseOut={() => setAnimating(animateAlways || false)}
        ref={ref}
        width={240}
        height={160}
      />
    </div>
  );
}

export default function () {
  const [index, setIndex] = useState<number | undefined>(undefined);

  return (
    <>
      <p>
        Procedurally generated backgrounds for a game constrained to 240x160
        pixels.
      </p>

      <br />

      <p>
        Every animation is rendered live on your browser. The original script
        copied frames to a second canvas to generate a spritesheet.
      </p>

      <br />

      <div className={styles.gallery}>
        {pieceList.map((theme, i) => (
          <Piece key={i} theme={theme} onClick={() => setIndex(i)} />
        ))}
      </div>

      <GalleryFullscreen
        index={index}
        setIndex={setIndex}
        totalItems={pieceList.length}
        renderItem={(i) => (
          <Piece
            key={i}
            animateAlways
            theme={pieceList[i]}
            onClick={() => setIndex(i)}
          />
        )}
      />
    </>
  );
}
