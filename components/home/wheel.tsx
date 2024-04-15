"use client";

import { useMemo } from "react";
import { useGauge } from "use-gauge";

interface StatProps {
  value: number;
}

const START_ANGLE = 45;
const END_ANGLE = 315;

export default function Wheel({ value }: StatProps) {
  const gauge = useGauge({
    domain: [0, 10],
    startAngle: START_ANGLE,
    endAngle: END_ANGLE,
    numTicks: 10,
    diameter: 140,
  });

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 12,
    tipRadius: 2,
    offset: 10,
  });

  const arcStroke = useMemo(() => {
    let color = "";
    if (value === 0) {
      color = "";
    } else if (value <= 4) {
      color = `red`;
    } else if (value <= 7) {
      color = "yellow";
    } else {
      color = "green";
    }

    return `url(#${color}Gradient)`;
  }, [value]);

  return (
    <div className="relative z-0 flex-grow h-full w-full">
      <svg className="h-full w-full overflow-visible" {...gauge.getSVGProps()}>
        <defs>
          <linearGradient
            id="greenGradient"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4ade80"></stop>
            <stop offset="100%" stopColor="#22c55e"></stop>
          </linearGradient>
          <linearGradient
            id="yellowGradient"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fde047"></stop>
            <stop offset="100%" stopColor="#facc15"></stop>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f87171"></stop>
            <stop offset="100%" stopColor="#ef4444"></stop>
          </linearGradient>
        </defs>
        <g id="arcs">
          <path
            {...gauge.getArcProps({
              offset: -32,
              startAngle: START_ANGLE,
              endAngle: END_ANGLE,
            })}
            fill="none"
            strokeWidth={36}
            className="stroke-gray-200"
          />
          <path
            {...gauge.getArcProps({
              offset: -32,
              startAngle: START_ANGLE,
              endAngle: gauge.valueToAngle(value),
            })}
            strokeWidth={36}
            fill="transparent"
            stroke={arcStroke}
          />
        </g>
        <g id="needle">
          <circle className="fill-white" {...needle.base} r={20} />
          <line
            className="stroke-gray-600"
            strokeLinecap="round"
            strokeWidth={3.5}
            x1={needle.base.cx}
            x2={needle.tip.cx}
            y1={needle.base.cy}
            y2={needle.tip.cy}
          />
        </g>
      </svg>
    </div>
  );
}
