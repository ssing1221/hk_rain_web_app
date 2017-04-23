/**
 * Server config constants
 */

class Sconfig {

    static IP: string = process.env.NODE_ENV === 'production' ? process.env.IP : '192.168.1.3'; //127.0.0.1

    static DB_CONNECTION_STRING: string = process.env.NODE_ENV === 'production'
     ? process.env.dbURI : "mongodb://192.168.1.3:27017/hkRainDB";

    static PORT_NUM: number = process.env.NODE_ENV === 'production' ? process.env.PORT : 3100;

    static ENV: string = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'developement';

    static TIME_ZONE: string = 'Asia/Hong_Kong';

    static SECRET: string = 'Great knowledge comes from the humblest of origins.';

}

Object.seal(Sconfig);
export = Sconfig;