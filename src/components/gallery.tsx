import React from "react";
import { MouseEventHandler, useState } from "react";
import styles from "@/styles/Gallery.module.css";
import GalleryFullscreen from "@/components/gallery_fullscreen";

type Props = {
  totalItems: number;
  renderListItem: (i: number, onClick: MouseEventHandler) => React.ReactNode;
  renderFullscreenItem: (i: number) => React.ReactNode;
};

type ListProps = {
  setIndex: (i: number) => void;
  setInitialBounds: (bounds: DOMRect) => void;
  totalItems: Props["totalItems"];
  renderItem: Props["renderListItem"];
};

const GalleryList = React.memo(function ({
  setIndex,
  setInitialBounds,
  totalItems,
  renderItem: renderItem,
}: ListProps) {
  return (
    <div className={styles.gallery}>
      {Array.from({ length: totalItems }, (_, i) =>
        renderItem(i, (e) => {
          const target = e.target as HTMLElement;
          setInitialBounds(target.getBoundingClientRect());
          setIndex(i);
        })
      )}
    </div>
  );
});

export default function Gallery({
  totalItems,
  renderListItem,
  renderFullscreenItem,
}: Props) {
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [initialBounds, setInitialBounds] = useState<DOMRect | undefined>(
    undefined
  );

  return (
    <>
      <GalleryList
        setIndex={setIndex}
        setInitialBounds={setInitialBounds}
        totalItems={totalItems}
        renderItem={renderListItem}
      />

      <GalleryFullscreen
        initialBounds={initialBounds}
        index={index}
        setIndex={setIndex}
        totalItems={totalItems}
        renderItem={renderFullscreenItem}
      />
    </>
  );
}
