import licenseMap from "@/_licenses.json";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Licenses.module.css";
import AttributionListItem from "@/components/attribution_list_item";

export default function License() {
  const router = useRouter();

  const key = router.query.key;

  if (!key) {
    return <></>;
  }
  const atIndex = key.indexOf("@", 1);
  const name = key.slice(0, atIndex);
  // const version = key.slice(atIndex + 1);

  const project = licenseMap.packages.find((project) => project.name == name);

  if (!project) {
    return <>Page not found</>;
  }

  const licenseTextMap = licenseMap.licenseText as { [key: string]: string };

  return (
    <>
      <AttributionListItem project={project} />
      <br />
      <pre className={styles.license_text}>
        {project.licenses.map(
          (license) => licenseTextMap[license.text] + "\n\n\n\n"
        )}
      </pre>
    </>
  );
}
