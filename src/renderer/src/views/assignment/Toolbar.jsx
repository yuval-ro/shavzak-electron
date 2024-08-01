import { ButtonGroup, ToggleButton } from 'react-bootstrap'

export default function Toolbar({ activeTab, onTabChange }) {
  return (
    <div style={{ display: 'flex' }}>
      <ButtonGroup style={{ marginLeft: '8px' }}>
        <ToggleButton
          variant={activeTab === 'campSecurity' ? 'primary' : 'outline-primary'}
          onClick={() => onTabChange('campSecurity')}
          style={{ minWidth: '10rem' }}
        >
          אבטחת מחנה
        </ToggleButton>
        <ToggleButton
          variant={activeTab === 'fieldMissions' ? 'primary' : 'outline-primary'}
          onClick={() => onTabChange('fieldMissions')}
          style={{ minWidth: '10rem' }}
        >
          משימות
        </ToggleButton>
      </ButtonGroup>
    </div>
  )
}
