import * as yup from 'yup'

import labels from '#src/labels.json'

const HEBREW_REGEX = /^[\u0590-\u05FF-]*$/
const SERVICE_NUMBER_REGEX = /^\d{7,8}$/
const PLATE_NUMBER_REGEX = /^(?=[\u05E6\u05DE]?)\u05E6?\u05DE?\d{5,8}$/
const NICKNAME_REGEX = /^[\u0590-\u05FF0-9\s]+$/

export const getRubrics = {
  person: (initValues, takenIds) => 
    [{
      name: "affiliation",
      required: true,
      type: 'singleSelect',
      validation: yup.string().trim().required('יש לבחור שיוך כנדרש.'),
      initValue: initValues['affiliation'] ?? null,
      options: () =>
        Object.entries(labels.person.affiliation)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    },
    {
      name: "serviceNumber",
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .required('יש למלא מספר אישי כנדרש.')
        .matches(SERVICE_NUMBER_REGEX, 'מספר אישי צריך להיות רצף ספרות באורך 7 או 8.')
        .notOneOf(takenIds, 'מספר זה כבר קיים במערכת.'), // TODO Add a specific message when notOneOf condition is not met
      initValue: initValues['serviceNumber'] ?? null
    },
    {
      name: "firstName",
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .required('יש למלא שם פרטי כנדרש.')
        .matches(HEBREW_REGEX, 'שם משפחה צריך להיות רצף אותיות בעברית בלבד, ללא רווחים.'),
      initValue: initValues['firstName'] ?? null
    },
    {
      name: "lastName",
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .required('יש למלא שם משפחה כנדרש.')
        .matches(HEBREW_REGEX, 'שם משפחה צריך להיות רצף אותיות בעברית בלבד, ללא רווחים.'),
      initValue: initValues['lastName'] ?? null
    },
    {
      name: "sex",
      required: true,
      type: 'singleSelect',
      validation: yup.string().trim().required('יש לבחור מין כנדרש.'),
      initValue: initValues['sex'] ?? null,
      options: () =>
        Object.entries(labels.person.sex)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    },
    {
      name: "serviceType",
      required: true,
      type: 'singleSelect',
      validation: yup.string().trim().required('יש לבחור את סוג השירות כנדרש.'),
      initValue: initValues['serviceType'] ?? null,
      options: () =>
        Object.entries(labels.person.serviceType)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    },
    {
      name: "rank",
      required: true,
      type: 'singleSelect',
      validation: yup.string().trim().required('יש לבחור את הדרגה כנדרש.'),
      initValue: initValues['rank'] ?? null,
      options: ({ serviceType }) =>
        Object.entries(labels.person.rank)
          .filter(([key, val]) => !key.startsWith('_'))
          .filter(([key, val]) => {
            switch (serviceType) {
              case 'enlisted':
                return key.startsWith('e') && key >= 'e1' && key <= 'e3'
              case 'nco':
                return key.startsWith('e') && key >= 'e3'
              case 'officer':
                return key.startsWith('o')
            }
          })
          .map(([key, val]) => ({ value: key, label: val })),
      disabled: ({ serviceType }) => !serviceType
    },
    {
      name: "activeRole",
      required: true,
      type: 'singleSelect',
      validation: yup.string().trim().required('יש לבחור את התפקיד כנדרש.'),
      initValue: initValues['activeRole'] ?? null,
      options: ({ rank }) =>
        Object.entries(labels.person.activeRole)
          .filter(([key, val]) => !key.startsWith('_'))
          .filter(([key, val]) => !rank || eligible.activeRole[rank].includes(key))
          .map(([key, val]) => ({ value: key, label: val })),
      disabled: ({ serviceType, rank }) => !(serviceType && rank)
    },
    {
      name: "professions",
      required: false,
      type: 'multiSelect',
      // validation: yup.array().of(yup.string()),
      initValue: initValues['professions'] ?? null,
      options: ({ rank }) =>
        Object.entries(labels.person.professions)
          .filter(([key, val]) => !key.startsWith('_'))
          .filter(([key, val]) => !rank || eligible.professions[rank].includes(key))
          .map(([key, val]) => ({ value: key, label: val })),
      disabled: ({ serviceType, rank }) => !(serviceType && rank)
    },
    {
      name: "licenses",
      required: false,
      type: 'multiSelect',
      // validation: yup
      //   .array()
      //   .of(yup.string())
      //   .when('professions', {
      //     is: (professions) => professions &&professions.includes('driver'),
      //     then: yup.array().of(yup.string()).required(),
      //     otherwise: yup.array().of(yup.string())
      //   }),
      initValue: initValues['licenses'] ?? null,
      options: () =>
        Object.entries(labels.person.licenses)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val })),
      hidden: ({ professions }) => !professions?.includes('driver')
    }
  ],
  vehicle: (initValues, takenIds) => 
    [{
      name: "plate",
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .required('יש למלא לוחית זיהוי כנדרש.')
        .matches(
          PLATE_NUMBER_REGEX,
          'לוחית זיהוי צריכה להיות רצף ספרות באורך 5-8, עם אפשרות לתחילית "מ" או "צ".'
        )
        .notOneOf(takenIds, 'לוחית זיהוי שהוקלדה כבר קיימת במערכת!'),
      initValue: initValues?.plate ?? null
    },
    {
      name: "type",
      required: true,
      type: 'singleSelect',
      validation: yup.string().trim().required('יש לבחור סוג רכב כנדרש.'),
      initValue: initValues?.type ?? null,
      options: () =>
        Object.entries(labels?.vehicle?.type)
          .filter(([key, val]) => !key.startsWith('_'))
          .map(([key, val]) => ({ value: key, label: val }))
    },
    {
      name: "nickname",
      required: true,
      type: 'free',
      validation: yup
        .string()
        .trim()
        .matches(NICKNAME_REGEX, 'כינוי צריך להיות רצף אותיות בעברית ו/או ספרות.'),
      initValue: initValues?.nickname ?? null
    }]
  
}
