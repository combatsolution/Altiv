/* eslint-disable */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const polarToCartesian = (cx, cy, r, angle) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const arcPath = (cx, cy, rOuter, rInner, startAngle, endAngle) => {
  const startOuter = polarToCartesian(cx, cy, rOuter, startAngle);
  const endOuter = polarToCartesian(cx, cy, rOuter, endAngle);
  const startInner = polarToCartesian(cx, cy, rInner, endAngle);
  const endInner = polarToCartesian(cx, cy, rInner, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `
    M ${startOuter.x} ${startOuter.y}
    A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}
    L ${startInner.x} ${startInner.y}
    A ${rInner} ${rInner} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}
    Z
  `;
};

export default function CustomDonutChart({
  data = [],
  size = 700,
  innerRadius = 80,
  outerRadius = 120,
  onSliceClick = () => { },
  onSliceHover = () => { },
  onSliceLeave = () => { },
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, label: '', value: 0 });

  useEffect(() => {
    let frame;
    let start;
    const duration = 300;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setAnimationProgress(progress);
      if (progress < 1) frame = requestAnimationFrame(animate);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // const timer = setTimeout(() => {
        setSelectedIndex(0);
        const item = data[0];
        onSliceClick(0, item);
      // }, 1800);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const cx = size / 2;
  const cy = size / 2;
  const shiftDistance = 10;
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let angleStart = 0;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: size, aspectRatio: 1, userSelect: 'none' }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`${-size * 0.1} ${-size * 0.1} ${size * 1.2} ${size * 1.2}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {data.map((item, i) => {
          const targetAngle = (item.value / total) * 360;
          const animatedAngle = targetAngle * animationProgress;
          const angleEnd = angleStart + animatedAngle;

          const midAngle = angleStart + animatedAngle / 2;
          const midAngleRad = ((midAngle - 90) * Math.PI) / 180;

          const isActive = activeIndex === i;
          const isSelected = selectedIndex === i;

          const dx = isSelected ? shiftDistance * Math.cos(midAngleRad) : 0;
          const dy = isSelected ? shiftDistance * Math.sin(midAngleRad) : 0;

          const shiftedCx = cx + dx;
          const shiftedCy = cy + dy;
          const sliceOuterRadius = isSelected ? outerRadius + 10 : outerRadius; // Increase thickness if selected
          const path = arcPath(shiftedCx, shiftedCy, sliceOuterRadius, innerRadius, angleStart, angleEnd)
          // const path = arcPath(shiftedCx, shiftedCy, outerRadius, innerRadius, angleStart, angleEnd);
          const borderPath = arcPath(cx, cy, outerRadius + 6, outerRadius + 2, angleStart, angleEnd);

          // Connector line points
          const startX = cx + outerRadius * Math.cos(midAngleRad);
          const startY = cy + outerRadius * Math.sin(midAngleRad);
          const midX = cx + (outerRadius + 10) * Math.cos(midAngleRad);
          const midY = cy + (outerRadius + 10) * Math.sin(midAngleRad);
          const isRight = Math.cos(midAngleRad) >= 0;
          const endX = midX + (isRight ? 10 : -10);
          const endY = midY;

          // Event handlers
          const handleClick = () => {
            if (selectedIndex === i) {
              setSelectedIndex(null);
              setTooltip({ show: false, x: 0, y: 0, label: '', value: 0 });
              onSliceClick(null, null);
            } else {
              setSelectedIndex(i);
              setActiveIndex(null);
              const tooltipPoint = polarToCartesian(cx, cy, (outerRadius + innerRadius) / 2, midAngle);
              // setTooltip({
              //   show: true,
              //   x: tooltipPoint.x,
              //   y: tooltipPoint.y,
              //   label: item.label,
              //   value: item.value,
              // });
              onSliceClick(i, item);
            }
          };

          const handleMouseEnter = () => {
            // if (selectedIndex === null) {
            setActiveIndex(i);
            const tooltipPoint = polarToCartesian(cx, cy, (outerRadius + innerRadius) / 2, midAngle);
            // setTooltip({
            //   show: true,
            //   x: tooltipPoint.x,
            //   y: tooltipPoint.y,
            //   label: item.label,
            //   value: item.value,
            // });
            onSliceHover(i, item);
            // }
          };

          const handleMouseLeave = () => {
            // if (selectedIndex === null) {
            setActiveIndex(null);
            setTooltip({ show: false, x: 0, y: 0, label: '', value: 0 });
            onSliceLeave();
            // }
          };

          angleStart += targetAngle;

          return (
            <g key={i}>
              <path
                d={path}
                fill={item.color}
                stroke="#fff"
                strokeWidth="2"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                  opacity: activeIndex !== null && !isActive && selectedIndex !== activeIndex ? 0.3 : 1,
                }}
              />
              {isActive && selectedIndex !== activeIndex && (
                <path
                  d={borderPath}
                  fill={item.color}
                  stroke={item.color}
                  strokeWidth="2"
                  opacity={0.3}
                  pointerEvents="none"
                />
              )}

              {/* Connector line */}
              {animationProgress === 1 && (
                <>
                  <polyline
                    points={`${startX},${startY} ${midX},${midY} ${endX},${endY}`}
                    stroke={item.color}
                    strokeWidth={2}
                    fill="none"
                  />
                  <text
                    x={endX + (isRight ? 5 : -5)}
                    y={endY + 4}
                    textAnchor={isRight ? 'start' : 'end'}
                    fontSize="12"
                    fill={item.color}
                  >
                    {item.label}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Center label */}
        {animationProgress === 1 && (selectedIndex !== null || activeIndex !== null) && (
          <>
            <text
              x={cx}
              y={cy - 10}
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              fill={selectedIndex !== null ? data[selectedIndex].color : data[activeIndex].color}
            >
              {selectedIndex !== null ? data[selectedIndex].label : data[activeIndex].label}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="14" fill="#555">
              {Math.round(
                ((selectedIndex !== null ? data[selectedIndex].value : data[activeIndex].value) / total) * 100
              )}
              %
            </text>
          </>
        )}
      </svg>

      {/* Tooltip */}
      {tooltip.show && (
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -100%)',
            left: tooltip.x,
            top: tooltip.y,
            background: '#fff',
            padding: '6px 10px',
            fontSize: 12,
            color: '#333',
            borderRadius: 4,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <strong>{tooltip.label}</strong>: {tooltip.value}
        </div>
      )}
    </div>
  );
}

CustomDonutChart.propTypes = {
  data: PropTypes.array,
  size: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  onSliceClick: PropTypes.func,
  onSliceHover: PropTypes.func,
  onSliceLeave: PropTypes.func,
}
