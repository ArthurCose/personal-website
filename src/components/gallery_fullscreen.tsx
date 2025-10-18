import styles from "@/styles/Gallery.module.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Press_Start_2P } from "next/font/google";
import { useNavigationGuard } from "next-navigation-guard";
import { AnimatePresence, motion, TargetAndTransition } from "motion/react";

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
  const [justOpened, setJustOpened] = useState(false);
  const [itemInitialStyle, setItemInitialStyle] = useState<
    TargetAndTransition | undefined
  >(undefined);
  const [prevIndex, setPrevIndex] = useState(index);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!guard.active) {
      return;
    }

    guard.reject();
    setIndex(undefined);
  }, [guard.active]);

  // resolve open
  useEffect(() => {
    setJustOpened(prevIndex == undefined);

    if (initialBounds) {
      setItemInitialStyle({
        position: "absolute",
        top: initialBounds.y,
        left: initialBounds.x,
        width: initialBounds.width + "px",
        height: initialBounds.height + "px",
      });
    }
  }, [prevIndex, initialBounds]);

  // resolve initial style for transitioning items
  useEffect(() => {
    if (prevIndex == undefined || index == undefined) {
      return;
    }

    let itemInitialStyle: TargetAndTransition = {};

    itemInitialStyle = {
      zIndex: 1,
      opacity: 0,
    };

    if (prevIndex < index) {
      itemInitialStyle.left = "100vw";
      itemInitialStyle.transform = "translateX(0%)";
    } else {
      itemInitialStyle.left = 0;
      itemInitialStyle.transform = "translateX(-100%)";
    }

    setItemInitialStyle(itemInitialStyle);
  }, [prevIndex, index]);

  // handle keyboard
  useEffect(() => {
    setPrevIndex(index);

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

    // block scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", listener);
      document.body.style.overflow = "";
    };
  }, [index]);

  if (!mounted) {
    return null;
  }

  // we linger on the prevIndex to apply exit transitions
  const visibleIndex = prevIndex;

  if (visibleIndex == undefined) {
    return createPortal(<AnimatePresence />, document.body);
  }

  const initialBoundsJustSet = initialBounds && justOpened;

  // handle exit transition
  let itemExitStyle: TargetAndTransition | undefined;

  if (index != undefined && index != prevIndex) {
    itemExitStyle = {
      left: visibleIndex < index ? 0 : "100vw",
      transform: "translateX(-50%)",
      zIndex: 1,
      opacity: 0,
    };
  }

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
        <AnimatePresence>
          <motion.div
            key={visibleIndex}
            layout
            transition={{ ease: "easeOut", duration: 0.3 }}
            initial={itemInitialStyle}
            animate={{
              opacity: 1,
              transform: "translateX(0%)",
              left: "",
              top: "",
              width: "",
              height: "",
            }}
            exit={itemExitStyle}
            style={{
              position: "absolute",
            }}
            className={
              !initialBoundsJustSet ? styles.item_container : undefined
            }
          >
            {renderItem(visibleIndex)}
          </motion.div>
        </AnimatePresence>

        <div
          className={styles.count}
          style={{ fontFamily: font.style.fontFamily }}
        >
          {visibleIndex + 1}/{totalItems}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
