## Prevent mime type sniffing for [micro](https://github.com/zeit/micro/)

```
yarn add micro-nosniff
```

### Usage

```
import nosniff from 'micro-nosniff'
const handler = (req, res) => send(res, 200, 'ok!')

module.exports = nosniff(handler)
```
