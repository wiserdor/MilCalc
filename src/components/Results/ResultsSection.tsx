import ResultItem, { ApprovedItemProps } from './ResultItem'
import style from './styles/Results.module.css'

interface ResultsSectionProps {
  results: ApprovedItemProps[]
  total: number
  title: string
}

const ResultsSection = (props: ResultsSectionProps) => {
  const { results } = props

  return (
    <div className={style.resultsSection}>
      <div className={style.sectionHeader}>
        <h3 className={style.sectionTitle}>שוברים וסיוע</h3>
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
