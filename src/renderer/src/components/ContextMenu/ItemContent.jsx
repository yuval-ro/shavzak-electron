export default function ItemContent({ label, icon }) {
  return (
    <span>
      <span style={{ marginLeft: '0.6rem' }}>{label}</span>
      {icon}
    </span>
  )
}
