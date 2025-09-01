import React, { useEffect, useState } from "react";
import svgMap from "svgmap";
import "svgmap/dist/svgMap.min.css";
import emissionsData from "../data/EmissionData";

const Earth = () => {
  const [worldEmission, setWorldEmission] = useState(0);

  const calculateWorldEmission = () => {
    let total = 0;
    Object.values(emissionsData).forEach((country) => {
      const val = Number(country.emissions.replace(/,/g, ""));
      if (!isNaN(val)) total += val;
    });
    return total;
  };

  useEffect(() => {
    const container = document.getElementById("svgMap");
    if (container) container.innerHTML = "";

    new svgMap({
      targetElementID: "svgMap",
      colorMin: "#dc2626",
      colorMid: "#facc15",
      colorMax: "#16a34a",
      colorNoData: "#facc15",
      flagType: "image",
      data: {
        data: {
          emissions: {
            name: "CO₂ Emissions",
            format: "{0} MtCO₂",
            thousandSeparator: ",",
            thresholdMax: 10000,
            thresholdMin: 100,
          },
          rank: {
            name: "Global Rank",
            format: "#{0}",
            thresholdMin: 1,
            thresholdMax: 200,
          },
        },
        applyData: "rank",
        values: emissionsData,
      },
    });

    setWorldEmission(calculateWorldEmission());

    const interval = setInterval(() => {
      setWorldEmission(calculateWorldEmission());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-offwhite p-6 sm:p-10 rounded-5xl shadow-lg relative">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">
        Global CO₂ Emissions by Country
      </h2>
      <p className="text-center text-base sm:text-lg mb-6 text-gray-700 font-medium">
        World Total Emissions: {worldEmission.toLocaleString()} MtCO₂
      </p>
      <div className="overflow-x-auto">
        <div
          id="svgMap"
          className="w-[1200px] sm:w-full h-[500px] sm:h-[825px] rounded-xl"
        ></div>
      </div>
    </div>
  );
};

export default Earth;
