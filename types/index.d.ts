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

/**
 * @returns A `Promise` containing an array of type `User[]`
 * 
 * **NOTE:** Each user only contains public data. If you want private data, you must get each user individually using `userWithId` or `userWithEmail`
 * 
 * Returns an `ExchangeError` if an error occurs
 */
export function users(): Promise<User[]>

/**
 * Sends a transaction
 * 
 * @param pin The user's pin. Of type `string` that must be 4 integers from 0-9
 * @param from The UID of the user that's sending the transaction. Of type `string`
 * @param to The UID of the user that's receiving the transaction. Of type `string`
 * @param amount The transaction amount. Can be a decimal, cannot be negative or zero. Of type `number`
 * @param message The transaction message. Of type `string`, but it can be `null`, `undefined`, or just left blank
 * 
 * @returns A `Promise` containing a `TransactionRecord`
 * 
 * Returns an `ExchangeError` if an error occurs
 */
export function transact(pin: string, from: string, to: string, amount: number, message?: string | null): Promise<TransactionRecord>

/**
 * Sends a transaction from a `Transaction` object with a `pin`
 * 
 * @param transaction The `Transaction` object that will be sent
 * @param pin The user's pin. Of type `string` that must be 4 integers from 0-9
 * 
 * @returns A `Promise` containing a `TransactionRecord`
 * 
 * Returns an `ExchangeError` if an error occurs
 */
export function transactFromTransaction(transaction: Transaction, pin: string): Promise<TransactionRecord>

/**
 * Retrieves a `User` with an ID and a `pin` (optional)
 * 
 * If the pin is `null`, `undefined`, or left blank, the function only returns public data. If the pin is correct, private data is included as well
 * 
 * @param id The user's UID. Of type `string`
 * @param pin The user's pin. Of type `string` that must be 4 integers from 0-9, `null`, or `undefined`
 * 
 * Returns an `ExchangeError` if an error occurs
 */
export function userWithId(id: string, pin?: string | null): Promise<User>

/**
 * Retrieves a `User` with an `email` and a `pin` (optional)
 * 
 * If the pin is `null`, `undefined`, or left blank, the function only returns public data. If the pin is correct, private data is included as well
 * 
 * @param email The user's email. Of type `string`
 * @param pin The user's pin. Of type `string` that must be 4 integers from 0-9, `null`, or `undefined`
 * 
 * Returns an `ExchangeError` if an error occurs
 */
export function userWithEmail(email: string, pin?: string | null): Promise<User>

/**
 * Retrieves all the transactions that a user has ever made
 * 
 * @param id The user's UID. Of type `string`
 * @param pin The user's pin. Of type `string` that must be 4 integers from 0-9
 * 
 * @returns A `Promise` containing an array of type `TransactionRecord[]`
 * 
 * Returns an `ExchangeError` if an error occurs
 */
export function transactions(id: string, pin: string): Promise<TransactionRecord[]>

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
	 * @param pin A pin of type `string` that must be 4 integers from 0-9
	 * 
	 * @returns A new `TransactionRecord`
	 * 
	 * Returns an `ExchangeError` if an error occurs
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
	 * Retrieves all the transactions that this user has ever made
	 * 
	 * This function is the same as calling `exchange.transactions` with the user's `id` and `pin`
	 * 
	 * @returns If `pin` is `undefined`, then a `Promise` containing `undefined`. Otherwise, a `Promise` constaining an array of type `TransactionRecord[]`
	 * 
	 * Returns an `ExchangeError` if an error occurs
	 */
	transactions(): Promise<TransactionRecord[] | undefined>

	/**
	 * **Mutating function**
	 * 
	 * Reloads the user from the database, modifying the current `User` and returning itself as a promise
	 * 
	 * @returns A `Promise` containing itself, but updated.
	 * 
	 * If the user changed their authentication info, like their `pin`, this function returns a `Promise.reject` of type `ExchangeError`
	 * 
	 * Returns an `ExchangeError` if an error occurs
	 */
	reload(): Promise<User>
}