export function checkPin(pin: string | null | undefined): boolean {
	return typeof pin === 'string' && pin.match(/^\d{4}$/) !== null
}

export function cloudFunctionUrl(extension: string): string {
	return `https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/${extension}`
}