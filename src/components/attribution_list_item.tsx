import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Licenses.module.css";

type Project = {
  name: string;
  version: string;
  homepage?: string;
  repository?: string;
  funding?: string[];
  description?: string;
};

function AttributionItemLinks({ project }: { project: Project }) {
  const router = useRouter();

  const key = project.name + "@" + project.version;
  const keyUri = encodeURIComponent(key).replaceAll("%40", "@");
  const licenseLink = `/licenses/${keyUri}`;

  if (router.asPath != licenseLink) {
    return (
      <>
        {project.funding && <Link href={project.funding[0]}>Funding</Link>}

        <Link href={licenseLink}>Details</Link>
      </>
    );
  }

  return (
    <>
      {project.homepage && project.repository != project.homepage && (
        <Link href={project.homepage}>Website</Link>
      )}

      {project.funding && <Link href={project.funding[0]}>Funding</Link>}

      {project.repository?.startsWith("https://") && (
        <Link href={project.repository}>Repo</Link>
      )}
    </>
  );
}

export default function AttributionListItem({ project }: { project: Project }) {
  return (
    <div className={styles.list_item}>
      <div className={styles.project_info}>
        <div className={styles.project_name}>{project.name}</div>
        <div>{project.description}</div>
      </div>

      <div className={styles.links}>
        <AttributionItemLinks project={project} />
      </div>
    </div>
  );
}
