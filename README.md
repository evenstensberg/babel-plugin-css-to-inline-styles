## babel-plugin-css-to-inline-styles

## Installation

```console
npm install --save babel-plugin-css-to-inline-styles
```

### .babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "env": {
    "test": {
      "presets": [["@babel/preset-env"], "@babel/preset-react"]
    }
  },
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel",
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ],
    ["babel-plugin-css-to-inline-styles"]
  ]
}
```
## Example


### Given an example css file (test.css)

```css
.main-wrapper {
    flex-direction: row;
    display: flex;
    flex: 1;
  }
```


### app.jsx

```jsx

const ReactComponent = <div className="main-wrapper"></div>
```

### transforms to

```jsx

const ReactComponent = <div style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    flex: 1;
                                    }}>
                        </div>
```

## Need help or want to donate to help me make Open Source projects?

- Send me a message on [Twitter](https://twitter.com/evenstensberg)!
- [Donate to me!](https://github.com/sponsors/evenstensberg)