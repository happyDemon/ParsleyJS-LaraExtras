# ParsleyJS-LaraExtras
These are extra parsley validation rules that translate well to laravel's own validation rules.

Be sure to take a look at the examples included in the repo.

**Note: At the moment the required rules are untested and without examples, they'll follow shortly.**

## Install

Just include laravel-parsley.js right after where you've included parsley.js.

Don't forget to include moment.js if you're using date validation.

If you'd like support for < IE9, include polyfill.js.

#### Dates

Several date validation rules make use of a config option. 
This option let's you decide what formats are valid.

By default it looks for the following formats (in order):

```
window.Parsley.options.dateFormats = ['DD/MM/YY', 'DD/MM/YYYY', 'MM/DD/YY', 'MM/DD/YYYY', 'YY/MM/DD', 'YYYY/MM/DD'];
```

MomentJS does this strictly, meaning separators are also taken into account.

You can set your valid date formats the same way (this means that all parsley instances will get this assigned by default).

Or you can set it on your parsley instance:

```
$('form').parsley({
  dateFormats: ['DD-MM-YY', 'DD-MM-YYYY', 'MM-DD-YY', 'MM-DD-YYYY', 'YY-MM-DD', 'YYYY-MM-DD']
});
```

## laravel-parsley.js

Here are all the included rules, written down as you'd assign them as data attributes to the input that would require them.


#### data-parsley-in="value,value,value,..."

The input's value should be in the provided comma separated list.

*Laravel rule: [in](https://laravel.com/docs/5.2/validation#rule-in)*

#### data-parsley-not-in="value,value,value,..."

The input's value should not be in the provided comma separated list.

*Laravel rule: [not_in](https://laravel.com/docs/5.2/validation#rule-not-in)*

#### data-parsley-different="#otherInput"

The input's value should not be the same as the specified other input element's value.

*Laravel rule: [between](https://laravel.com/docs/5.2/validation#rule-between)*

#### data-parsley-between="[min,max]"

The input's value (a number) should be greater than `min` and smaller than `max`

#### data-parsley-size-number="size"

The input's value (a number) be the same as `size`.

*Laravel rule: [size](https://laravel.com/docs/5.2/validation#rule-size)*

#### data-parsley-size-string="size"

The input's character count should be the same as `size`.

*Laravel rule: [size](https://laravel.com/docs/5.2/validation#rule-size)*

#### data-parsley-date

The input's value should be a correct date string.
Note that the separators don't matter.

*Laravel rule: [date](https://laravel.com/docs/5.2/validation#rule-date)*

#### data-parsley-date-format="format"

The input's value should be the same format as specified.
The format parameter only takes PHP date format characters [link](http://php.net/manual/en/function.date.php#refsect1-function.date-parameters).

*Laravel rule: [date_format](https://laravel.com/docs/5.2/validation#rule-date-format)*

#### data-parsley-before="before/date/here"

The input's value should be a date before the one specified as parameter.

*Laravel rule: [before](https://laravel.com/docs/5.2/validation#rule-before)*

#### data-parsley-before-input="#other-input"

The input's value should be a date before the date from the `#other-input`'s value

*Laravel rule: [before](https://laravel.com/docs/5.2/validation#rule-before)*

#### data-parsley-after="after/date/here"

The input's value should be a date after the one specified as parameter.

*Laravel rule: [after](https://laravel.com/docs/5.2/validation#rule-after)*

#### data-parsley-after-input="#other-input"

The input's value should be a date after the date from the `#other-input`'s value

*Laravel rule: [after](https://laravel.com/docs/5.2/validation#rule-after)*

#### data-parsley-disctinct

The input's values should be unique (checkboxes, radios, select multiple).

You can add the `data-parsley-multiple="mymultiplelink"` to the tags you want to include in the validation.

*Laravel rule: [distinct](https://laravel.com/docs/5.2/validation#rule-distinct)*

#### data-parsley-in-array="#html-id|inputName"

The input's value should be present in one of the values of the provided element.

##### #html-id

When you specifiy an element starting with a hashtag we'll assume it's a text input that containts a comma separated list of values.

##### inputName

If you specify any other string we'll start looking for a checkbox with this string as name and snoop around its checked values.

*Laravel rule: [in_array](https://laravel.com/docs/5.2/validation#rule-in-array)*

#### data-parsley-required-if="['#elementValueToCheck', 'value1,value2,..']"

The value is required only if another input's value matched one of its defined values.

*Laravel rule: [required_if](https://laravel.com/docs/5.2/validation#rule-required-if)*

#### data-parsley-required-unless="['#elementValueToCheck', 'value1,value2,..']"

The value is required unless another input's value matched one of its defined values.

*Laravel rule: [required_unless](https://laravel.com/docs/5.2/validation#rule-required-unless)*

#### data-parsley-required-with="#elementToCheck,#elementToCheck,..."

The value is required if any of the inputs are present in the dom

*Laravel rule: [required_with](https://laravel.com/docs/5.2/validation#rule-required-with)*

#### data-parsley-required-with-all="#elementToCheck,#elementToCheck,..."

The value is required if all of the specified inputs are present in the dom

*Laravel rule: [required_with_all](https://laravel.com/docs/5.2/validation#rule-required-with-all)*

#### data-parsley-required-without="#elementToCheck,#elementCheck,..."

The value is required if any of the inputs are not present in the dom

*Laravel rule: [required_without](https://laravel.com/docs/5.2/validation#rule-required-without)*

#### data-parsley-required-without-all="#elementToCheck,#elementToCheck,..."

The value is required if all of the specified inputs are not present in the dom

*Laravel rule: [required_without_all](https://laravel.com/docs/5.2/validation#rule-required-without-all)*
