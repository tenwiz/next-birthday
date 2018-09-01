var express = require('express');
var router = express.Router();
var moment = require('moment')
/* GET users listing. */
router.post('/birthday', function (req, res, next) {
  console.log(req.body.birth_date.split('-'))
  const newBday = req.body.birth_date.split('-');
  newBday[0] = moment().format('YYYY') *1 + 1;
  var birth_date = moment(newBday, 'YYYYMMDD');
  var today = moment(new Date());
  var years = birth_date.diff(today, 'year');
  today.add(years, 'years');
  var months = birth_date.diff(today, 'months');
  today.add(months, 'months');

  var days = birth_date.diff(today, 'days');
  res.json({
    data: `Hello ${req.body.name}, your birthday is in ${months} months and ${days} days.`
  });
});

module.exports = router;