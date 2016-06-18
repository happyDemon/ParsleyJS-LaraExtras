import jQuery from 'jquery';
import utils from '../utils.js';

var filesSizes = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
};

// Make sure all files within the inputs are equal to or smaller than the defined size.
window.Parsley
    .addValidator('fileSizeMax', {
        requirementType: ['integer', 'string'],
        validateString: function (value, maxSize, sizeMultiplyer, parsleyFieldInstance) {
            sizeMultiplyer = sizeMultiplyer.toLowerCase();
            var files = parsleyFieldInstance.$element[0].files;

            // Multiply the max file size
            maxSize = maxSize * filesSizes[sizeMultiplyer.toLowerCase()];

            console.log(maxSize);

            // If a file is present in the input
            if (files.length > 0) {
                // Loop over the files
                for (var i = 0; i < files.length; i++) {
                    console.log(files[i].size);
                    if (files[i].size > maxSize) {
                        return false;
                    }
                }
            }

            return true;
        },
        messages: {
            en: 'Your file(s) are too big.'
        }
    });


// Make sure all files within the inputs are equal to or bigger than the defined size.
window.Parsley
    .addValidator('fileSizeMin', {
        requirementType: ['integer', 'string'],
        validateString: function (value, minSize, sizeMultiplyer, parsleyFieldInstance) {
            var files = parsleyFieldInstance.$element[0].files;

            // Multiply the min file size
            minSize = minSize * filesSizes[sizeMultiplyer.toLowerCase()];

            // If a file is present in the input
            if (files.length > 0) {
                // Loop over the files
                for (var i = 0; i < files.length; i++) {
                    if (files[i].size < minSize) {
                        return false;
                    }
                }
            }

            return true;
        },
        messages: {
            en: 'Your file(s) should are too small.'
        }
    });


// Make sure all files within the inputs are between the defined sizes.
window.Parsley
    .addValidator('fileSizeBetween', {
        requirementType: ['integer', 'integer', 'string'],
        validateString: function (value, minSize, maxSize, sizeMultiplyer, parsleyFieldInstance) {
            var files = parsleyFieldInstance.$element[0].files;

            // Multiply the file sizes
            minSize = minSize * filesSizes[sizeMultiplyer.toLowerCase()];
            maxSize = maxSize * filesSizes[sizeMultiplyer.toLowerCase()];

            // If a file is present in the input
            if (files.length > 0) {
                // Loop over the files
                for (var i = 0; i < files.length; i++) {
                    if (files[i].size <= minSize || files[i].size >= maxSize) {
                        return false;
                    }
                }
            }

            return true;
        },
        messages: {
            en: 'Your file(s) should be between %s and %s %s.'
        }
    });


// Make sure all files within the input are an image
window.Parsley
    .addValidator('image', {
        validateString: function (value, param, parsleyFieldInstance) {
            var files = parsleyFieldInstance.$element[0].files;

            // If a file is present in the input
            if (files.length > 0) {
                // Loop over the files
                for (var i = 0; i < files.length; i++) {
                    if (!files[i].type.match('image/*')) {
                        return false;
                    }
                }
            }

            return true;
        },
        messages: {
            en: 'This is not an image.'
        }
    });


// Make sure all files within the input are an image
window.Parsley
    .addValidator('fileMimetype', {
        requirementType: 'string',
        validateString: function (value, mimetypes, parsleyFieldInstance) {
            var allMimes = utils.parseArrayStringParameter(mimetypes);

            var files = parsleyFieldInstance.$element[0].files;

            // If a file is present in the input
            if (files.length > 0) {
                // Loop over the files
                for (var i = 0; i < files.length; i++) {
                    if (allMimes.indexOf(files[i].type) == -1) {
                        return false;
                    }
                }
            }

            return true;
        },
        messages: {
            en: 'This file does not have the correct mimetype "%s".'
        }
    });

// Make sure all images withing the input have specific dimensions

//Parsley.addAsyncValidator();


window.Parsley
    .addValidator('dimensions', {
        requirementType: {
            '': 'boolean',
            min_width: 'number', // Specify the minimum width the image should have
            max_width: 'number', // Specify the maximum width the image should have
            min_height: 'number', // Specify the minimum height the image should have
            max_height: 'number', // Specify the maximum height the image should have
            width: 'number', // Specify the  width the image should have
            height: 'number', // Specify the height the image should have
            ratio: 'string', // Specify the ratio the image should have
        },
        validateString: function (value, param, options, parsleyFieldInstance) {
            var files = parsleyFieldInstance.$element[0].files;


            // If a file is present in the input
            if (files.length > 0) {
                var defer = jQuery.Deferred();

                var file = new FileReader;

                // Set up the image validation when the file is loaded
                file.onload = function () {
                    var image = new Image;

                    // Validate once t he image is loaded
                    image.onload = function () {
                        var width = this.width;
                        var height = this.height;

                        // Check min width, if defined
                        if (typeof options.min_width != 'undefined') {
                            console.log(width, options.min_width);
                            if (width < options.min_width) {
                                defer.reject();
                                return;
                            }
                        }

                        // Check max width, if defined
                        if (typeof options.max_width != 'undefined') {
                            if (width > options.max_width) {
                                defer.reject();
                                return;
                            }
                        }

                        // Check min height, if defined
                        if (typeof options.min_height != 'undefined') {
                            if (height < options.min_height) {
                                defer.reject();
                                return;
                            }
                        }

                        // Check max height, if defined
                        if (typeof options.max_height != 'undefined') {
                            if (height > options.max_height) {
                                defer.reject();
                                return;
                            }
                        }

                        // Check width, if defined
                        if (typeof options.width != 'undefined') {
                            if (width != options.width) {
                                defer.reject();
                                return;
                            }
                        }

                        // Check height, if defined
                        if (typeof options.height != 'undefined') {
                            if (height != options.height) {
                                defer.reject();
                                return;
                            }
                        }

                        // Check ratio, if defined
                        if (typeof options.ratio != 'undefined') {
                            var splitRatio = options.ratio.split(':');

                            if (splitRatio[0] / splitRatio[1] != width / height) {
                                defer.reject();
                                return;
                            }
                        }

                        defer.resolve();
                    };

                    // On error, reject the promise
                    image.onerror = function() {
                        console.log('image error');
                        defer.reject();
                    }

                    // Set the image
                    console.log(file.result);
                    image.src = file.result;
                }

                // On error, reject the promise
                file.onerror = function() {
                    console.log('file error');
                    defer.reject();
                }

                // Set the file
                console.log(files[0]);
                file.readAsDataURL(files[0])

                return defer.promise();
            }

            return true;
        }
    });