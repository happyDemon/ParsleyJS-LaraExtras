# ParsleyJS-LaraExtras
These are extra parsley validation rules that translate well to laravel's own validation rules.

## laravel-parsley.js

Don't forget to include moment.js if you're using date validation.

### data-parsley-in="value,value,value,..."

The input's value should be in the provided comma separated list.

*Laravel rule: in*

### data-parsley-not-in="value,value,value,..."

The input's value should not be in the provided comma separated list.

*Laravel rule: not_in*

### data-parsley-different="#otherInput"

The input's value should not be the same as the specified other input element's value.

*Laravel rule: between*

### data-parsley-between="[min,max]"

The input's value (a number) should be greater than `min` and smaller than `max`

### data-parsley-size-number="size"

The input's value (a number) be the same as `size`.

*Laravel rule: size*

### data-parsley-size-string="size"

The input's character count should be the same as `size`.

*Laravel rule: size*

### data-parsley-date

The input's value should be a correct date string.
Note that the separators don't matter.

*Laravel rule: date*

### data-parsley-date-format="format"

The input's value should be the same format as specified.
The format parameter only takes PHP date format characters [link](http://php.net/manual/en/function.date.php#refsect1-function.date-parameters).

*Laravel rule: date_format*

### data-parsley-before="before/date/here"

The input's value should be a date before the one specified as parameter.

*Laravel rule: before*

### data-parsley-before-input="#other-input"

The input's value should be a date before the date from the `#other-input`'s value

*Laravel rule: before*

### data-parsley-after="after/date/here"

The input's value should be a date after the one specified as parameter.

*Laravel rule: after*

### data-parsley-after-input="#other-input"

The input's value should be a date after the date from the `#other-input`'s value

*Laravel rule: after*

### data-parsley-disctinct

The input's values should be unique (checkboxes, multiselects).

*Laravel rule: distinct*

### data-parsley-in-array="#html-id|inputName"

The input's value should be present in one of the values of the provided element.

#### #html-id

When you specifiy an element starting with a hashtag we'll assume it's a text input that containts a comma separated list of values.

#### inputName

If you specify any other string we'll start looking for a checkbox with this string as name and snoop around its checked values.

*Laravel rule: in_array*

### data-parsley-required-if="['#elementValueToCheck', 'value1,value2,..']"

The value is required only if another input's value matched one of its defined values.

*Laravel rule: required_if*

### data-parsley-required-unless="['#elementValueToCheck', 'value1,value2,..']"

The value is required unless another input's value matched one of its defined values.

*Laravel rule: required_unless*
