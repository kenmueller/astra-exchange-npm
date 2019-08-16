/**
 * An error that is thrown from an `astra-exchange` function
 */
export class ExchangeError {
	/**
	 * The error code
	 * 
	 * @type `number`
	 */
	status: number

	/**
	 * The error message
	 * 
	 * @type `string`
	 */
	message: string

	/**
	 * @returns A new `ExchangeError` from JSON
	 * 
	 * @param json Should be of type `{ status: number, message: string }`. If invalid, returns `null`
	 */
	static fromJSON(json: any): ExchangeError | undefined

	/**
	 * @returns A new `ExchangeError` from string encoded JSON
	 * 
	 * @param string String encoded JSON of type `{ status: number, message: string }`. If invalid, returns `null`
	 */
	static fromString(string: string): ExchangeError | undefined

	/**
	 * Converts an `ExchangeError` to JSON
	 * 
	 * @returns JSON of type `{ status: number, message: string }`
	 */
	toJSON(): { status: number, message: string }

	/**
	 * Converts an `ExchangeError` to string encoded JSON
	 * 
	 * @returns String encoded JSON of type `{ status: number, message: string }`
	 */
	toString(): string
}

// TODO: index.ts

/**
 * A `Transaction` that can be used to send transactions and reuse them
 */
export class Transaction {
	/**
	 * The UID of the user that's sending the transaction
	 * 
	 * @type `string`
	 */
	from: string

	/**
	 * The UID of the user that's receiving the transaction
	 * 
	 * @type `string`
	 */
	to: string

	/**
	 * The transaction amount. Can be a decimal, cannot be negative or zero
	 * 
	 * @type `number`
	 */
	amount: number

	/**
	 * The transaction message. Can be `null` or `undefined`
	 * 
	 * @type `string` or `null` or `undefined`
	 */
	message?: string | null | undefined

	/**
	 * Sends the transaction to the recipient
	 * 
	 * @returns A new `TransactionRecord`
	 * 
	 * @param pin A pin of type `string` that must be 4 characters from 0-9
	 */

	send(pin: string): Promise<TransactionRecord>
}

/**
 * A record of a transaction after it was sent
 */
export class TransactionRecord {
	/**
	 * The UID of the user that sent the transaction
	 * 
	 * @type `string`
	 */
	from: string

	/**
	 * The UID of the user that received the transaction
	 * 
	 * @type `string`
	 */
	to: string

	/**
	 * The transaction amount
	 * 
	 * @type `number`
	 */
	amount: number

	/**
	 * The transaction message. Can be an empty string
	 * 
	 * @type `string`
	 */
	message: string

	/**
	 * The time that the transaction was received
	 * 
	 * @type `Date`
	 */
	time: Date
}

/**
 * An Astra Exchange user. Can store public or private data
 */
export class User {
	/**
	 * The user's UID (A unique identifier for every user)
	 * 
	 * @type `string`
	 */
	id: string

	/**
	 * The user's name (unique)
	 * 
	 * @type `string`
	 */
	name: string

	/**
	 * The user's email (unique)
	 * 
	 * @type `string`
	 */
	email: string

	/**
	 * The user's balance (can be a decimal)
	 * 
	 * @type `number`
	 */
	balance: number

	/**
	 * The user's reputation (integer only)
	 * 
	 * @type `number`
	 */
	reputation: number

	/**
	 * The user's pin (4 digit long string of integers)
	 * 
	 * Set to `undefined` if you only retrieved the user's public data
	 * 
	 * Examples:
	 * - `0427`
	 * - `1234`
	 * - `8789`
	 * 
	 * @type `string` or `undefined`
	 */
	pin?: string | undefined

	/**
	 * Set to `true` if this user was retrieved with its private data (includes `pin`)
	 * 
	 * @type `boolean`
	 */
	hasPrivateData: boolean

	/**
	 * **Mutating function**
	 * 
	 * Reloads the user from the database, modifying the current `User` and returning itself as a promise
	 * 
	 * @returns A `Promise` containing itself, but updated.
	 * 
	 * If the user changed their authentication info, like their `pin`, this function returns a `Promise.reject` of type `ExchangeError`
	 */
	reload(): Promise<User>
}