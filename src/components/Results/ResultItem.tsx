import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { useState } from 'react'
import style from './Results.module.css'

export interface ApprovedItemProps {
  name: string
  totalCompensation: number
  description?: string
  nonDirectMoney?: boolean
  paid?: boolean
  paidDate?: string
}

const Tooltip = (props: { text: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
    ],
  })
  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ])

  return (
    <>
      <img
        style={{ marginTop: 54, position: 'absolute' }}
        src="/svg/circle-exclamation.svg"
        alt="exclamation"
        ref={refs.setReference}
        {...getReferenceProps()}
      />
      <FloatingPortal>
        {isOpen && (
          <div
            className={style.tooltip}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {props.text}
          </div>
        )}
      </FloatingPortal>
    </>
  )
}

const ResultItem = (props: ApprovedItemProps) => {
  const { name, totalCompensation, description, nonDirectMoney = false } = props
  return (
    <div className={style.approvedItem}>
      <div className={style.approvedItemTotalCompensation}>
        {`${nonDirectMoney ? 'בשווי' : ''} ₪${totalCompensation.toLocaleString(
          'he-IL'
        )}`}
      </div>
      <div>{name}</div>
      {description && <Tooltip text={description} />}
    </div>
  )
}

export default ResultItem
