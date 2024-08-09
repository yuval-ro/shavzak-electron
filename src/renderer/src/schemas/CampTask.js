import PropBuilder from './PropBuilder'
import { REGEX } from './CONSTS'

const prop = new PropBuilder()

const CampTask = {
  stringify: (task) => task?.name,
  label: 'משימת מחנה',
  props: {
    name: prop
      .pk()
      .label('שם משימה')
      .matches(...REGEX.task.name)
      .build(),
    requirements: prop
      .optional()
      .label('דרישות')
      .options({ officer: 'קצין', nco: 'נגד', enlisted: 'סדיר', campOfficer: 'מפקד אבטחת מחנה' })
      .multi()
      .build(),
    start: prop.label('התייצבות').time().build(),
    end: prop.label('סיום').time().build()
  }
}

export default Object.freeze(CampTask)
