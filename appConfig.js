
var developmentDatabase = {
    postgres: {
        host: 'localhost',
        port: 5432,
        database: 'database_name',
        user: 'postgres',
        password: 'postgres'
    }
}

var connectionString = "postgressql://vfoiltyjszbpav:22077284a687886bc08c192941b095d6612cdf50d1da292888a26c6aa7347f03@ec2-54-228-243-29.eu-west-1.compute.amazonaws.com:5432/dduigib0uc8ebt?ssl=true";

if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
        developmentDatabase = parseConnectionString(process.env.DATABASE_URL);
    } else {
        console.log("process.env.DATABASE_URL empty, connectionString variable used");
        developmentDatabase = parseConnectionString(connectionString);
    }
}else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
}

function parseConnectionString(connectionString) {
    if (connectionString) {
        var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
        var match = myRegexp.exec(connectionString);

        if (match.length == 6) {
            developmentDatabase.postgres.user = match[1];
            developmentDatabase.postgres.password = match[2];
            developmentDatabase.postgres.host = match[3];
            developmentDatabase.postgres.port = Number(match[4]);
            developmentDatabase.postgres.database = match[5];
            developmentDatabase.postgres.ssl = true;

            return developmentDatabase;
        }
    }

    console.log("connectionString parse edilemedi");
    return null;
}

module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
        postgres: developmentDatabase.postgres
    }
}