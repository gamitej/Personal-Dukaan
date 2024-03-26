import { FC } from "react";
import { ResponsivePie } from "@nivo/pie";

interface DonutChartProps {
  series: any;
  fillData?: any;
  padAngle?: number;
  innerRadius?: number;
  borderWidth?: number;
  cornerRadius?: number;
}

const DonutChart: FC<DonutChartProps> = ({
  series = [],
  fillData = [],
  padAngle = 2,
  borderWidth = 1,
  cornerRadius = 10,
  innerRadius = 0.75,
}) => (
  <ResponsivePie
    data={series}
    padAngle={padAngle}
    borderWidth={borderWidth}
    innerRadius={innerRadius}
    cornerRadius={cornerRadius}
    activeOuterRadiusOffset={8}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLabelsSkipAngle={10}
    arcLinkLabelsThickness={2}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={fillData}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

export default DonutChart;
