import ResultItem, { ApprovedItemProps } from './ResultItem'
import style from './Results.module.css'

interface ResultsSectionProps {
  results: ApprovedItemProps[]
  total: number
  title: string
}

const ResultsSection = (props: ResultsSectionProps) => {
  const { results, total, title } = props

  return (
    <div className={style.resultsSection}>
      <div className={style.sectionHeader}>
        <div className={style.sectionTitleWrapper}>
          <h2 className={style.sectionTitle}>{` ₪${total.toLocaleString(
            'he-IL'
          )}`}</h2>

          <div className={style.subTitle}>{title}</div>
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
