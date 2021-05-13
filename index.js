const path = require('path')
const fs = require('fs')
const cssToJS = require('css-to-js-nodejs');

function recFindByExt(base, ext, files, result) {
  files = files || fs.readdirSync(base)
  result = result || []

  files.forEach(
    function (file) {
      var newbase = path.join(base, file)
      if (fs.statSync(newbase).isDirectory()) {
        result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result)
      }
      else {
        if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
          result.push(newbase)
        }
      }
    }
  )
  return result
};


function recursivelyFindClass(object, className) {
  return Object.keys(object).filter(subProp => {
    return subProp === className
  }).map(e => object[e])
};

let map = {};

function babelPluginInCSSTolineStyles(babel) {
  const t = babel.types
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.includes('.css')) {
          let fileName = path.node.source.value;
          const files = recFindByExt(process.cwd(), 'css');
          if (fileName.slice(0, 3) === '../') {
            fileName = fileName.substring(3);
          } else if (fileName.slice(0, 2) === './') {
            fileName = fileName.substring(2);
          }
          const file = files.filter(name => name.includes(fileName))[0]
          const fileContents = fs.readFileSync(file, 'utf8');
          const jsClass = cssToJS(fileContents);
          map = Object.assign(map, jsClass);
        }
      },
      JSXAttribute(path) {
        if (path.node.value.type === 'StringLiteral') {
          if (path.node.name.name === 'className') {
            const className = path.node.value.value;
            const foundProps = recursivelyFindClass(map, `.${className}`)
            if (!foundProps) {
              return;
            }
            const foundProp = foundProps[0];
            path.replaceWith(
              t.JSXAttribute(
                t.JSXIdentifier("style"),
                t.JSXExpressionContainer(
                  t.ObjectExpression(
                    Object.keys(foundProp).map(prop => {
                      return t.ObjectProperty(
                        t.Identifier(prop),
                        t.StringLiteral(foundProp[prop])
                      )
                    }))
                )
              )
            );

          }
        }
      }
    }
  };
};

module.exports = babelPluginInCSSTolineStyles;