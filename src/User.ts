export default class User {
	id: string
	name: string
	email: string
	balance: number
	reputation: number
	pin?: number
	hasPrivateData: boolean

	constructor(id: string, name: string, email: string, balance: number, reputation: number, pin?: number) {
		this.id = id
		this.name = name
		this.email = email
		this.balance = balance
		this.reputation = reputation
		this.pin = pin
		this.hasPrivateData = pin !== undefined
	}
}