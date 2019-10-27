export default class ExchangeError {
	status: number
	message: string
	
	constructor(status: number, message: string) {
		this.status = status
		this.message = message
	}
	
	static fromJSON = (json: any): ExchangeError | undefined => {
		if (typeof json !== 'object')
			return undefined
		const { status, message } = json
		return status === undefined || message === undefined
			? undefined
			: new ExchangeError(status, message)
	}
	
	static fromString = (string: string): ExchangeError | undefined =>
		ExchangeError.fromJSON(JSON.stringify(string))
	
	toJSON = (): { status: number, message: string } => ({
		status: this.status,
		message: this.message
	})
	
	toString = (): string =>
		JSON.stringify(this.toJSON())
}
