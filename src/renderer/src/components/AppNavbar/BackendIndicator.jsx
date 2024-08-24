import { Spinner, Fade } from 'react-bootstrap'
import { CheckCircleFill as Check } from 'react-bootstrap-icons'

export default function BackendIndicator({ toggle }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Spinner
        animation="grow"
        style={{
          height: '1.5rem',
          width: '1.5rem',
          zIndex: 1, // Ensure spinner is above the checkmark
          display: toggle ? 'block' : 'none',
          position: 'absolute', // Positioning to avoid overlap
          top: 0,
          left: 0
        }}
      />
      <Fade in={!toggle} timeout={1000}>
        <div style={{ zIndex: 0 }}>
          <Check size="1.5rem" />
        </div>
      </Fade>
    </div>
  )
}
