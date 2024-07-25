import { ResponsiveLine } from '@nivo/line';
import React from 'react';

const LineChart = ({ data, type }) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 250, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // có thẻ thay đỏi tên biểu đồ
        legend: type ? type : 'Dashboard',
        legendOffset: 36,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
        truncateTickAt: 0,
      }}
      colors={{ scheme: 'nivo' }}
      lineWidth={3}
      pointSize={3}
      pointColor={{ from: 'color', modifiers: [] }}
      pointBorderWidth={3}
      pointBorderColor={{ from: 'serieColor', modifiers: [] }}
      pointLabel="data.y"
      pointLabelYOffset={-13}
      areaBlendMode="lighten"
      areaBaselineValue={100}
      useMesh={true}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          justify: false,
          translateX: 105,
          translateY: 9,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 77,
          itemHeight: 36,
          itemOpacity: 0.75,
          symbolSize: 14,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
