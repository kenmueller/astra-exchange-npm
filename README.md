# **[Astra Exchange API Documentation](https://astra.exchange/documentation)**

## **[View on npm](https://www.npmjs.com/package/astra-exchange)**

## Download

```bash
npm i astra-exchange
```

## Usage

**JavaScript:**

```javascript
const exchange = require('astra-exchange')
```

**TypeScript:**

```typescript
import * as exchange from 'astra-exchange'
```

**Includes type definitions**

## Example

```javascript
exchange.transact('1234', 'e95Y6tKOvIS7CBlEdBn2UknzxMQ2', 'GwZX5OnFzGUl0UlXH97EGIeW70p1', 20, 'Take my money').then(record => {
    console.log(`Successful transaction. Here's the record: ${record}`)
}).catch(error => {
    console.log(`${error.status} error: ${error.message}`)
})
```

**[Read more](https://astra.exchange/documentation)**