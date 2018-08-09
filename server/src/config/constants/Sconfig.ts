/**
 * Server config constants
 */

class Sconfig {

    static IP: string = '192.168.1.3'; // Dev

    static DB_CONNECTION_STRING = 'mongodb://192.168.1.3:27017/hkRainDB'; // Dev

    static PORT_NUM: number = 3100;

    static TIME_ZONE: string = 'Asia/Hong_Kong';

    static SECRET: string = 'Great knowledge comes from the humblest of origins.';

}

Object.seal(Sconfig);
export = Sconfig;

