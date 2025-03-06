import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import styles from "@/styles/Project.module.css";
import Link from "next/link";

type ProjectProps = {
  name: string;
  icon: StaticImageData | string;
  iconHeight?: number;
  repo?: string;
  links?: {
    icon: "firefox" | "chromium" | "invite_to_discord" | "video" | "generic";
    href: string;
  }[];
  children?: ReactNode;
};

function createBackgroundStyle(url: string): React.CSSProperties {
  return {
    background: `url(${url})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
}

export default function Project(props: ProjectProps) {
  const links = props.links?.map((link) => {
    let child;
    let iconStyle: React.CSSProperties | undefined;

    switch (link.icon) {
      case "chromium":
        iconStyle = createBackgroundStyle("/trademarks/chromium.svg");
        break;
      case "firefox":
        iconStyle = createBackgroundStyle("/trademarks/firefox.png");
        break;
      case "invite_to_discord":
        iconStyle = createBackgroundStyle("/trademarks/discord-color.png");
        break;
      case "video":
        child = "📺";
        break;
      case "generic":
        child = "🔗";
        break;
    }

    return (
      <Link key={link.href} className={styles.link} href={link.href}>
        <div className={styles.linkIcon} style={iconStyle}>
          {child}
        </div>
      </Link>
    );
  });

  return (
    <div className={styles.container}>
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
          <div className={styles.name}>{props.name}</div>

          <div>{props.children}</div>

          <div className={styles.links}>
            {links}

            {props.repo && (
              <Link className={styles.link} href={props.repo}>
                <div
                  className={styles.linkIcon}
                  style={createBackgroundStyle("/trademarks/github-white.svg")}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
