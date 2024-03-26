import { FC } from "react";
import { ResponsiveBar } from "@nivo/bar";

interface BarChartNivoProps {
  data: any;
  keys: string[];
  fillData?: any;
  indexBy: string;
  padding?: number;
}

const BarChartNivo: FC<BarChartNivoProps> = ({
  data = [],
  keys = [],
  fillData = [],
  padding = 0.25,
  indexBy = "country",
}) => (
  <ResponsiveBar
    data={data}
    padding={padding}
    indexBy={indexBy}
    colors={{ scheme: "nivo" }}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    margin={{ top: 40, right: 20, bottom: 60, left: 60 }}
    keys={keys}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={fillData}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: 32,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "food",
      legendPosition: "middle",
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      e.id + ": " + e.formattedValue + " in country: " + e.indexValue
    }
  />
);

export default BarChartNivo;
