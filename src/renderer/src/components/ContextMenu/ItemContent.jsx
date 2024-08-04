export default function ItemContent({ label, icon }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <span style={{ marginLeft: '0.6rem' }}>{label}</span>
      {icon}
    </div>
  )
}
