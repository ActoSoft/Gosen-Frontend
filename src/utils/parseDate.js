import moment from 'moment'
import 'moment/locale/es'

const formatDate = date => {
    moment.locale('es')
    if(date && typeof date !== 'undefined' && date !== '') {
        const dateMoment = moment(date)
        return dateMoment.format('LL')
    } else {
        const dateMoment = moment('1970-01-01')
        return dateMoment.format('LL')
    }
}

export default formatDate