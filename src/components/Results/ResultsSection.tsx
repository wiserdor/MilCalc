import ResultItem, { ApprovedItemProps } from './ResultItem'
import style from './Results.module.css'

interface ResultsSectionProps {
  results: ApprovedItemProps[]
  total: number
}

const ResultsSection = (props: ResultsSectionProps) => {
  const { results, total } = props

  return (
    <div className={style.resultsSection}>
      <div className={style.sectionHeader}>
        <div>
          סך הכל:
          <span className={style.sectionTitle}>{` ₪${total.toLocaleString(
            'he-IL'
          )}`}</span>
        </div>
        <div className={style.approvalBlock}>✓ עבר אישור</div>
      </div>
      <div className={style.approvedGrid}>
        {results.map(
          (item, i) =>
            item.totalCompensation > 0 && <ResultItem key={i} {...item} />
        )}
      </div>
    </div>
  )
}

export default ResultsSection
