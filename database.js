const { Pool, Client } = require('pg');
const fs = require('fs');
var connectionString = "postgressql://vfoiltyjszbpav:22077284a687886bc08c192941b095d6612cdf50d1da292888a26c6aa7347f03@ec2-54-228-243-29.eu-west-1.compute.amazonaws.com:5432/dduigib0uc8ebt?ssl=true";

const pool = new Pool({
    connectionString: connectionString,
});




module.exports = {
    sum: function (a, b) {
        return a + b
    },
    multiply: function (a, b) {
        return a * b
    },
    deneme: function () {
        pool.query('SELECT st_astext(loc) from GetAllData()', (err, res) => {
            console.log(err, res)
            let data = JSON.stringify(res.rows);
            fs.writeFileSync('mydata.json', data);
            //return res
            pool.end()
        });
    },
    getAllLocations: getAllLocations
};

pool.query('SELECT st_astext(loc) from GetAllData()', (err, res) => {
    //console.log(err, res)
    let data = JSON.stringify(res);
    fs.writeFileSync('mydata.json', data);
    //return res
    pool.end()
});

//pool.query('SELECT st_astext(loc) from GetAllData()', (err, res) => {
//    console.log(err, res.rows[0].st_astext)
//    pool.end()
//});


var promise = require('bluebird');
var options = {
    promiseLib: promise
};

var CONFIG = require('./appConfig');
var pgp = require('pg-promise')(options);
var DATABASE_PGB = pgp(CONFIG.database.postgres);

/**
 * 
 * @param Bu metodtaki SQL "POINT(32.7308973040307 39.8644888705585)" şeklinde dönüyor değerler...
 */
function getAllLocations(cb) {
    DATABASE_PGB.any('SELECT ST_X(loc) as longitude, ST_Y(loc) as latitude from GetAllData()')
        .then(function (data) {
            cb(null, data);
        })
        .catch(function (err) {
            cb(err)
        });
}

//'SELECT st_astext(loc) from GetAllData()'
