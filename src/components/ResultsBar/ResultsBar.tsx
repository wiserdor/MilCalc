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
import { motion } from 'framer-motion'
import { CSSProperties, useRef } from 'react'
import style from './ResultsBar.module.css'

type ResultsBarResult = {
  label: string
  description?: string
  value: number
  datePaid?: Date
  color: CSSProperties['backgroundColor']
}

export interface ResultsBarProps {
  segments: ResultsBarResult[]
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
          className={style.tooltip}
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

const ResultsBar = (props: ResultsBarProps) => {
  const { segments } = props
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  return (
    <div className={style.barContainer}>
      <div className={style.innerBarContainer}>
        {segments.map((segment, index) => (
          <motion.div
            layout
            key={index}
            className={style.barSegment}
            style={{
              width: `${(segment.value / total) * 100}%`,
              background: segment.color,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Tooltip
              value={segment.value}
              text={segment.label}
              color={segment.color}
            />
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'flex', padding: 8 }}>
        {segments.map((segment, index) => (
          <div
            key={index}
            className={style.barSegment}
            style={{
              width: `${(segment.value / total) * 100}%`,
              textAlign: `${index % 2 === 0 ? 'start' : 'end'}`,
              color: segment.color,
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {((segment.value / total) * 100).toLocaleString('he-IL', {
              maximumFractionDigits: 0,
            })}
            %
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {segments.map((segment, index) => (
          <div
            key={index}
            style={{ display: 'flex', flexDirection: 'row', gap: 8 }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2.52,
                backgroundColor: segment.color,
              }}
            />
            <div style={{ fontSize: 12, color: '#6f6f6f' }}>
              <span style={{ fontWeight: 700 }}>{segment.label}</span>:{' '}
              <span style={{ fontWeight: 400 }}>{segment.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultsBar
