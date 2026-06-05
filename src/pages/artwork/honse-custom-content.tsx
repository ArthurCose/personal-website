import { MouseEventHandler } from "react";
import styles from "@/styles/Gallery.module.css";
import Gallery from "@/components/gallery";
import classNames from "classnames";
import Link from "next/link";

export function PreviewComponent() {
  return <Piece src={"/art/hub-os/custom-content/preview.png"} />;
}

const pieceList = [
  { src: "/art/hub-os/custom-content/fishing.png" },
  { src: "/art/hub-os/custom-content/ripples.gif" },
  { src: "/art/hub-os/custom-content/sushi.png" },
  { src: "/art/hub-os/custom-content/sushi_rolls.png" },
  { src: "/art/hub-os/custom-content/clocks.png" },
  { src: "/art/hub-os/custom-content/clock.gif" },
  { src: "/art/hub-os/custom-content/ampstr.png" },
  { src: "/art/hub-os/custom-content/ampstr_mug.gif" },
  { src: "/art/hub-os/custom-content/chip_icons.png" },
  { src: "/art/hub-os/custom-content/pvp_sign.png" },
  { src: "/art/hub-os/custom-content/index_tiles.png" },
  { src: "/art/hub-os/custom-content/circus_tiles.png" },
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
        <Link href="https://hub-os.itch.io/hub-os">Hub OS</Link> custom content
        - anything that isn't directly in the download.
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
