export default function ItemContent({ label, icon }) {
  return (
    <div className="hstack">
      <div style={{ marginLeft: '0.5rem' }}>{icon}</div>
      <div>{label}</div>
    </div>
  )
}
