## babel-plugin-css-to-inline-styles

## Installation

```console
npm install --save babel-plugin-css-to-inline-styles
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