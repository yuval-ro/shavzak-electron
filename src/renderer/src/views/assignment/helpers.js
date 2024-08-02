import RubricsBuilder from '#src/components/form-modal/RubricsBuilder.js'

export function buildCampTaskFormRubrics({ initValues = {}, takenIds = [] }) {
  const builder = new RubricsBuilder(initValues, takenIds)
  builder.addFree({
    name: 'name',
    required: 'יש למלא שם משימה כנדרש.',
    matches: [/^[\u0590-\u05FF0-9\s]+$/, 'שם משימה צריך להיות רצף אותיות בעברית ו/או ספרות.']
  })
  builder.addMultiSelect({
    name: 'manning',
    required: 'יש לבחור איוש כנדרש'
  })
  builder.add({
    name: 'profession'
  })
  return builder.build()
}
