var fs = require('fs');

var startDate = new Date("2018-1-01"); //YYYY-MM-DD
var endDate = new Date("2020-1-15"); //YYYY-MM-DD

const dates = new Array();

var getDateArray = function(start, end) {

  var
    arr = new Array(),
    dt = new Date(start);

  while (dt <= end) {
    date = new Date(dt).toISOString().substring(0,10);
    dt.setDate(dt.getDate() + 1);

    dates.push({
        date: date,
        price: 500,
    });
  }
}

getDateArray(startDate, endDate);


// fs.writeFile('beach-house-dates.json', json, 'utf8', callback);

fs.writeFile('beach-house-dates.json', JSON.stringify(dates, null, 4), function(err, data){
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});

// console.log(dates);
