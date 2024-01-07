import style from './NumberCircle.module.css'

interface NumberCircleProps {
  number: number
}

const NumberCircle = (props: NumberCircleProps) => {
  const { number } = props

  return <div className={style.numberCircle}>{number}</div>
}

export default NumberCircle
