/**
 * Constants
 */

class Constants {

    static HKO_URL_DAILY_PREFIX: string = 'http://www.hko.gov.hk/cis/dailyExtract/dailyExtract_';
    static HKO_URL_DAILY_SUFFIX: string = '.xml';

    static HTTP_RES_200_OK: number = 200;
    static HTTP_RES_400_BAD_REQ: number = 400;

    static SKIP_YEAR_1940: number = 1940;
    static SKIP_YEAR_1941: number = 1941;
    static SKIP_YEAR_1942: number = 1942;
    static SKIP_YEAR_1943: number = 1943;
    static SKIP_YEAR_1944: number = 1944;
    static SKIP_YEAR_1945: number = 1945;
    static SKIP_YEAR_1946: number = 1946;
    static GET_ALL_WEATHER_START_YEAR: number = 1885;

    static DAY_INDEX: number = 0;
    static TEMP_INDEX: number = 3;
    static HUMIDITY_INDEX: number = 6;
    static CLOUD_INDEX: number = 7;
    static RAINFALL_INDEX: number = 8;
    static SUNSHINE_INDEX: number = 9;
    
    static MONTH: string = 'month';
    static MEAN_TOTAL: string = 'Mean/Total';
    static NORMAL: string = 'Normal';
    static TRACE: string = 'Trace';
    static TRACE_CODE: number = 999;
    static NULL_CODE: string = '***';
    static ZERO: number = 0;
    static HALF: number = 0.5;
    static ONE: number = 1;
    static HUNDRED: number = 100;
    static LIGHT_THRESHOLD: number = 9.9;
	static MODERATE_THRESHOLD: number = 24.9;
	static HEAVY_THRESHOLD: number = 49.9;
	static VIOLENT_THRESHOLD: number = 99.9;
	static TORRENTIAL_THRESHOLD: number = 100;

    static CONTENT_TYPE_JSON: string = 'application/json';
    
    static METHOD_GET: string = 'GET';
    static METHOD_POST: string = 'POST';

    static STN: string = 'stn';
    static DATA: string = 'data';
    static END: string = 'end';
    static DAYDATA: string = 'dayData';

    // Rain intensity
    // drizzle 毛毛雨 <0.05mm
    // light rain 小雨 < 9.9mm
    // moderate rain 中雨 10-24.9mm
    // heavy rain 大雨 25-49.9mm (amber rainstorm黃色暴雨>30mm)
    // violent rain 暴雨 50-99.9mm (red rainstorm紅色暴雨>50mm, black rainstorm黑色暴雨>70mm)
    // torrential rain 大暴雨 > 100mm


}
Object.seal(Constants);
export = Constants;