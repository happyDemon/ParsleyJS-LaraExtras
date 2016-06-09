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