import React from "react";

function Gauge({ value = 72, size = 200 }) {
  const radius = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 12;

  const angle = (value / 100) * 180;
  const angleRad = (angle - 90) * (Math.PI / 180);
  const pointerLength = radius - 10;
  const pointerX = cx + pointerLength * Math.cos(angleRad);
  const pointerY = cy + pointerLength * Math.sin(angleRad);

  const arcStart = {
    x: cx - radius,
    y: cy,
  };

  const arcEnd = {
    x: cx + radius,
    y: cy,
  };

  const largeArcFlag = value > 50 ? 1 : 0;

  return (
    <svg width={size} height={size / 2 + 20}>
      {/* 背景弧 */}
      <path
        d={`M ${arcStart.x},${arcStart.y}
            A ${radius},${radius} 0 1,1 ${arcEnd.x},${arcEnd.y}`}
        stroke="#E2E8F0"
        fill="none"
        strokeWidth={strokeWidth}
      />

      {/* 进度弧 */}
      <path
        d={`M ${arcStart.x},${arcStart.y}
            A ${radius},${radius} 0 ${largeArcFlag},1 
              ${cx + radius * Math.cos((angle - 90) * Math.PI / 180)},
              ${cy + radius * Math.sin((angle - 90) * Math.PI / 180)}`}
        stroke="#4FD1C5"
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* 指针 */}
      <line
        x1={cx}
        y1={cy}
        x2={pointerX}
        y2={pointerY}
        stroke="#2D3748"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 圆心小点 */}
      <circle cx={cx} cy={cy} r="4" fill="#2D3748" />

      {/* 数值文本 */}
      <text
        x={cx}
        y={cy + 30}
        fontSize="20"
        textAnchor="middle"
        fill="#2D3748"
      >
        {value}%
      </text>
    </svg>
  );
}


export default function Index() {
  return (
    <div style={{ height: '500px', width: '100%', backgroundColor: '#ddd' }}>
      <Gauge value={60} size={200} />
    </div>
  )
}
