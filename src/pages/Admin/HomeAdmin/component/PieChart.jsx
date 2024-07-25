import { ResponsivePie } from '@nivo/pie';
import React from 'react';

const PieChart = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: '#FF0000',
            },
          },
          legend: {
            text: {
              fill: 'black',
            },
          },
          ticks: {
            line: {
              stroke: '#FF0000',
              strokeWidth: 1,
            },
            text: {
              fill: '#FF0000',
            },
          },
        },
        legends: {
          text: {
            fill: '#FF0000',
          },
        },
      }}
      margin={{ top: 80, right: 180, bottom: 100, left: 20 }}
      // độ dày
      //   innerRadius={0.2}
      sortByValue={true}
      padAngle={0.7}
      //   cornerRadius={3}
      arcLabelsRadiusOffset={0.6}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      startAngle={360}
      endAngle={0}
      // ,màu của border
      borderColor={{
        from: 'color',
        modifiers: [['darker', '2']],
      }}
      arcLinkLabelsSkipAngle={10}
      // màu text
      arcLinkLabelsTextColor="#000000"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
    />
  );
};

export default PieChart;
