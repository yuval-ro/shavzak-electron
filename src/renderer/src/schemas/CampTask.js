const CampTask = Object.freeze({
  stringify: (task) => task?.name,
  label: 'משימת מחנה',
  primaryKey: 'name',
  properties: {
    name: {
      label: 'שם משימה',
      required: true,
      matches: [/^[\u0590-\u05FF0-9\s]+$/, 'רצף אותיות בעברית ו/או ספרות']
    },
    manning: {
      label: 'איוש',
      required: false,
      anyOf: { officer: 'קצין', nco: 'נגד', enlisted: 'סדיר' }
    },
    profession: {
      label: 'הסמכה',
      required: false,
      oneOf: { campOfficer: 'מפקד אבטחת מחנה' }
    }
  }
})

export default CampTask
