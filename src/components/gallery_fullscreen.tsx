import styles from "@/styles/Gallery.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Press_Start_2P } from "next/font/google";
import { useNavigationGuard } from "next-navigation-guard";

const font = Press_Start_2P({ weight: "400", subsets: ["latin"] });

type Props = {
  startRect?: DOMRect;
  index?: number;
  setIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  totalItems: number;
  renderItem: (i: number) => React.JSX.Element;
};

function updateIndex(
  setIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  totalItems: number,
  dir: number
) {
  setIndex((index) => {
    if (index == undefined) {
      return index;
    }

    if (dir < 0) {
      return index == 0 ? totalItems - 1 : index - 1;
    } else if (dir > 0) {
      return (index + 1) % totalItems;
    } else {
      return index;
    }
  });
}

export default function GalleryFullscreen({
  index,
  setIndex,
  totalItems,
  renderItem,
}: Props) {
  const guard = useNavigationGuard({ enabled: index != undefined });

  useEffect(() => {
    if (!guard.active) {
      return;
    }

    guard.reject();
    setIndex(undefined);
  }, [guard.active]);

  // handle keyboard
  useEffect(() => {
    if (index == undefined) {
      return index;
    }

    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      e.preventDefault();

      if (e.key == "ArrowLeft") {
        updateIndex(setIndex, totalItems, -1);
      } else if (e.key == "ArrowRight") {
        updateIndex(setIndex, totalItems, 1);
      } else if (e.key == "Escape") {
        setIndex(undefined);
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [index]);

  if (index == undefined) {
    return null;
  }

  return createPortal(
    <div
      className={styles.fullscreen}
      onClick={(e) => {
        if (index == undefined) {
          return;
        }

        if (e.clientX < window.innerWidth * 0.25) {
          updateIndex(setIndex, totalItems, -1);
        } else if (e.clientX > window.innerWidth * 0.75) {
          updateIndex(setIndex, totalItems, 1);
        } else {
          setIndex(undefined);
        }
      }}
    >
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
