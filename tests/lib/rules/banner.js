/**
 *
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/banner'),

  RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester()
ruleTester.run('banner', rule, {

  valid: [
    {
      code: '// first line',
      options: ['optional']
    },
    {
      code: [
        "/**",
        " * @copyright By Inc.Co",
        " */"
      ].join('\n'),
      options: ['required', {tags: [{title: 'copyright', regex: 'Co$', required: true}]}]
    },
    {
      code: [
        "/**",
        " * @file file.js",
        " */"
      ].join('\n'),
      options: ['required', {tags: [{title: 'file', regex: '\.js$', required: true}]}]
    },
    {
      code: [
        "/**",
        " * @name file.js",
        " */"
      ].join('\n'),
      options: ['required', {tags: [{title: 'file', regex: '\.js$', required: false}]}]
    },
    {
      code: [
        "/**",
        " * @type Factory",
        " */"
      ].join('\n'),
      options: ['required']
    }
  ],


  invalid: [
    {
      code: '// first line',
      options: ['required'],
      errors: [{
        message: 'Banner missed.'
      }]
    },
    {
      code: [
        "/**",
        " * @copyright By Inc",
        " */"
      ].join('\n'),
      options: ['required', {tags: [{title: 'copyright', regex: 'Co$', required: true}]}],
      errors: [{
        message: 'Value for tag "copyright" not match.'
      }]
    },
    {
      code: [
        "/**",
        " * @file1 file.js",
        " */"
      ].join('\n'),
      options: ['required', {tags: [{title: 'file', regex: '\.js$', required: true}]}],
      errors: [{
        message: 'Required tag "file" missed.'
      }]
    },
  ]
})
