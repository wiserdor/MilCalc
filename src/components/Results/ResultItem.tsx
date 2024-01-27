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
import style from './styles/Results.module.css'

export interface ApprovedItemProps {
  name: string
  totalCompensation: number
  description?: string
  nonDirectMoney?: boolean
  isMoney?: boolean
  paid?: boolean
  dateOfPayment?: Date
  url?: string
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
  const {
    name,
    totalCompensation,
    description,
    nonDirectMoney = false,
    isMoney = true,
  } = props
  return (
    <div className={style.approvedItem}>
      <div className={style.approvedItemTop}>
        {isMoney && (
          <div className={style.approvedItemTotalCompensation}>
            {`${
              nonDirectMoney ? 'בשווי' : ''
            } ₪${totalCompensation.toLocaleString('he-IL')}`}
          </div>
        )}
        <div>{name}</div>
      </div>
      {description && (
        <div style={{ position: 'relative', top: 4, maxHeight: 0 }}>
          <Tooltip text={description} />
        </div>
      )}
    </div>
  )
}

export default ResultItem
