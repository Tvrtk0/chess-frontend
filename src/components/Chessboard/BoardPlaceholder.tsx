export default function BoardPlaceholder({ size = '500px' }: { size?: string | number }) {
  return (
    <div
      className="mb-[28px] block animate-pulse bg-stone-800 md:rounded-md"
      style={{ minHeight: size, width: size }}
    ></div>
  )
}
