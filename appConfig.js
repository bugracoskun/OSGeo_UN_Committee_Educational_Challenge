
var developmentDatabase = {
    postgres: {
        host: 'localhost',
        port: 5432,
        database: 'database_name',
        user: 'postgres',
        password: 'postgres'
    }
}

var connectionString = "postgressql://eklebkmnmvnsjj:9715c486d74c3560e40422b91baba81b9bdb2dd09de884f204922a4deb840996@ec2-54-217-221-21.eu-west-1.compute.amazonaws.com:5432/d41fi7qtbl8bap?ssl=true";

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