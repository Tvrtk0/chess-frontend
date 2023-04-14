type BarProps = { color: 'green' | 'red'; pct: number; right?: boolean }

type ProgressBarProps = { solvedPct: number }

export const Bar = ({ color, pct, right }: BarProps) => {
  const rounded = pct === 100 || pct === 0 ? 'rounded' : right ? 'rounded-r' : 'rounded-l'
  const colorVariants = {
    green: 'bg-emerald-400',
    red: 'bg-rose-400',
  }
  return <div className={`${colorVariants[color]} ${rounded} h-2`} style={{ width: `${pct}%` }}></div>
}

export default function ProgressBar({ solvedPct }: ProgressBarProps) {
  return (
    <div className="flex">
      <Bar color="green" pct={solvedPct} />
      <Bar color="red" pct={100 - solvedPct} right />
    </div>
  )
}
