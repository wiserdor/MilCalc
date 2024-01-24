import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useInteractions,
  useRole,
  arrow,
  FloatingArrow,
} from '@floating-ui/react'
import React, { CSSProperties, useRef } from 'react'
import style from './ResultsBar.module.css'

type ResultsBarResult = {
  label: string
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
            <div style={{ color: props.color, fontWeight: 600, fontSize: 12 }}>
              {props.value} ש״ח
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 400,
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
          <div
            key={index}
            className={style.barSegment}
            style={{
              width: `${(segment.value / total) * 100}%`,
              background: segment.color,
            }}
          >
            <Tooltip
              value={segment.value}
              text={segment.label}
              color={segment.color}
            />
          </div>
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
            {(segment.value / total) * 100}%
          </div>
        ))}
      </div>
      {segments.map(
        (segment, index) =>
          segment.datePaid && (
            <React.Fragment key={index}>
              {index < segments.length - 1 && (
                <div
                  className={style.dottedLine}
                  style={{
                    right: `${
                      (segments
                        .slice(0, index + 1)
                        .reduce((sum, seg) => sum + seg.value, 0) /
                        total) *
                      100
                    }%`,
                  }}
                />
              )}
              {index < segments.length - 1 && (
                <div
                  className={style.segmentLabel}
                  style={{
                    right: `${
                      (segments
                        .slice(0, index + 1)
                        .reduce((sum, seg) => sum + seg.value, 0) /
                        total) *
                      100
                    }%`,
                  }}
                >
                  <div className={style.segmentLabelText}>
                    <img src="/svg/time-gray.svg" />
                    <div>ביום: 14.01.2024</div>
                  </div>
                </div>
              )}
            </React.Fragment>
          )
      )}
    </div>
  )
}

export default ResultsBar
