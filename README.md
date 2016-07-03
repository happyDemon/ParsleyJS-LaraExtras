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
