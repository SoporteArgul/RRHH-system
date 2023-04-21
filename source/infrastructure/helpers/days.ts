import moment from "moment";


const year = moment().format('YYYY')
const month = moment().format('M')
const daysInMonth=moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
const dates = [];

for (let day = 1; day <= daysInMonth; day++) {
  dates.push(moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').toDate());
}