import ReactDOM from 'react-dom/client'
import App from './App'
import './main.scss'
import moment from 'moment'
import 'moment/dist/locale/he.js'
moment.locale('he')

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
