import styles from "@/styles/Gallery.module.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Press_Start_2P } from "next/font/google";
import { useNavigationGuard } from "next-navigation-guard";
import { AnimatePresence, motion } from "motion/react";

const font = Press_Start_2P({ weight: "400", subsets: ["latin"] });

type Props = {
  initialBounds?: DOMRect;
  index?: number;
  setIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  totalItems: number;
  renderItem: (i: number) => React.ReactNode;
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
  initialBounds,
  index,
  setIndex,
  totalItems,
  renderItem,
}: Props) {
  const guard = useNavigationGuard({ enabled: index != undefined });
  const [prevInitialBounds, setPrevInitialBounds] = useState(initialBounds);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!guard.active) {
      return;
    }

    guard.reject();
    setIndex(undefined);
  }, [guard.active]);

  useEffect(() => {
    setPrevInitialBounds(initialBounds);
  }, [initialBounds]);

  // handle keyboard
  useEffect(() => {
    if (index == undefined) {
      return index;
    }

    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      if (e.key == "ArrowLeft") {
        updateIndex(setIndex, totalItems, -1);
      } else if (e.key == "ArrowRight") {
        updateIndex(setIndex, totalItems, 1);
      } else if (e.key == "Escape") {
        setIndex(undefined);
      } else {
        return;
      }

      e.preventDefault();
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [index]);

  if (!mounted) {
    return null;
  }

  if (index == undefined) {
    return createPortal(<AnimatePresence />, document.body);
  }

  const initialBoundsJustSet =
    prevInitialBounds != initialBounds && initialBounds != null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
        <motion.div
          layout
          transition={{ ease: "easeOut", duration: 0.3 }}
          style={
            initialBoundsJustSet
              ? {
                  position: "absolute",
                  top: initialBounds.y,
                  left: initialBounds.x,
                  width: initialBounds.width + "px",
                  height: initialBounds.height + "px",
                }
              : undefined
          }
          className={!initialBoundsJustSet ? styles.item_container : undefined}
        >
          {renderItem(index)}
        </motion.div>

        <div
          className={styles.count}
          style={{ fontFamily: font.style.fontFamily }}
        >
          {index + 1}/{totalItems}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
