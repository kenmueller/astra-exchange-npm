export default class TransactionRecord {
	from: string
	to: string
	amount: number
	message: string
	time: Date
	
	constructor(from: string, to: string, amount: number, message: string, time: Date) {
		this.from = from
		this.to = to
		this.amount = amount
		this.message = message
		this.time = time
	}
}
