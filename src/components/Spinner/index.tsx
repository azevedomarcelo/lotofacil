import styles from './styles.module.css';

interface SpinnerProps {
  width: number;
  height: number;
  color?: string;
}

export function Spinner({ width, height, color, ...rest }: SpinnerProps) {
  return (
    <div className={styles.spinner} style={{ width, height, borderColor: color }} {...rest} />
  )
}