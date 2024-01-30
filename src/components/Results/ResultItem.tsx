import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  safePolygon,
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

export interface NonApprovedItemProps {
  name: string
  totalCompensation: number
  totalCompensationStr?: string
  description?: string
  nonDirectMoney?: boolean
  isMoney?: boolean
  dateOfPayment?: Date
  link?: { text: string; url: string }
  idfLink?: string
}

const Tooltip = (props: {
  text: string
  link?: NonApprovedItemProps['link']
}) => {
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
  const hover = useHover(context, {
    move: true,
    handleClose: safePolygon({
      requireIntent: false,
    }),
  })
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
          <>
            <div
              className={style.tooltip}
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <div>{props.text}</div>
              {props.link && (
                <div style={{ marginTop: 8 }}>
                  <a
                    href={props.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {props.link.text}
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </FloatingPortal>
    </>
  )
}

const ResultItem = (props: NonApprovedItemProps) => {
  const {
    name,
    totalCompensation,
    totalCompensationStr,
    description,
    nonDirectMoney = false,
    isMoney = true,
    link,
    idfLink,
  } = props
  return (
    <div className={style.approvedItem}>
      <div className={style.approvedItemTop}>
        {isMoney && (
          <div className={style.approvedItemTotalCompensation}>
            {totalCompensationStr
              ? totalCompensationStr
              : `${
                  nonDirectMoney ? 'בשווי' : ''
                } ₪${totalCompensation.toLocaleString('he-IL')}`}
          </div>
        )}
        <div>{name}</div>
      </div>
      <a href={idfLink} target="_blank" rel="noopener noreferrer">
        <img src="/svg/arrow-left.svg" />
      </a>
      {description && (
        <div style={{ position: 'relative', top: 4, maxHeight: 0 }}>
          <Tooltip text={description} link={link} />
        </div>
      )}
    </div>
  )
}

export default ResultItem
