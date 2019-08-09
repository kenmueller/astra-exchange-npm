import { transact } from './index'
import TransactionRecord from './TransactionRecord'

export default class Transaction {
	from: string
	to: string
	amount: number
	message: string | null | undefined

	constructor(from: string, to: string, amount: number, message?: string | null | undefined) {
		this.from = from
		this.to = to
		this.amount = amount
		this.message = message
	}

	send(pin: string): Promise<TransactionRecord> {
		return transact(pin, this.from, this.to, this.amount, this.message)
	}
}