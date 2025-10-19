import { MouseEventHandler, useEffect, useRef, useState } from "react";
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
import Gallery from "@/components/gallery";
import classNames from "classnames";
import Link from "next/link";

export function PreviewComponent() {
  return (
    <div className={styles.item_container}>
      <Piece animateAlways theme={Day} />
    </div>
  );
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
  onClick?: MouseEventHandler;
};

function Piece<T extends new () => Theme>({
  animateAlways,
  theme: Theme,
  onClick,
}: PieceProps<T>) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [animating, setAnimating] = useState(animateAlways);
  const [resumeFrameNumber, setResumeFrameNumber] = useState(0);

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
    const ctx = canvas.getContext("2d")!;

    const theme = new Theme();
    let frameNumber = resumeFrameNumber;

    if (theme.prepare) {
      theme.prepare(canvas, ctx);
    }

    const interval = setInterval(() => {
      theme.draw(canvas, ctx, frameNumber);
      frameNumber += 1;
    }, theme.FRAME_DURATION * (1000 / 60));

    return () => {
      clearInterval(interval);
      setResumeFrameNumber(frameNumber);
    };
  }, [animating]);

  return (
    <canvas
      onClick={onClick}
      className={classNames(styles.item, styles.wide_item)}
      onMouseOver={() => setAnimating(animateAlways || true)}
      onMouseOut={() => setAnimating(animateAlways || false)}
      ref={ref}
      width={240}
      height={160}
    />
  );
}

export default function () {
  return (
    <>
      <p>
        Procedurally generated backgrounds for{" "}
        <Link href="https://hub-os.itch.io/hub-os">Hub OS</Link>, hover to
        preview.
      </p>

      <br />

      <p>
        Every animation is rendered live on your browser. The original script
        copied frames to a second canvas to generate a spritesheet.
      </p>

      <Gallery
        totalItems={pieceList.length}
        renderListItem={(i, onClick) => (
          <div className={styles.item_container} key={i}>
            <Piece theme={pieceList[i]} onClick={onClick} />
          </div>
        )}
        renderFullscreenItem={(i) => (
          <Piece key={i} animateAlways theme={pieceList[i]} />
        )}
      />
    </>
  );
}
