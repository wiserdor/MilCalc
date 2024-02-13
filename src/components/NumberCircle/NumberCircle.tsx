import style from './NumberCircle.module.css'

interface NumberCircleProps {
  number: number
}

const NumberCircle = (props: NumberCircleProps) => {
  const { number } = props

  return (
    <div
      className={`rounded-full bg-idf text-sm text-white items-center flex h-6 justify-center w-6`}
    >
      {number}
    </div>
  )
}

export default NumberCircle
