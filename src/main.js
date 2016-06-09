import jQuery from 'jquery';
import './rules/ins';
import './rules/dates';
import './rules/comparison';
import './rules/requireds.js';
import './utils.js';

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

export default utils;