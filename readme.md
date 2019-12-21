# Prevent mime type sniffing for ▲ Zeit's [micro](https://github.com/zeit/micro/)

#### Written in Typescript since v1.1.0

### Installation

```
yarn add micro-nosniff
```

### Usage

```
import nosniff from 'micro-nosniff'
const handler = (req, res) => send(res, 200, 'ok!')

module.exports = nosniff(handler)
```
