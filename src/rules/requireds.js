import jQuery from 'jquery';
import utils from '../utils.js';

// The value is required only if another input's value matched one of the defined ones.
// the parameter should be formatted as data-parsley-required-if="["#elementValueToCheck", "value1,value2,.."]"
window.Parsley
    .addValidator('requiredIf', {
        requirementType: 'string',
        validateString: function (value, parameters, fieldInstance) {
            // Normalise the parameters
            var values = utils.parseArrayStringParameter(parameters);

            // Get the other input's selector
            var field = values[0];

            // Get the values it should contain to mark this one as required
            parameters = values.slice(1);

            // make sure that the other element get's a change event
            utils.bindChangeToOtherElement('requiredIf', field, fieldInstance);

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
            var values = utils.parseArrayStringParameter(parameters);

            // Get the other input's selector
            var field = values[0];

            // Get the values it should contain to mark this one as required
            parameters = values.slice(1);

            // make sure that the other element get's a change event
            utils.bindChangeToOtherElement('requiredUnless', field, fieldInstance);

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
            var allElements = utils.parseArrayStringParameter(parameters);

            // Only validate if the char count is 0
            if (value.length == 0) {
                var AnyPresent = false;

                allElements.forEach(function (id) {
                    var $elem = jQuery(id);

                    // Check for changes on this other input
                    utils.bindChangeToOtherElement('requiredWith', id, fieldInstance);

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
            var allElements = utils.parseArrayStringParameter(parameters);

            // Only validate if the char count is 0
            if (value.length == 0) {
                var AllPresent = true;

                allElements.forEach(function (id) {
                    var $elem = jQuery(id);

                    // Check for changes on this other input
                    utils.bindChangeToOtherElement('requiredWithAll', id, fieldInstance);

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
            var allElements = utils.parseArrayStringParameter(parameters);

            // Only validate if the char count is 0
            if (value.length == 0) {
                var AnyPresent = false;

                allElements.forEach(function (id) {
                    var $elem = jQuery(id);

                    // Check for changes on this other input
                    utils.bindChangeToOtherElement('requiredWithAll', id, fieldInstance);

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
            var allElements = utils.parseArrayStringParameter(parameters);

            // Only validate if the char count is 0
            if (value.length == 0) {
                var AllEmpty = true;

                allElements.forEach(function (id) {
                    var $elem = jQuery(id);

                    // Check for changes on this other input
                    utils.bindChangeToOtherElement('requiredWithAll', id, fieldInstance);

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