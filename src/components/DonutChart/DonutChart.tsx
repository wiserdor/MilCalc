import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { CSSProperties, useRef } from 'react'
import styles from './DonutChart.module.css'

export interface DonutChartProps {
  size: number
  strokeWidth: number
  data: {
    color: CSSProperties['color']
    value: number
  }[]
}

const Tooltip = (props: {
  text: string
  value: number
  color: CSSProperties['backgroundColor']
}) => {
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: true,
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(0),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    placement: 'top',
  })
  const role = useRole(context, { role: 'tooltip' })
  const { getReferenceProps, getFloatingProps } = useInteractions([role])

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()} />
      <FloatingPortal>
        <div
          className={styles.tooltip}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <FloatingArrow ref={arrowRef} context={context} fill="white" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <div style={{ color: props.color, fontWeight: 700, fontSize: 12 }}>
              ₪
              {props.value.toLocaleString('he-IL', {
                maximumFractionDigits: 0,
              })}{' '}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: '#6f6f6f',
              }}
            >
              {props.text}
            </div>
          </div>
        </div>
      </FloatingPortal>
    </>
  )
}

const DonutChart = (props: DonutChartProps) => {
  const { size, strokeWidth, data } = props

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let accumulatedPercentage = 0

  const calculatePopoverCoordinates = (percentage: number) => {
    const popoverRadius = radius - strokeWidth / 2
    const angle =
      2 * Math.PI * (accumulatedPercentage + percentage / 2) - Math.PI / 2
    accumulatedPercentage += percentage // Update for the next segment
    return {
      x: size / 2 + popoverRadius * Math.cos(angle),
      y: size / 2 + popoverRadius * Math.sin(angle),
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((item, index) => {
          const dashArray = (item.value / 100) * circumference
          const dashOffset =
            (index === 0 ? 0 : accumulatedPercentage - item.value / 100) *
            circumference

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashArray} ${circumference - dashArray}`}
              strokeDashoffset={-dashOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          )
        })}
      </svg>
      {data.map((item, index) => {
        const popoverPosition = calculatePopoverCoordinates(item.value / 100)
        return (
          <div
            style={{
              position: 'absolute',
              right: popoverPosition.x,
              top: popoverPosition.y,
              transform: 'translate(-50%, -50%)', // Adjust this to position the popover correctly
            }}
          >
            <Tooltip
              key={index}
              text={`${item.value}%`}
              value={0}
              color={item.color}
            />
          </div>
        )
      })}
    </div>
  )
}

export default DonutChart
