# eslint-plugin-file-banner

Eslint plugin to check file has comment block and  jsdoc tags

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-file-banner`:

```
$ npm install eslint-plugin-file-banner --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-file-banner` globally.

## Usage

Add `file-banner` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "file-banner"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "file-banner/rule-name": 2
    }
}
```

## Supported Rules

- [banner](docs/rules/banner.md): Analyze file banner





