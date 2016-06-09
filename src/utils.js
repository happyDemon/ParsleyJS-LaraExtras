import jQuery from 'jquery';

/**
 * Helper functions.
 *
 * @type {{parseArrayStringParameter: larapars.parseArrayStringParameter, bindChangeToOtherElement: larapars.bindChangeToOtherElement, getDateFormatsOption: larapars.getDateFormatsOption}}
 */
export default {
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
    }
};