"use client"

import FootballStats from "@/components/stats";
import { SingleFixtureStats } from "@/types/scores";
import React, { useState } from "react";

const FixtureCard = ({ data }: { data: SingleFixtureStats }) => {
  const fixture = data.fixture[0];
  const [showDetails, setShowDetails] = useState(false); // <-- toggle state

  const homeWin = data.scores.Home > data.scores.Away;
  const awayWin = data.scores.Away > data.scores.Home;

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Group/Pool Header */}
      <div className="bg-secondary/30 px-4 py-2 border-b">
        <h3 className="font-medium text-sm flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">{fixture.league}</span>
            <span className="text-muted-foreground">|</span>
            <span>{fixture.matchday}</span>
          </div>
          <button
            className="text-primary text-sm hover:underline"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            {showDetails ? "Hide Details ▲" : "View Details ▼"}
          </button>
        </h3>
      </div>

      <div className="m-1 border-b border-gray-300 rounded-md py-3 hover:bg-gray-300 cursor-pointer text-primary">
        <div className="grid grid-cols-12 gap-2 text-sm font-semibold">
          {/* Home Team */}
          <div className="col-span-5 flex gap-1 lg:flex-col flex-row-reverse lg:justify-center items-center">
            <img
              className="max-w-10 max-h-10 w-auto h-auto"
              src={"/homeLogo.png"}
              alt=""
            />
            <div className=" text-gray-450 text-right">
              {fixture.team1_name}
            </div>
          </div>

          {/* Score / Time */}
          <div className="col-span-2 flex items-center justify-center">
            {fixture.game_status === "notstarted" ? (
              fixture.game_date === "" ? (
                <div className="animate-spin-slow">⌛</div>
              ) : (
                <div>{fixture.game_date}</div>
              )
            ) : (
              <div className="flex flex-col items-center font-bold lg:text-3xl text-base">
                <div className="flex">
                  <div className={homeWin ? "text-gray-900" : "text-gray-500"}>
                    {data.scores.Home}
                  </div>
                  <div className="mx-1 md:mx-2">&ndash;</div>
                  <div className={awayWin ? "text-gray-900" : "text-gray-500"}>
                    {data.scores.Away}
                  </div>
                </div>
                <div className="text-xs">
                  {fixture.game_status === "ended" ||
                  fixture.game_status === "FT"
                    ? "FT"
                    : fixture.minute == "45" &&
                      fixture.game_moment == "secondhalf"
                    ? "HT"
                    : fixture.minute}
                </div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="col-span-5 flex gap-1 lg:flex-col flex-row lg:justify-center items-center">
            <img
              className="max-w-10 max-h-10 w-auto h-auto"
              src={"/awayLogo.png"}
              alt=""
            />
            <div>{fixture.team2_name}</div>
          </div>
        </div>
      </div>

      {/* Match Details Toggle Section */}
      {showDetails && (
        <div className="px-6 py-3 text-sm bg-gray-50 border-t text-gray-700">
          <FootballStats home={data.home} away={data.away} cards={data.cards} fouls={data.fouls}  />
        </div>
      )}
    </div>
  );
};

export default FixtureCard;
