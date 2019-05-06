# **[Documentation](https://astra.exchange/documentation)**

## **[astra-exchange npm](https://www.npmjs.com/package/astra-exchange)**

## Download

```bash
npm i astra-exchange
```

## Usage

```javascript
const exchange = require('astra-exchange')
```

## Example

```javascript
exchange().transact('1234', 'e95Y6tKOvIS7CBlEdBn2UknzxMQ2', 'GwZX5OnFzGUl0UlXH97EGIeW70p1', 20, 'Take my money', () => {
    alert('Successful transaction')
}, (status, response) => {
    alert(`${status} error: ${response}`)
})
```

**[Read more](https://astra.exchange/documentation)**