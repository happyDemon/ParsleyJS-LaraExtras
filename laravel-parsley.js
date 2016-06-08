// Check if the value is within a comma-separated list (val1,val2,..)
window.Parsley
    .addValidator('in', {
        requirementType: 'string',
        validateString: function (value, parameter) {
            var possibles = parameter.split(',');

            return possibles.indexOf(value) > -1;
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
        messages: {
            en: 'The value should not be one of the following: "%s".'
        }
    });

// Check if the value is different from the specified input's value
window.Parsley
    .addValidator('different', {
        requirementType: 'string',
        validateString: function (value, parameter, fieldInstance) {
            if (jQuery(parameter).length == 0)
                return true;

            larapars.bindChangeToOtherElement('different', parameter, fieldInstance, true);

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

// Valid date formats
window.Parsley.options.dateFormats = ['DD/MM/YY', 'DD/MM/YYYY', 'MM/DD/YY', 'MM/DD/YYYY', 'YY/MM/DD', 'YYYY/MM/DD'];

// Check if the value is a date
window.Parsley
    .addValidator('date', {
        requirementType: 'boolean',
        validateString: function (value, state, parsleyInstance) {
            return moment(value, larapars.getDateFormatsOption(parsleyInstance), true).isValid();
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
            var dateFormats = larapars.getDateFormatsOption(parsleyInstance);

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
            var dateFormats = larapars.getDateFormatsOption(parsleyInstance);
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
            var dateFormats = larapars.getDateFormatsOption(parsleyInstance);
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
            var dateFormats = larapars.getDateFormatsOption(parsleyInstance);
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
        requirementType: 'string',
        validateString: function (value, parameters, fieldInstance) {
            // Normalise the parameters
            var values = larapars.parseArrayStringParameter(parameters);

            // Get the other input's selector
            var field = values[0];

            // Get the values it should contain to mark this one as required
            parameters = values.slice(1);

            // make sure that the other element get's a change event
            larapars.bindChangeToOtherElement('requiredIf', field, fieldInstance);

            // Only required to check if the value is empty
            if (value.length == 0) {
                var fieldValue = jQuery(field).val();

                return parameters.indexOf(fieldValue) == -1;
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
        requirementType: 'string',
        validateString: function (value, parameters, fieldInstance) {
            // Normalise the parameters
            var values = larapars.parseArrayStringParameter(parameters);

            // Get the other input's selector
            var field = values[0];

            // Get the values it should contain to mark this one as required
            parameters = values.slice(1);

            // make sure that the other element get's a change event
            larapars.bindChangeToOtherElement('requiredUnless', field, fieldInstance);

            // Only required to check if the value is empty
            if (value.length == 0) {

                var fieldValue = jQuery(field).val();

                // It's not required if the input has one of the values
                return parameters.indexOf(fieldValue) > -1;
            }

            return true;
        },
        messages: {
            en: 'This field is required.'
        }
    });


// The value is required if  any of the inputs are present in the dom
// the parameter should be formatted as data-parsley-required-with="#elementValueToCheck,#elementValueToCheck,.."
window.Parsley
    .addValidator('requiredWith', {
        requirementType: 'string',
        validateString: function (value, parameters, fieldInstance) {
            // Normalise the parameters
            var allElements = larapars.parseArrayStringParameter(parameters);

            // Only validate if the char count is 0
            if (value.length == 0) {
                var AnyPresent = false;

                allElements.forEach(function (id) {
                    var $elem = jQuery(id);

                    // Check for changes on this other input
                    larapars.bindChangeToOtherElement('requiredWith', id, fieldInstance);

                    // If the element is in the dom and has a value
                    if ($elem.length > 0 && $elem.val() != '') {
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
        validateString: function (value, parameters, fieldInstance) {
            // Normalise the parameters
            var allElements = larapars.parseArrayStringParameter(parameters);

            // Only validate if the char count is 0
            if (value.length == 0) {
                var AllPresent = true;

                allElements.forEach(function (id) {
                    var $elem = jQuery(id);

                    // Check for changes on this other input
                    larapars.bindChangeToOtherElement('requiredWithAll', id, fieldInstance);

                    // If the value isn't in the dom or is empty
                    if ($elem.length == 0 || $elem.val() == '') {
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
        validateString: function (value, parameters, fieldInstance) {
            // Normalise the parameters
            var allElements = larapars.parseArrayStringParameter(parameters);

            // Only validate if the char count is 0
            if (value.length == 0) {
                var AnyPresent = false;

                allElements.forEach(function (id) {
                    var $elem = jQuery(id);

                    // Check for changes on this other input
                    larapars.bindChangeToOtherElement('requiredWithAll', id, fieldInstance);

                    if ($elem.length == 0 || $elem.val() == '') {
                        AnyPresent = true;
                    }
                });

                return AnyPresent;
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
        validateString: function (value, parameters, fieldInstance) {
            // Normalise the parameters
            var allElements = larapars.parseArrayStringParameter(parameters);

            // Only validate if the char count is 0
            if (value.length == 0) {
                var AllEmpty = true;

                allElements.forEach(function (id) {
                    var $elem = jQuery(id);

                    // Check for changes on this other input
                    larapars.bindChangeToOtherElement('requiredWithAll', id, fieldInstance);

                    if ($elem.length == 1  && $elem.val() != '') {
                        AllEmpty = false;
                    }
                });

                return AllEmpty;
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
        validateString: function (value, otherFieldName, parsleyInstance) {
            var thisElement = jQuery(parsleyInstance.$element.get(0));

            var values = [];

            // Check if we're dealing with a text field
            if (otherFieldName.substring(0, 1) == '#') {
                // Bind a change event
                larapars.bindChangeToOtherElement('inArray', otherFieldName, parsleyInstance, true);

                // If it's a text field we're assuming that it's a list of comma separated values
                return jQuery(otherFieldName).val().split(',').indexOf(value) > -1;
            }

            // Bind a change handler to the checkboxes
            jQuery('input:checkbox[name="' + otherFieldName + '"]').each(function () {
                larapars.bindChangeToOtherElement('inArray', this, parsleyInstance, true);
            });

            // Get the selected values of a checkbox by it's name
            jQuery('input:checkbox[name="' + otherFieldName + '"]:checked').each(function () {
                values.push(jQuery(this).val());
            });

            // Check if the value is in there
            return values.indexOf(value) > -1;
        },
        messages: {
            en: 'This value is incorrect.'
        }
    });

/**
 * Helper functions.
 *
 * @type {{parseArrayStringParameter: larapars.parseArrayStringParameter, bindChangeToOtherElement: larapars.bindChangeToOtherElement, getDateFormatsOption: larapars.getDateFormatsOption}}
 */
var larapars = {
    parseArrayStringParameter: function (parameter) {
        var m = parameter.match(/^\s*\[(.*)\]\s*$/);

        if (!m)
            throw 'Requirement is not an array: "' + parameter + '"';

        return m[1].replace(/\'+/g, '').split(',');
    },
    /**
     * This is used by various validation rules that rely on another input for validation.
     *
     * This function adds a 'change' event listener which forces the original to be validated again.
     *
     * @param rule              Name of the rule this change handler is for
     * @param element           Which element to bind this to
     * @param fieldInstance     The ParsleyFieldInstance we can call validate() on
     * @param originalNotEmpty  Should the original element not be empty? (optional, default false)
     */
    bindChangeToOtherElement: function (rule, element, fieldInstance, originalNotEmpty) {
        var $elem = jQuery(element);
        var elData = $elem.data('larapars-rules');

        // None were added yet, initialise
        if (elData === undefined) {
            elData = [rule];
            $elem.data('larapars-rules', elData);
        }
        // Initialised, but not present
        else if (elData.indexOf(rule) == -1) {
            elData.push(rule);
            $elem.data('larapars-rules', elData);
        }
        // Already bound
        else {
            return;
        }

        // If not yet bound
        $elem.on('change', function () {
            if (originalNotEmpty === true && jQuery(fieldInstance.$element.get(0)).val() != '') {
                fieldInstance.validate();
            }
            else if (originalNotEmpty !== true) {
                fieldInstance.validate();
            }
        });
    },
    getDateFormatsOption: function (parsleyInstance) {
        if (typeof parsleyInstance.options.dateFormats == 'undefined') {
            return this.getDateFormatsOption(parsleyInstance.parent);
        }

        return parsleyInstance.options.dateFormats;
    }
};


/**
 * Overwrite core Parsley methods.
 *
 * @type {{_isRequired: Window.ParsleyExtend._isRequired}}
 */
window.ParsleyExtend = {
    // Normally this was intended Internal only.
    // Field is required if have required constraint without `false` value
    _isRequired: function () {

        var requiredRules = [
            // This one comes out of the box with parsley
            'required',

            // These ones were added with this library
            'requiredIf', 'requiredUnless', 'requiredWith', 'requiredWithAll', 'requiredWithout', 'requiredWithoutAll'
        ];

        var requiredRulesFound = [];

        // Loop over the list to check if they're defined on the field.
        requiredRules.forEach(function (rule) {
            if ('undefined' !== typeof this.constraintsByName[rule]) {
                requiredRulesFound.push(rule);
            }
        }, this);

        // If there's not one required rule, return false
        if (requiredRulesFound.length == 0)
            return false;

        // If parsley's on required rule was found
        if (requiredRulesFound.indexOf('required') >= 0) {
            // Check if the flag is set to true
            return false !== this.constraintsByName.required.requirements;
        }

        return true;
    }
};

// convert PHP date format to moment JS date format
var formatDatePhpToJs = {
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
    }
}