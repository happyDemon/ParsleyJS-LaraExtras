import jQuery from 'jquery';
import utils from '../utils.js';

// Check if the value is different from the specified input's value
window.Parsley
    .addValidator('different', {
        requirementType: 'string',
        validateString: function (value, parameter, fieldInstance) {
            if (jQuery(parameter).length == 0)
                return true;

            utils.bindChangeToOtherElement('different', parameter, fieldInstance, true);

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
                utils.bindChangeToOtherElement('inArray', otherFieldName, parsleyInstance, true);

                // If it's a text field we're assuming that it's a list of comma separated values
                return jQuery(otherFieldName).val().split(',').indexOf(value) > -1;
            }

            // Bind a change handler to the checkboxes
            jQuery('input:checkbox[name="' + otherFieldName + '"]').each(function () {
                utils.bindChangeToOtherElement('inArray', this, parsleyInstance, true);
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