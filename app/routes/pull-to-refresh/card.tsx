import React from "react";
import "./index.css";

function Card({
  children,
  style = {},
  color = "#000",
  left = false,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
  left?: boolean;
}) {
  return (
    <div
      style={{
        width: '100%',
        border: `1px solid ${color}`,
        height: left ? '300px' : '240px',
        backgroundColor: color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Card;
