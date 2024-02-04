import { CSSProperties } from 'react'

const ArrowLeft = ({
  strokeColor,
}: {
  strokeColor: CSSProperties['color']
}) => {
  return (
    <svg
      width="15"
      height="24"
      viewBox="0 0 15 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1277 12H1.38086M1.38086 12L4.89848 8.48242M1.38086 12L4.89848 15.5177"
        stroke={strokeColor}
        stroke-width="1.5"
      />
    </svg>
  )
}

export default ArrowLeft
