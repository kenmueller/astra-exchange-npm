import { userWithId, transactions } from '.'
import TransactionRecord from './TransactionRecord'
import { checkPin } from './Helpers'

export default class User {
	id: string
	name: string
	email: string
	balance: number
	reputation: number
	pin?: string
	hasPrivateData: boolean
	
	constructor(id: string, name: string, email: string, balance: number, reputation: number, pin?: string | null) {
		this.id = id
		this.name = name
		this.email = email
		this.balance = balance
		this.reputation = reputation
		this.pin = checkPin(pin) ? pin || undefined : undefined
		this.hasPrivateData = this.pin !== undefined
	}

	transactions = (): Promise<TransactionRecord[] | undefined> =>
		this.pin ? transactions(this.id, this.pin) : Promise.resolve(undefined)

	reload = (): Promise<User> =>
		userWithId(this.id, this.pin).then(user => {
			this.name = user.name
			this.email = user.email
			this.balance = user.balance
			this.reputation = user.reputation
			return this
		})
}
