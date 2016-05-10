# rel="edit-form" UI for Firefox

[![rel-edit-form license](https://img.shields.io/github/license/BigBlueHat/rel-edit-form.svg?style=flat-square)](http://github.com/BigBlueHat/rel-edit-form)
[![Patreon](https://img.shields.io/badge/donate-patreon-orange.svg?style=flat-square)](https://www.patreon.com/BigBlueHat)

Enable an edit button in the browser's location bar when `rel="edit-form"`
is found in the HTML.

Look for the `edit-form` link relation on
[json.com](view-source:http://json.com/) and test it with the extension once
you have it installed.

## Link Relations FTW!

[RFC 6861](http://tools.ietf.org/html/rfc6861#section-3.2) defines the `edit-form` link
relationship for linking to a from which can be used to edit the existing resource or
representation of that resource.

This project simply adds the button to the browser...finally.

## Contributing

```
$ npm install -g jpm
$ npm install
$ jpm run
```
...change stuff...repeat.

## License

MIT
