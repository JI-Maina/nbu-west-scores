import { getFixtureByID } from "@/data/get-fixtures";

import FixtureCard from "./fixture-card";
;

export default async function Home() {
  const [womenData, countyData, regionData] = await Promise.all([
    getFixtureByID(8534),
    getFixtureByID(8535),
    getFixtureByID(8536),
  ]);

  return (
    <main className="my-4 space-y-6 max-w-5xl mx-auto p-2">
      <FixtureCard data={womenData} />
      <FixtureCard data={countyData} />
      <FixtureCard data={regionData} />
    </main>
  );
}
