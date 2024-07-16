import * as yup from 'yup'

const hebrew = /^[\u0590-\u05FF-]*$/
const service_number = /^\d{7}$/

export const person = {
  schema: yup.object().shape({
    affiliation: yup.string().notOneOf(['0']).required(),
    first_name: yup.string().required().matches(hebrew),
    last_name: yup.string().required().matches(hebrew),
    service_number: yup.string().required().matches(service_number),
    service_type: yup.string().notOneOf(['0']).required(),
    rank: yup.string().notOneOf(['0']).required(),
    role: yup.string().notOneOf(['0']).required()
  }),
  values: {
    affiliation: '0',
    first_name: '',
    last_name: '',
    service_number: '',
    service_type: '0',
    rank: '0',
    profession: [],
    role: '0'
  }
}

export const vehicle = {
  schema: yup.object().shape({}),
  values: {}
}
