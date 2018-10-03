const express = require('express');
const ical = require('ical');

const app = express();
const port = 3000

const url = 'http://admin.vrbo.com/icalendar/ae077e5319bf4ce68271d4476a562cba.ics';

var getDaysArray = function(start, end) {
    for(var arr=[],dt=start; dt<end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt).toISOString().substring(0,10));
      }
    return arr;
};

app.get('/', (req, res) => {

  const dates = [];

  ical.fromURL(url, {}, function(err, data) {
    for (var k in data) {
      //console.log(data[k].start);
      const start = data[k].start.toISOString().substring(0,10);
      const end = data[k].end.toISOString().substring(0,10);
      const bookedDates = getDaysArray(new Date(start),new Date(end));

      dates.push({
          title: 'reserved',
          start: start,
          end: end,
          bookedDates: bookedDates
      });
    };
    res.send(dates);
  });
});

app.listen(port, () => {
  console.log('Server is up on port: ' + port);
});
