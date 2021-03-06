const express = require('express');
const ical = require('ical');
const app = express();
const beachCabin = require('./dates_generator/beach-cabin-price.json');
const oceanTrail = require('./dates_generator/ocean-trail-price.json');
const seaGrass = require('./dates_generator/sea-grass-price.json');


const port = process.env.PORT || 3000;

var getDaysArray = function(start, end) {
    // Bad way to do it, but wanted to skip the first date that is added in.
    // This is so that people can reserve their last day (morning) when another guest
    // has the night booked
    count = 0;
    for(var arr=[],dt=start; dt<end; dt.setDate(dt.getDate()+1)){
      if (count == 0) {
        count += 1;
      } else {
        arr.push(new Date(dt).toISOString().substring(0,10));
        }
      }
    return arr;
};

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/beach-house', (req, res) => {

  const url = 'http://admin.vrbo.com/icalendar/ae077e5319bf4ce68271d4476a562cba.ics';
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

app.get('/sea-grass', (req, res) => {

  const url = 'http://admin.vrbo.com/icalendar/200274e35ffe48008c094213e27567a1.ics';
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

app.get('/ocean-trail', (req, res) => {

  const url = 'http://admin.vrbo.com/icalendar/4b77a55036ee48d7bdf142f99fe5ed0d.ics';
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

app.get('/beach-house-price', (req, res) => {

  res.send(beachCabin);
});

app.get('/sea-grass-price', (req, res) => {

  res.send(seaGrass);
});

app.get('/ocean-trail-price', (req, res) => {

  res.send(oceanTrail);
});
