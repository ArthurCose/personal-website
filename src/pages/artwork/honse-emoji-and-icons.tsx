import { MouseEventHandler } from "react";
import styles from "@/styles/Gallery.module.css";
import Gallery from "@/components/gallery";
import classNames from "classnames";
import Link from "next/link";

export function PreviewComponent() {
  return <Piece src={"/art/hub-os/animal-emotes.png"} />;
}

const pieceList = [
  { src: "/art/hub-os/animal-emotes.png" },
  { src: "/art/hub-os/fun-emotes.png" },
  { src: "/art/hub-os/mod-categories.png" },
  { src: "/art/hub-os/inputs-a.png" },
  { src: "/art/hub-os/inputs-b.png" },
  { src: "/art/hub-os/statuses.png" },
  { src: "/art/hub-os/badges.png" },
  { src: "/art/hub-os/mini-chips.png" },
  { src: "/art/hub-os/install.png" },
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
        className={classNames(styles.item, styles.transparent_bg)}
        src={src}
      />
    </div>
  );
}

export default function () {
  return (
    <>
      <p>
        Emoji and icons for{" "}
        <Link href="https://hub-os.itch.io/hub-os">Hub OS</Link>
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
