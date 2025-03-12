import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Sidebar.module.css";
import classNames from "classnames";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  reduceAnimations: boolean;
  setReduceAnimations: (enable: boolean) => void;
};

export default function Sidebar({
  open,
  setOpen,
  reduceAnimations,
  setReduceAnimations,
}: Props) {
  const close = () => setOpen(false);

  return (
    <div id="sidebar" style={open ? { transform: "translate(0)" } : undefined}>
      <SidebarLink name="About" href="/" onClick={close} />
      <SidebarLink name="Projects" href="/projects" onClick={close} />
      <SidebarLink name="Artwork" href="/artwork" onClick={close} />
      <SidebarLink name="Attribution" href="/licenses" onClick={close} />

      <div className={styles.options}>
        <SidebarOption
          enabled={reduceAnimations}
          onClick={() => setReduceAnimations(!reduceAnimations)}
        >
          Reduce Animations
        </SidebarOption>
      </div>
    </div>
  );
}

function SidebarOption({
  enabled,
  onClick,
  children,
}: { enabled?: boolean; onClick: () => void } & React.PropsWithChildren) {
  return (
    <a href="javascript:void(0)" onClick={onClick}>
      {children}
      {enabled != undefined && (
        <span className={classNames(!enabled && styles.hidden)}>{" ✅"}</span>
      )}
    </a>
  );
}

type SidebarLinkProps = {
  href: string;
  name: string;
  onClick: () => void;
};

function SidebarLink({ href, name, onClick }: SidebarLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={onClick}
      className={router.asPath == href ? "local-link" : undefined}
    >
      {name}
    </Link>
  );
}
