import styles from './Toggle.module.css'

export interface ToggleProps {
  active: boolean
  onChange: (name: string, active: boolean) => void
  label: string
  name: string
}

const Toggle = (props: ToggleProps) => {
  const { active, onChange, label, name } = props

  return (
    <div
      onClick={() => onChange(name, !active)}
      className={styles.container}
      style={{
        color: active ? '#0066FF' : '#6F6F6F',
        backgroundColor: active ? '#F2F6FD' : '#ffffff',
        borderColor: active ? '#0066FF' : '#6F6F6F',
      }}
    >
      {label}
    </div>
  )
}

export default Toggle
