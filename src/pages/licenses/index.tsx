import licenseMap from "@/_licenses.json";
import AttributionListItem from "@/components/attribution_list_item";

export default function Licenses() {
  return (
    <>
      <h1>Attribution</h1>
      <p>This website is powered by open source software:</p>

      <br />

      <div>
        {licenseMap.packages.map((project) => {
          const key = project.name + "@" + project.version;

          return <AttributionListItem key={key} project={project} />;
        })}
      </div>
    </>
  );
}
