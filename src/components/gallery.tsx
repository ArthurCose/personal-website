import { MouseEventHandler, useState } from "react";
import styles from "@/styles/Gallery.module.css";
import GalleryFullscreen from "@/components/gallery_fullscreen";

type Props = {
  totalItems: number;
  renderListItem: (i: number, onClick: MouseEventHandler) => React.ReactNode;
  renderFullscreenItem: (i: number) => React.ReactNode;
};

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
      <div className={styles.gallery}>
        {Array.from({ length: totalItems }, (_, i) =>
          renderListItem(i, (e) => {
            const target = e.target as HTMLElement;
            setInitialBounds(target.getBoundingClientRect());
            setIndex(i);
          })
        )}
      </div>

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
