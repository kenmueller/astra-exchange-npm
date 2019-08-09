export default class ExchangeError {
	status: number
	message: string

	constructor(status: number, message: string) {
		this.status = status
		this.message = message
	}

	fromJSON(json: any): ExchangeError | undefined {
		if (typeof json !== 'object')
			return undefined
		const status = json.status
		const message = json.message
		return status === undefined || message === undefined
			? undefined
			: new ExchangeError(status, message)
	}

	toJSON(): { status: number, message: string } {
		return { status: this.status, message: this.message }
	}
}