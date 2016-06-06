// Check if the value is within a comma-separated list (val1,val2,..)
window.Parsley
    .addValidator('in', {
        requirementType: 'string',
        validateString: function (value, parameter) {
            var possibles = parameter.split(',');

            return possibles.indexOf(value) > -1;
        },
        validateNumber: function (value, parameter) {
            var possibles = parameter.split(',');

            return possibles.indexOf(value.toString()) > -1;
        },
        messages: {
            en: 'The value should be one of the following: "%s".'
        }
    });

// Check if the value is not in a comma-separated list (val1,val2,..)
window.Parsley
    .addValidator('notIn', {
        requirementType: 'string',
        validateString: function (value, parameter) {
            var possibles = parameter.split(',');

            return possibles.indexOf(value) == -1;
        },
        validateNumber: function (value, parameter) {
            var possibles = parameter.split(',');

            return possibles.indexOf(value.toString()) == -1;
        },
        messages: {
            en: 'The value should not be one of the following: "%s".'
        }
    });

// Check if the value is different from the specified input's value
window.Parsley
    .addValidator('different', {
        requirementType: 'string',
        validateString: function (value, parameter) {
            return jQuery(parameter).val() != value;
        },
        validateNumber: function (value, parameter) {
            return jQuery(parameter).val() != value;
        },
        messages: {
            en: 'The value should not be the same as "%s".'
        }
    });

// Check if the value is greater than min and smaller than max
window.Parsley
    .addValidator('between', {
        requirementType: ['integer', 'integer'],
        validateNumber: function (value, min, max) {
            return value > min && value < max;
        },
        messages: {
            en: 'The value should be between "%s" and "%s".'
        }
    });

// Check if the value is equal to the provided value
window.Parsley
    .addValidator('sizeNumber', {
        requirementType: 'integer',
        validateNumber: function (value, parameter) {
            return value == parameter;
        },
        messages: {
            en: 'The value should be "%s".'
        }
    });

// Check if the value's length is equal to the provided value
window.Parsley
    .addValidator('sizeString', {
        requirementType: 'integer',
        validateString: function (value, parameter) {
            return value.length == parameter;
        },
        messages: {
            en: 'The value should be "%s" characters long.'
        }
    });


// Check if the value is a date
window.Parsley
    .addValidator('date', {
        requirementType: 'boolean',
        validateString: function (value) {
            return moment(value, ['DD-MM-YY', 'DD-MM-YYYY', 'MM-DD-YY', 'MM-DD-YYYY', 'YY-MM-DD', 'YYYY-MM-DD']).isValid();
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
            return moment(value, formatDatePhpToJs.convert(parameter)).isValid();
        },
        messages: {
            en: 'The date you entered is not in the right format (%s).'
        }
    });


// Check if the value is a date before the specified date
window.Parsley
    .addValidator('before', {
        requirementType: 'string',
        validateString: function (value, parameter) {
            var beforeDate = moment(parameter);

            return moment(value) < beforeDate;
        },
        messages: {
            en: 'The date you entered should be before %s.'
        }
    });

// Check if the value is a date before the specified date (from another input)
window.Parsley
    .addValidator('before-input', {
        requirementType: 'string',
        validateString: function (value, parameter) {
            var beforeVal = jQuery(parameter).val();
            var beforeDate = moment(beforeVal);

            return moment(value) < beforeDate;
        },
        messages: {
            en: 'The date you entered should be before %s.'
        }
    });


// Check if the value is a date before the specified date
window.Parsley
    .addValidator('after', {
        requirementType: 'string',
        validateString: function (value, parameter) {
            var afterDate = moment(parameter);

            return moment(value) > afterDate;
        },
        messages: {
            en: 'The date you entered should be after %s.'
        }
    });

// Check if the value is a date before the specified date (from another input)
window.Parsley
    .addValidator('after-input', {
        requirementType: 'string',
        validateString: function (value, parameter) {
            var afterVal = jQuery(parameter).val();
            var afterDate = moment(afterVal);

            return moment(value) > afterDate;
        },
        messages: {
            en: 'The date you entered should be after %s.'
        }
    });

// Check if each value is distinct
window.Parsley
    .addValidator('distinct', {
        requirementType: 'boolean',
        validateMultiple: function (values) {
            var storedValues = [];
            var isDistinct = true;

            values.forEach(function (value) {
                if (storedValues.indexOf(value) > -1) {
                    isDistinct = false;
                    return false;
                }

                storedValues.push(value);
            });

            return isDistinct;
        },
        messages: {
            en: 'Not all values are distinct.'
        }
    });


// The value is required only if another input's value matched one of the defined ones.
// the parameter should be formatted as data-parsley-required-if="["#elementValueToCheck", "value1,value2,.."]"
window.Parsley
    .addValidator('requiredIf', {
        requirementType: ['string', 'string'],
        validateString: function (value, field, values) {
            // Only required to check if the value is empty
            if (value.length == 0) {
                var fieldValue = jQuery(field);
                var valuesToCheck = values.split(',');

                return valuesToCheck.indexOf(fieldValue) == -1;
            }

            return true;
        },
        messages: {
            en: 'This field is required.'
        }
    });


// The value is required if other field does not contain any of the specified values
// the parameter should be formatted as data-parsley-required-unless="["#elementValueToCheck", "value1,value2,.."]"
window.Parsley
    .addValidator('requiredUnless', {
        requirementType: ['string', 'string'],
        validateString: function (value, field, values) {
            // Only validate if the char count is 0
            if (value.length == 0) {
                var fieldValue = jQuery(field);
                var valuesToCheck = values.split(',');

                return valuesToCheck.indexOf(fieldValue) > -1;
            }

            return true;
        },
        messages: {
            en: 'This field is required.'
        }
    });


// The value is required if all any of the inputs are present in the dom
// the parameter should be formatted as data-parsley-required-with="#elementValueToCheck,#elementValueToCheck,.."
window.Parsley
    .addValidator('requiredWith', {
        requirementType: 'string',
        validateString: function (value, fields) {
            // Only validate if the char count is 0
            if (value.length == 0) {
                var allFields = fields.split(',');
                var AnyPresent = false;

                allFields.forEach(function (id) {
                    if (jQuery(id).length) {
                        AnyPresent = true;
                    }
                });

                return !AnyPresent;
            }

            return true;
        },
        messages: {
            en: 'This field is required.'
        }
    });


// The value is required if all other inputs are present in the dom
// the parameter should be formatted as data-parsley-required-with-all="#elementValueToCheck,#elementValueToCheck,.."
window.Parsley
    .addValidator('requiredWithAll', {
        requirementType: 'string',
        validateString: function (value, fields) {
            // Only validate if the char count is 0
            if (value.length == 0) {
                var allFields = fields.split(',');
                var AllPresent = true;

                allFields.forEach(function (id) {
                    if (jQuery(id).length == 0) {
                        AllPresent = false;
                    }
                });

                return !AllPresent;
            }

            return true;
        },
        messages: {
            en: 'This field is required.'
        }
    });


// The value is required if any of the inputs are not present in the dom
// the parameter should be formatted as data-parsley-required-with="#elementValueToCheck,#elementValueToCheck,.."
window.Parsley
    .addValidator('requiredWithout', {
        requirementType: 'string',
        validateString: function (value, fields) {
            // Only validate if the char count is 0
            if (value.length == 0) {
                var allFields = fields.split(',');
                var AnyPresent = false;

                allFields.forEach(function (id) {
                    if (jQuery(id).length == 0) {
                        AnyPresent = true;
                    }
                });

                return !AnyPresent;
            }

            return true;
        },
        messages: {
            en: 'This field is required.'
        }
    });


// The value is required if all other inputs are not present in the dom
// the parameter should be formatted as data-parsley-required-with-all="#elementValueToCheck,#elementValueToCheck,.."
window.Parsley
    .addValidator('requiredWithoutAll', {
        requirementType: 'string',
        validateString: function (value, fields) {
            // Only validate if the char count is 0
            if (value.length == 0) {
                var allFields = fields.split(',');
                var AllPresent = true;

                allFields.forEach(function (id) {
                    if (jQuery(id).length == 1) {
                        AllPresent = false;
                    }
                });

                return !AllPresent;
            }

            return true;
        },
        messages: {
            en: 'This field is required.'
        }
    });


// The value should be located in one of the checkbox's checked values
window.Parsley
    .addValidator('inArray', {
        requirementType: 'string',
        validateString: function (value, otherFieldName) {
            var values = [];

            // Check if we're dealing with a text field
            if(otherFieldName.substring(0,1) == '#')
            {
                // If it's a text field we're assuming that it's a list of comma separated values
                return jQuery(otherFieldName).val().split(',').indexOf(value) > -1;
            }
            
            // Get the selected values of a checkbox by it's name
            jQuery('input:checkbox[name="'+otherFieldName+'"]:checked').each(function(){
                values.push(jQuery(this).val());
            });

            // Check if the value is in there
            return values.indexOf(value) > -1;
        },
        messages: {
            en: 'This value is incorrect.'
        }
    });


// convert PHP date format to moment JS date format
var formatDatePhpToJs = {
    mapChars: {
        d: 'DD',
        D: 'ddd',
        j: 'D',
        l: 'dddd',
        N: 'E',
        S: function () {
            return '[' + this.format('Do').replace(/\d*/g, '') + ']';
        },
        w: 'd',
        z: function () {
            return this.format('DDD') - 1;
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
            return parseInt(this.format('ZZ'), 10) * 36;
        },
        c: 'YYYY-MM-DD[T]HH:mm:ssZ',
        r: 'ddd, DD MMM YYYY HH:mm:ss ZZ',
        U: 'X'
    },
    formatEx: /[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
    convert: function (PHPDateFormat) {
        return PHPDateFormat.replace(this.formatEx, function (phpStr) {
            return typeof this.mapChars[phpStr] === 'function' ? this.mapChars[phpStr].call(moment()) : this.mapChars[phpStr];
        })
    }
}