import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Sidebar({ open, setOpen }: Props) {
  const close = () => setOpen(false);

  return (
    <div id="sidebar" style={{ display: open ? "flex" : undefined }}>
      <SidebarLink name="About" href="/" onClick={close} />
      <SidebarLink name="Projects" href="/projects" onClick={close} />
      <SidebarLink name="Attribution" href="/licenses" onClick={close} />
    </div>
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
