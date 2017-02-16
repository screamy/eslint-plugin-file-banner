/**
 * @fileoverview Verify file banner
 * @author Denys Karpenko
 */
'use strict'

var doctrine = require('doctrine');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Verify file banner',
      category: 'File banner',
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
      {
        'enum': ['required', 'optional']
      },
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          tags: {
            type: 'array',
            minItems: 0,
            items: {
              type: 'object',
              properties: {
                title: {
                  type: 'string'
                },
                regex: {
                  type: 'string'
                },
                required: {
                  type: 'boolean'
                }
              },
              required: ['title', 'regex', 'required'],
              additionalProperties: false
            }
          }
        }
      }
    ]
  },

  create: function (context) {
    var options = context.options;
    var isBannerRequired = options[0] === 'required';
    var definedTags = options[1] ? options[1].tags : [];

    var source = context.getSourceCode();

    var report = {
      missedBanner: function (node) {
        context.report(node, 'Banner missed.');
      },
      incorrectBanner: function (node) {
        context.report({ node: node, message: 'Banner has syntax error.' });
      },
      missedTag: function (node, tag) {
        context.report({ node: node, message: 'Required tag "' + tag.title + '" missed.' });
      },
      incorrectTagValue: function (node, tag) {
        context.report({ node: node, message: 'Value for tag "' + tag.title + '" not match.' });
      }
    };

    function isBannerPresent(comment) {
      return comment && comment.type === 'Block';
    }

    return {

      Program(node) {
        var rootNode = node.body.length ? node.body[0] : node;
        var comment = source.getComments(rootNode).leading[0];
        var bannerPresent = isBannerPresent(comment);

        if (isBannerRequired && !bannerPresent) {
          report.missedBanner(rootNode);
        } else if (bannerPresent) {
          try {
            var jsDoc = doctrine.parse(comment.value, {
              strict: false,
              unwrap: true,
              sloppy: true,
              recoverable: true
            });

            var tags = jsDoc.tags.reduce((memo, next) => {
              memo[next.title] = next;
              return memo;
            }, {});

            definedTags.forEach((tag) => {
              var foundTag = tags[tag.title];
              var regex;

              if (foundTag) {
                regex = new RegExp(tag.regex);
                if (!regex.test(foundTag.description)) {
                  report.incorrectTagValue(rootNode, tag);
                }
              } else if (!foundTag && tag.required) {
                report.missedTag(rootNode, tag);
              }
            })
          } catch (ex) {
            report.incorrectBanner(rootNode);
          }
        }
      }
    }
  }
}
