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
}