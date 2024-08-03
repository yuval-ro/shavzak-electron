import RubricsBuilder from '#src/components/form-modal/RubricsBuilder.js'
import labels from '#src/labels.json'

export function buildCampTaskFormRubrics({ takenIds = [], initValues = {} }) {
  const builder = new RubricsBuilder({ takenIds, initValues, labels: labels.campTask })
  builder.addFree({
    name: 'name',
    label: 'שם משימה',
    required: 'יש למלא שם משימה כנדרש.',
    matches: [/^[\u0590-\u05FF0-9\s]+$/, 'שם משימה צריך להיות רצף אותיות בעברית ו/או ספרות.']
  })
  builder.addMultiSelect({
    name: 'manning',
    label: 'איוש',
    required: 'יש לבחור איוש כנדרש'
  })
  builder.addMultiSelect({
    name: 'profession',
    label: 'הסמכות'
  })
  return builder.build()
}
