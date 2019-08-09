import ExchangeError from './ExchangeError'
import TransactionRecord from './TransactionRecord'
import User from './User'

export { ExchangeError }

export function users(): Promise<any> {
	return fetch('https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/users').then(response =>
		response.json().catch(() =>
			Promise.reject(new ExchangeError(500, 'Unknown error. Please try again'))
		)
	)
}

export function transact(pin: string, from: string, to: string, amount: number, message?: string | null): Promise<TransactionRecord> {
	return pin.length === 4
		? fetch(`https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/transact?pin=${pin}&from=${from}&to=${to}&amount=${amount}${message ? `&message=${message}` : ''}`).then(response => {
			switch (response.status) {
			case 200:
				return Promise.resolve(new TransactionRecord(from, to, amount, message || '', new Date))
			case 400:
				return Promise.reject(new ExchangeError(400, 'Invalid parameters'))
			case 404:
				return Promise.reject(new ExchangeError(404, 'Invalid user ID'))
			case 403:
				return Promise.reject(new ExchangeError(403, 'Insufficient balance'))
			case 401:
				return Promise.reject(new ExchangeError(401, 'Invalid pin'))
			default:
				return Promise.reject(new ExchangeError(500, 'Unknown error. Please try again'))
			}
		})
		: Promise.reject(new ExchangeError(400, '\'pin\' must be 4 characters long'))
}

export function userWithId(id: string, pin?: string | null): Promise<User> {
	return pin && pin.length !== 4
		? Promise.reject(new ExchangeError(400, '\'pin\' must be 4 characters long'))
		: fetch(`https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/user?id=${id}${pin ? `&pin=${pin}` : ''}`).then(response => {
			switch (response.status) {
			case 200:
				return response.json().then(json =>
					new User(json.id, json.name, json.email, json.balance, json.reputation, json.pin)
				).catch(() =>
					Promise.reject(new ExchangeError(500, 'Unknown error. Please try again'))
				)
			case 400:
				return Promise.reject(new ExchangeError(400, 'Invalid parameters'))
			case 404:
				return Promise.reject(new ExchangeError(404, 'Invalid user ID'))
			case 401:
				return Promise.reject(new ExchangeError(401, 'Invalid pin'))
			default:
				return Promise.reject(new ExchangeError(500, 'Unknown error. Please try again'))
			}
		})
}

export function userWithEmail(email: string, pin?: string | null): Promise<User> {
	return pin && pin.length !== 4
		? Promise.reject(new ExchangeError(400, '\'pin\' must be 4 characters long'))
		: fetch(`https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/user?email=${email}${pin ? `&pin=${pin}` : ''}`).then(response => {
			switch (response.status) {
			case 200:
				return response.json().then(json =>
					new User(json.id, json.name, json.email, json.balance, json.reputation, json.pin)
				).catch(() =>
					Promise.reject(new ExchangeError(500, 'Unknown error. Please try again'))
				)
			case 400:
				return Promise.reject(new ExchangeError(400, 'Invalid parameters'))
			case 404:
				return Promise.reject(new ExchangeError(404, 'Invalid email'))
			case 401:
				return Promise.reject(new ExchangeError(401, 'Invalid pin'))
			default:
				return Promise.reject(new ExchangeError(500, 'Unknown error. Please try again'))
			}
		})
}

export function transactions(id: string, pin: string): Promise<TransactionRecord> {
	return pin.length === 4
		? fetch(`https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/transactions?id=${id}&pin=${pin}`).then(response => {
			switch (response.status) {
			case 200:
				return response.json().then(json =>
					new TransactionRecord(json.from, json.to, json.amount, json.message, new Date) // fix date
				).catch(() =>
					Promise.reject(new ExchangeError(500, 'Unknown error. Please try again'))
				)
			case 400:
				return Promise.reject(new ExchangeError(400, 'Invalid parameters'))
			case 404:
				return Promise.reject(new ExchangeError(404, 'Invalid user ID'))
			case 401:
				return Promise.reject(new ExchangeError(401, 'Invalid pin'))
			default:
				return Promise.reject(new ExchangeError(500, 'Unknown error. Please try again'))
			}
		})
		: Promise.reject(new ExchangeError(400, '\'pin\' must be 4 characters long'))
}