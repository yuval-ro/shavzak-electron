import { default as Form } from './FormModal'
import Confirm from './ConfirmModal'
import Provider from './Provider'
import * as hooks from './hooks'

export default {
  Provider,
  Form,
  Confirm,
  ...hooks
}
