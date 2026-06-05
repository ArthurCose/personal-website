import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import styles from "@/styles/Gallery.module.css";
import Gallery from "@/components/gallery";
import Link from "next/link";
import { createBgRenderer } from "@/lib/bg-animation-renderer";
import { parseSheet } from "@/lib/boomsheets-animations";

export function PreviewComponent() {
  return (
    <div className={styles.item_container}>
      <Piece
        animateAlways
        srcBase="/art/hub-os/battle-backgrounds/MINESWEEPER"
      />
    </div>
  );
}

const pieceList = [
  { srcBase: "/art/hub-os/battle-backgrounds/MINESWEEPER" },
  { srcBase: "/art/hub-os/battle-backgrounds/NCP" },
  { srcBase: "/art/hub-os/battle-backgrounds/GRAND_SQUARE" },
  { srcBase: "/art/hub-os/battle-backgrounds/MATH_SNOW" },
  { srcBase: "/art/hub-os/battle-backgrounds/MS_PAINT_FOLDERS" },
  { srcBase: "/art/hub-os/battle-backgrounds/PLAIN_GRID" },
  { srcBase: "/art/hub-os/battle-backgrounds/INDEX" },
  { srcBase: "/art/hub-os/battle-backgrounds/CODES" },
];

type PieceProps = {
  animateAlways?: boolean;
  srcBase: string;
  onClick?: MouseEventHandler;
};

type BgRenderer = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  frameTime: number,
) => void;

function Piece({ animateAlways, srcBase, onClick }: PieceProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [animating, setAnimating] = useState(animateAlways);
  const [resumeFrameNumber, setResumeFrameNumber] = useState(0);
  const [render, setRender] = useState<BgRenderer>(() => () => {});

  useEffect(() => {
    let stale = false;

    // load .png
    const image = new Image();
    image.src = srcBase + ".png";

    const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
    });

    // load .animation
    const textPromise = fetch(srcBase + ".animation").then((response) =>
      response.text(),
    );

    // build renderer when resolved
    Promise.all([imagePromise, textPromise]).then(([image, text]) => {
      if (stale) {
        return;
      }

      const sheet = parseSheet(text);
      const anim = sheet.animations.find((anim) => anim.state == "DEFAULT")!;
      setRender(() => createBgRenderer(image, anim));
    });

    return () => {
      stale = true;
    };
  }, [srcBase]);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    render(canvas, ctx, 0);
  }, [render]);

  useEffect(() => {
    if (!animating) {
      return;
    }

    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    let frameNumber = resumeFrameNumber;

    const interval = setInterval(() => {
      render(canvas, ctx, frameNumber);
      frameNumber += 1;
    }, 1000 / 60);

    return () => {
      clearInterval(interval);
      setResumeFrameNumber(frameNumber);
    };
  }, [render, animating]);

  return (
    <canvas
      onClick={onClick}
      className={styles.item}
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
        Mostly handmade battle backgrounds for{" "}
        <Link href="https://hub-os.itch.io/hub-os">Hub OS</Link>, hover to
        preview.
      </p>

      <br />

      <p>
        Motion is removed in a few of these renders to reduce motion sickness,
        as these animations aren't meant to be viewed without something to
        ground your eyes with.
      </p>

      <br />

      <Gallery
        totalItems={pieceList.length}
        renderListItem={(i, onClick) => (
          <div className={styles.item_container} key={i}>
            <Piece onClick={onClick} {...pieceList[i]} />
          </div>
        )}
        renderFullscreenItem={(i) => (
          <Piece key={i} animateAlways {...pieceList[i]} />
        )}
      />
    </>
  );
}
