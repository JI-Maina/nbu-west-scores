import { SingleFixtureStats } from "@/types/scores";
import "server-only";

const token = process.env.NEXT_PUBLIC_TOKEN;
const baseURL = process.env.NEXT_PUBLIC_API_HOST;

// fetch season fixtures
export const getFixtureByID = async (id: number): Promise<SingleFixtureStats> => {
  const res = await fetch(`https://apis.tisini.co.ke/apiagent7.php?event=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch fixture");

  return res.json();
};

// fetch season fixtures
export const fetchSeasonFixtures = async (id: number) => {
  const res = await fetch(`${baseURL}?gettoken=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "fixtures", seasonid: id }),
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch fixtures");

  return res.json();
};