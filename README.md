# ParsleyJS-LaraExtras
[![npm](https://img.shields.io/npm/dt/parsley-laravel-extras.svg?maxAge=3600)](https://www.npmjs.com/package/parsley-laravel-extras)
[![npm](https://img.shields.io/npm/v/parsley-laravel-extras.svg?maxAge=3600)](https://www.npmjs.com/package/parsley-laravel-extras)
[![GitHub commits](https://img.shields.io/github/commits-since/happyDemon/ParsleyJS-LaraExtras/0.4.2.svg?maxAge=3600)](https://github.com/happyDemon/ParsleyJS-LaraExtras)

These are extra parsley validation rules that translate well to laravel's own validation rules.

Be sure to take a look at the examples included in the repo.

The [documentation](http://parsley-laraextras.happydemon.xyz/) is also quite handy.

## Install

### NPM

`npm install parsley-laravel-extras`

Next you can import or require it in your js:

`require('parsley-laravel-extras')`

`import 'parsley-laravel-extras'`

Or just include dist/laravel-parsley.js right after where you've included parsley.js.

**Note** Don't forget to include moment.js if you're using date validation.

**Note** If you'd like support for < IE9, include [es5-shim](https://github.com/es-shims/es5-shim).

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

Most rules have been included. However I won't tag this repo as a `1.0` release untill I figure out a way to also emulate the way laravel validates arrays.

## Rules

Here's an overview of all the Laravel rules and how they can be implemented.

All the linked rules can be used through this library, the textual rules are in Parsley by default.


| Laravel | Parsley |
| ------- | ------- |
| accepted |  |
| active_url |  |
| after:date | [DateAfter](http://parsley-laraextras.happydemon.xyz/rules/date) |
| alpha | pattern="^[a-zA-Z]+$" |
| alpha_dash | pattern="^[a-zA-Z_-]+$" |
| alpha_num | type="alphanum" |
| array |  |
| before:date | [DateBefore](http://parsley-laraextras.happydemon.xyz/rules/date) |
| between:min,max | [FileSizeBetween](http://parsley-laraextras.happydemon.xyz/rules/file) |
|  | [Between](http://parsley-laraextras.happydemon.xyz/rules/size) |
| boolean |  |
| confirmed | equalTo |
| date |  [Date](http://parsley-laraextras.happydemon.xyz/rules/date)|
| date_format:format | [DateFormat](http://parsley-laraextras.happydemon.xyz/rules/date) |
| different:field | [Different](http://parsley-laraextras.happydemon.xyz/rules/misc) |
| digits:value | [SizeNumber](http://parsley-laraextras.happydemon.xyz/rules/size) |
| digits_between:min,max | [Between](http://parsley-laraextras.happydemon.xyz/rules/size) |
| dimensions | [Dimensions](http://parsley-laraextras.happydemon.xyz/rules/file) |
| distinct | [Distinct](http://parsley-laraextras.happydemon.xyz/rules/misc) |
| email | type="email" |
| exists:table,column | remote |
| file |  |
| filled | required |
| image | [Image](http://parsley-laraextras.happydemon.xyz/rules/file) |
| in:foo,bar,... | [In](http://parsley-laraextras.happydemon.xyz/rules/in) |
| in_array:anotherfield | [InArray](http://parsley-laraextras.happydemon.xyz/rules/in) |
| integer | type="integer" |
| ip |  |
| json |  |
| max:value | [fileSizeMax](http://parsley-laraextras.happydemon.xyz/rules/file) |
|  | max(number) |
| mimetypes:text/plain,... | [Mimetypes](http://parsley-laraextras.happydemon.xyz/rules/file) |
| mimes:foo,bar,... | [FileExt](http://parsley-laraextras.happydemon.xyz/rules/file) |
| min:value | [fileSizeMin](http://parsley-laraextras.happydemon.xyz/rules/file) |
|  | min (number) |
| not_in:foo,bar,... | [NotIn](http://parsley-laraextras.happydemon.xyz/rules/in) |
| numeric | type="digits" |
| present |  |
| regex:pattern | pattern |
| required | required |
| required_if:anotherfield,value,... | [RequiredIf](http://parsley-laraextras.happydemon.xyz/rules/required) |
| required_unless:anotherfield,value,... | [RequiredUnless](http://parsley-laraextras.happydemon.xyz/rules/required) |
| required_with:foo,bar,... | [RequiredWith](http://parsley-laraextras.happydemon.xyz/rules/required) |
| required_with_all:foo,bar,... | [RequiredWithAll](http://parsley-laraextras.happydemon.xyz/rules/required) |
| required_without:foo,bar,... | [RequiredWithout](http://parsley-laraextras.happydemon.xyz/rules/required) |
| required_without_all:foo,bar,... | [RequiredWithoutAll](http://parsley-laraextras.happydemon.xyz/rules/required) |
| same:field | equalto |
| size:value | [fileSize](http://parsley-laraextras.happydemon.xyz/rules/file) |
|  | [SizeNumber](http://parsley-laraextras.happydemon.xyz/rules/size) |
|  | [SizeString](http://parsley-laraextras.happydemon.xyz/rules/size) |
| string |  |
| timezone |  |
| unique:table,column,except,idColumn | remote |
| url | type="url" |
