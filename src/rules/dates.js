import moment from 'moment';
import jQuery from 'jquery';

// Valid date formats
window.Parsley.options.dateFormats = ['DD/MM/YY', 'DD/MM/YYYY', 'MM/DD/YY', 'MM/DD/YYYY', 'YY/MM/DD', 'YYYY/MM/DD'];

// Check if the value is a date
window.Parsley
    .addValidator('date', {
        requirementType: 'boolean',
        validateString: function (value, state, parsleyInstance) {
            return moment(value, formatDatePhpToJs.getDateFormatsOption(parsleyInstance), true).isValid();
        },
        messages: {
            en: 'You should provide a valid date.'
        }
    });


// Check if the value is a date in a specific format
window.Parsley
    .addValidator('dateFormat', {
        requirementType: 'string',
        validateString: function (value, parameter) {
            return moment(value, formatDatePhpToJs.convert(parameter), true).isValid();
        },
        messages: {
            en: 'The date you entered is not in the right format (%s).'
        }
    });


// Check if the value is a date before the specified date
window.Parsley
    .addValidator('before', {
        requirementType: 'string',
        validateString: function (value, parameter, parsleyInstance) {
            var dateFormats = formatDatePhpToJs.getDateFormatsOption(parsleyInstance);

            var beforeDate = moment(parameter, dateFormats, true);

            // If it's not a valid date, error
            if (beforeDate === false)
                return false;

            return moment(value, dateFormats) < beforeDate;
        },
        messages: {
            en: 'The date you entered should be before %s.'
        }
    });

// Check if the value is a date before the specified date (from another input)
window.Parsley
    .addValidator('beforeInput', {
        requirementType: 'string',
        validateString: function (value, parameter, parsleyInstance) {
            var dateFormats = formatDatePhpToJs.getDateFormatsOption(parsleyInstance);
            var beforeInput = jQuery(parameter);

            // If we can't find the input, return true
            if (beforeInput.length == 0)
                return true;

            var beforeVal = beforeInput.val();

            // If the val is empty, return true
            if (beforeVal == '')
                return true;

            var beforeDate = moment(beforeVal, dateFormats, true);

            // If the before date isn't valid, error out
            if (beforeDate.isValid() === false) {
                console.warn(parameter + ' input does not contain a valid date');
                return false;
            }

            var thisDate = moment(value, dateFormats, true);

            // If the value's date isn't valid, error out
            if (thisDate.isValid() === false) {
                console.warn('the input being checked does not contain a valid date');
                return false;
            }

            return thisDate < beforeDate;
        },
        messages: {
            en: 'The date you entered should be before %s.'
        }
    });


// Check if the value is a date before the specified date
window.Parsley
    .addValidator('after', {
        requirementType: 'string',
        validateString: function (value, parameter, parsleyInstance) {
            var dateFormats = formatDatePhpToJs.getDateFormatsOption(parsleyInstance);
            var afterDate = moment(parameter, dateFormats, true);

            // If it's not a valid date, error
            if (afterDate === false)
                return false;

            return moment(value, dateFormats) > afterDate;
        },
        messages: {
            en: 'The date you entered should be after %s.'
        }
    });

// Check if the value is a date before the specified date (from another input)
window.Parsley
    .addValidator('afterInput', {
        requirementType: 'string',
        validateString: function (value, parameter, parsleyInstance) {
            var dateFormats = formatDatePhpToJs.getDateFormatsOption(parsleyInstance);
            var afterInput = jQuery(parameter);

            console.log(this, dateFormats);

            // If we can't find the input, return true
            if (afterInput.length == 0)
                return true;

            var afterVal = afterInput.val();

            // If the val is empty, return true
            if (afterVal == '')
                return true;

            var afterDate = moment(afterVal, dateFormats, true);

            // If the after date isn't valid, error out
            if (afterDate.isValid() === false) {
                console.warn(parameter + ' input does not contain a valid date');
                return false;
            }

            var thisDate = moment(value, dateFormats, true);

            // If the value's date isn't valid, error out
            if (thisDate.isValid() === false) {
                console.warn('the input being checked does not contain a valid date');
                return false;
            }

            return thisDate > afterDate;
        },
        messages: {
            en: 'The date you entered should be after %s.'
        }
    });

// convert PHP date format to moment JS date format
var formatDatePhpToJs = window.formatDatePhpToJs = {
    mapChars: {
        d: 'DD',
        D: 'ddd',
        j: 'D',
        l: 'dddd',
        N: 'E',
        S: function () {
            return '[' + this.format('Do', true).replace(/\d*/g, '') + ']';
        },
        w: 'd',
        z: function () {
            return this.format('DDD', true) - 1;
        },
        W: 'W',
        F: 'MMMM',
        m: 'MM',
        M: 'MMM',
        n: 'M',
        t: function () {
            return this.daysInMonth();
        },
        L: function () {
            return this.isLeapYear() ? 1 : 0;
        },
        o: 'GGGG',
        Y: 'YYYY',
        y: 'YY',
        a: 'a',
        A: 'A',
        B: function () {
            var thisUTC = this.clone().utc(),
            // Shamelessly stolen from http://javascript.about.com/library/blswatch.htm
                swatch = ((thisUTC.hours() + 1) % 24) + (thisUTC.minutes() / 60) + (thisUTC.seconds() / 3600);
            return Math.floor(swatch * 1000 / 24);
        },
        g: 'h',
        G: 'H',
        h: 'hh',
        H: 'HH',
        i: 'mm',
        s: 'ss',
        u: '[u]', // not sure if moment has this
        e: '[e]', // moment does not have this
        I: function () {
            return this.isDST() ? 1 : 0;
        },
        O: 'ZZ',
        P: 'Z',
        T: '[T]', // deprecated in moment
        Z: function () {
            return parseInt(this.format('ZZ', true), 10) * 36;
        },
        c: 'YYYY-MM-DD[T]HH:mm:ssZ',
        r: 'ddd, DD MMM YYYY HH:mm:ss ZZ',
        U: 'X'
    },
    formatEx: /[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
    convert: function (PHPDateFormat) {
        return PHPDateFormat.replace(this.formatEx, function (phpStr) {
            console.log(formatDatePhpToJs.mapChars[phpStr]);
            return typeof formatDatePhpToJs.mapChars[phpStr] === 'function' ? formatDatePhpToJs.mapChars[phpStr].call(moment()) : formatDatePhpToJs.mapChars[phpStr];
        })
    },
    getDateFormatsOption: function (parsleyInstance) {
        if (typeof parsleyInstance.options.dateFormats == 'undefined') {
            return this.getDateFormatsOption(parsleyInstance.parent);
        }

        return parsleyInstance.options.dateFormats;
    }
}