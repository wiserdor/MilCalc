import Voucher from '../../svg/Voucher'
import ResultItem, { NonApprovedItemProps } from './ResultItem'
import style from './styles/Results.module.css'

interface ResultsSectionProps {
  results: NonApprovedItemProps[]
  total: number
  title: string
}

const ResultsSection = (props: ResultsSectionProps) => {
  const { results, total } = props

  return (
    <div className={`${style.resultsSection} flex flex-col`}>
      <div className='text-center'>
        <Voucher strokeColor="#0066FF" />
        <h3 className={style.sectionTitle}>
          בשווי {`₪${total.toLocaleString('he-IL')}`}
        </h3>
        <div className={`${style.subTitle} font-bold`}>שוברים וסיוע</div>
      </div>
      <div className={`${style.approvedGrid} grid gap-4`}>
        {results.map(
          (item, i) =>
            (item.totalCompensation > 0 || item.totalCompensationStr) && (
              <ResultItem key={i} {...item} />
            )
        )}
      </div>
    </div>
  );
}

export default ResultsSection
