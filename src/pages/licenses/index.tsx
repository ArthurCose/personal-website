import licenseMap from "@/_licenses.json";
import Link from "next/link";
import styles from "@/styles/Licenses.module.css";

export default function Licenses() {
  return (
    <>
      <h2>Attribution</h2>
      <p>This website is powered by open source software:</p>

      <br />

      <div>
        {licenseMap.packages.map((project) => {
          const key = project.name + "@" + project.version;
          const keyUri = encodeURIComponent(key).replaceAll("%40", "@");

          return (
            <div key={key} className={styles.list_item}>
              <div className={styles.project_name}>{project.name}</div>

              <div className={styles.links}>
                {project.homepage && (
                  <Link href={project.homepage}>Website</Link>
                )}

                {project.repository?.startsWith("https://") && (
                  <Link href={project.repository}>Repo</Link>
                )}

                <Link href={`/licenses/${keyUri}`}>License</Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
