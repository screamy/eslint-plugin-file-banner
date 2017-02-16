# banner

Enforce usage of comment block at the beginning of the file. May check required jsdoc tags in comment block.


## Rule Details

This rule takes optional arguments

```
{
  "rules": {
    "file-banner": [2, "required", {tags: [{title: "copyright", regex: 'Inc\.$', required: true}]}]
  }
}
```

Examples of **incorrect** code for this rule:

```js
// first line without block comment
'use strict';
```

Examples of **correct** code for this rule:

```js
/**
 *  Module to...
 *  @copyright Inc.
 */
'use strict';
```

```
{
  "rules": {
    "file-banner": [2, "optional", {tags: [{title: "copyright", regex: 'Inc\.$', required: true}]}]
  }
}
```

Examples of **incorrect** code for this rule:

```js
/**
 *  Module to...
 *  @author Inc.
 */
'use strict';
```

Examples of **correct** code for this rule:

```js
// first line without block comment
'use strict';
```

```js
/**
 *  Module to...
 *  @copyright Inc.
 */
'use strict';
```
