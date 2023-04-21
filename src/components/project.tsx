import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import styles from "@/styles/Project.module.css";
import Link from "next/link";

type ProjectProps = {
  name: string;
  icon: StaticImageData | string;
  iconHeight?: number;
  repo?: string;
  link?: string;
  linkName?: string;
  children?: ReactNode;
};

export default function Project(props: ProjectProps) {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{props.name}</div>

      <div className={styles.detailContainer}>
        <div className={styles.imageContainer}>
          <Image
            width={128}
            height={props.iconHeight}
            src={props.icon}
            alt={props.name}
          />
        </div>

        <div className={styles.descriptionContainer}>
          <div>{props.children}</div>

          <div className={styles.links}>
            {props.repo && <Link href={props.repo}>GitHub</Link>}
            {props.link && (
              <Link href={props.link}>{props.linkName || "View"}</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
