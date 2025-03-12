import styles from "@/styles/Gallery.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Press_Start_2P } from "next/font/google";

const font = Press_Start_2P({ weight: "400", subsets: ["latin"] });

type Props = {
  startRect?: DOMRect;
  index?: number;
  setIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  totalItems: number;
  renderItem: (i: number) => React.JSX.Element;
};

export default function GalleryFullscreen({
  index,
  setIndex,
  totalItems,
  renderItem,
}: Props) {
  // handle keyboard
  useEffect(() => {
    if (index == undefined) {
      return index;
    }

    const listener = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
      }

      setIndex((index) => {
        if (index == undefined) {
          return index;
        }

        if (e.key == "ArrowLeft") {
          return index == 0 ? totalItems - 1 : index - 1;
        } else if (e.key == "ArrowRight") {
          return (index + 1) % totalItems;
        } else if (e.key == "Escape") {
          return undefined;
        } else {
          return index;
        }
      });
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [index]);

  if (index == undefined) {
    return;
  }

  return createPortal(
    <div className={styles.fullscreen} onClick={() => setIndex(undefined)}>
      <div className={styles.item_container}>{renderItem(index)}</div>
      <div
        className={styles.count}
        style={{ fontFamily: font.style.fontFamily }}
      >
        {index + 1}/{totalItems}
      </div>
    </div>,
    document.body
  );
}
