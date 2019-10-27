import axios from 'axios'

import ExchangeError from './ExchangeError'
import TransactionRecord from './TransactionRecord'
import User from './User'
import Transaction from './Transaction'
import { checkPin, cloudFunctionUrl } from './Helpers'

export { ExchangeError, Transaction, TransactionRecord, User }

export const users = (): Promise<User[]> =>
	axios.get(cloudFunctionUrl('users')).then(response =>
		response.data.map((json: any) =>
			new User(json.id, json.name, json.email, json.balance, json.reputation, json.pin)
		)
	)

export const transact = (pin: string, from: string, to: string, amount: number, message?: string | null): Promise<TransactionRecord> =>
	checkPin(pin)
		? axios.get(cloudFunctionUrl(`transact?pin=${pin}&from=${from}&to=${to}&amount=${amount}${message ? `&message=${message}` : ''}`)).then(response => {
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
		: Promise.reject(new ExchangeError(400, '`pin` must be 4 characters long and be composed of only integers'))

export const transactFromTransaction = (transaction: Transaction, pin: string): Promise<TransactionRecord> =>
	transact(pin, transaction.from, transaction.to, transaction.amount, transaction.message)

export const userWithId = (id: string, pin?: string | null): Promise<User> =>
	pin && !checkPin(pin)
		? Promise.reject(new ExchangeError(400, '`pin` must be 4 characters long and be composed of only integers'))
		: axios.get(cloudFunctionUrl(`user?id=${id}${pin ? `&pin=${pin}` : ''}`)).then(response => {
			const { status, data } = response
			switch (status) {
				case 200:
					return new User(data.id, data.name, data.email, data.balance, data.reputation, data.pin)
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

export const userWithEmail = (email: string, pin?: string | null): Promise<User> =>
	pin && !checkPin(pin)
		? Promise.reject(new ExchangeError(400, '`pin` must be 4 characters long and be composed of only integers'))
		: axios.get(cloudFunctionUrl(`user?email=${email}${pin ? `&pin=${pin}` : ''}`)).then(response => {
			const { status, data } = response
			switch (status) {
				case 200:
					return new User(data.id, data.name, data.email, data.balance, data.reputation, data.pin)
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

export const transactions = (id: string, pin: string): Promise<TransactionRecord[]> =>
	checkPin(pin)
		? axios.get(cloudFunctionUrl(`transactions?id=${id}&pin=${pin}`)).then(response => {
			const { status, data } = response
			switch (status) {
			case 200:
				return data.map((json: any) =>
					new TransactionRecord(json.from, json.to, json.amount, json.message, new Date(Date.parse(json.time)))
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
		: Promise.reject(new ExchangeError(400, '`pin` must be 4 characters long and be composed of only integers'))
