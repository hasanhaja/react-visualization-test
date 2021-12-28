import styled from "styled-components";
import React from 'react';
import { AllPostsData} from '@react-visualization-test/api';
import { BarGroup } from '@visx/shape';
import { AxisBottom } from '@visx/axis';
import { ChartData, ChartProcessor, Processor } from '@react-visualization-test/processor';
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';

export interface VisualizeProps {
  data: AllPostsData
}

const Container = styled.div`

`;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export interface Legend {
  domain: Array<string>;
  colors: Array<string>;
}

// TODO use visx parentsize component
const width = 800;
const height = 800;
const margin = {
  top: 40,
  bottom: 40,
  left: 0,
  right: 0,
};

const background = "#ffdede";
const darkColor = "#333";

export function Visualize({ data }: VisualizeProps) {
  const processor = new Processor(data);
  const chartProcessor = new ChartProcessor(processor.top3TopicsByMonth);

  const likelihoodDomain = chartProcessor.likelihoodDomain;
  const allChartData = chartProcessor.chartData;
  const keys = chartProcessor.uniqueKeys;
  const colors = chartProcessor.keyColors;

  const legend: Legend = {
    domain: keys,
    colors: colors,
  };

  // accessors
  const getMonth = (chartData: ChartData) => MONTHS[chartData.month];

  // scales
  const monthScale = scaleBand<string>({
    domain: allChartData.map(getMonth),
    padding: 0.2,
  });

  const topicScale = scaleBand<string>({
    domain: legend.domain,
    padding: 0.1,
  });

  const likelihoodScale = scaleLinear<number>({
    domain: [Math.min(...likelihoodDomain), Math.max(...likelihoodDomain)],
  });

  const legendColorScale = scaleOrdinal<string, string>({
    domain: legend.domain,
    range: legend.colors,
  });

  const legendGlyphSize = 15;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  monthScale.rangeRound([0, xMax]);
  topicScale.rangeRound([0, monthScale.bandwidth()]);
  likelihoodScale.range([yMax, 0]);

  // TODO Don't display bar if null or undefined (not sure which range to modify)

  return (
    <Container>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group top={margin.top} left={margin.left}>
          <BarGroup
            data={allChartData}
            keys={keys}
            height={yMax}
            x0={getMonth}
            x0Scale={monthScale}
            x1Scale={topicScale}
            yScale={likelihoodScale}
            color={legendColorScale}
          >
            {(barGroups) =>
              barGroups.map((barGroup) => (
                <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                  {barGroup.bars.map((bar) => (
                    <rect
                      key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={4}
                    />
                  ))}
                </Group>
              ))
            }
          </BarGroup>
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          scale={monthScale}
          stroke={darkColor}
          tickStroke={darkColor}
          hideAxisLine
          tickLabelProps={() => ({
            fill: darkColor,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
      </svg>
      <LegendOrdinal scale={legendColorScale} labelFormat={(label) => `${label.replace(/^\w/, c => c.toUpperCase())}`}>
        {(labels) => (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {labels.map((label, i) => (
              <LegendItem
                key={`legend-quantile-${i}`}
                margin="0 5px"
              >
                <svg width={legendGlyphSize} height={legendGlyphSize}>
                  <rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize} />
                </svg>
                <LegendLabel align="left" margin="0 0 0 4px">
                  {label.text}
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
    </Container>
  );
}

export default Visualize;
