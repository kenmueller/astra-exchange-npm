export const checkPin = (pin: string | null | undefined): boolean =>
	typeof pin === 'string' && /^\d{4}$/.test(pin)

export const cloudFunctionUrl = (extension: string): string =>
	`https://us-central1-astra-exchange.cloudfunctions.net/${extension}`
