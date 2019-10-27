import { transactFromTransaction } from '.'
import TransactionRecord from './TransactionRecord'

export default class Transaction {
	from: string
	to: string
	amount: number
	message?: string | null
	
	constructor(from: string, to: string, amount: number, message?: string | null) {
		this.from = from
		this.to = to
		this.amount = amount
		this.message = message
	}
	
	send = (pin: string): Promise<TransactionRecord> =>
		transactFromTransaction(this, pin)
}
