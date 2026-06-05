import { MouseEventHandler } from "react";
import styles from "@/styles/Gallery.module.css";
import Gallery from "@/components/gallery";
import classNames from "classnames";

export function PreviewComponent() {
  return <Piece src={"/art/towering-race/screenshot-2.png"} />;
}

const pieceList = [
  { src: "/art/towering-race/screenshot-1.png" },
  { src: "/art/towering-race/screenshot-2.png" },
  { src: "/art/towering-race/spritesheet.png" },
];

type PieceProps = {
  src: any;
  onClick?: MouseEventHandler;
};

function Piece({ src, onClick }: PieceProps) {
  return (
    <div className={styles.item_container}>
      <img
        onClick={onClick}
        className={classNames(styles.item, styles.language_dex_bg)}
        src={src}
      />
    </div>
  );
}

export default function () {
  return (
    <>
      <p>
        Some screenshots and art from a game I made in class around 2014. It's
        not online anywhere since... It's not that good. I might put it up
        somewhere eventually for the sake of preserving my own history and to
        showcase my progress, but for now this page will suffice.
      </p>

      <br />

      <Gallery
        totalItems={pieceList.length}
        renderListItem={(i, onClick) => (
          <Piece key={i} {...pieceList[i]} onClick={onClick} />
        )}
        renderFullscreenItem={(i) => <Piece key={i} {...pieceList[i]} />}
      />
    </>
  );
}
