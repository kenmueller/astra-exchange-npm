module.exports = () => {
	this.users = completion =>
		fetch('https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/users').then(response =>
			response.json().then(json =>
				completion(json)
			)
		)

	this.transact = (pin, from, to, amount, message, success, failure) =>
		fetch(`https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/transact?pin=${pin}&from=${from}&to=${to}&amount=${amount}${message ? `&message=${message}` : ''}`).then(response => {
			switch (response.status) {
				case 200:
					success()
					break
				case 400:
					failure(400, 'Invalid parameters')
					break
				case 404:
					failure(404, 'Invalid user ID')
					break
				case 403:
					failure(403, 'Insufficient balance')
					break
				case 401:
					failure(401, 'Invalid pin')
					break
				default:
					failure(500, 'Unknown error. Please try again')
			}
		})

	this.userWithId = (id, pin, success, failure) =>
		fetch(`https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/user?id=${id}${pin ? `&pin=${pin}` : ''}`).then(response => {
			switch (response.status) {
				case 200:
					return response.json().then(json =>
						success(json)
					)
				case 400:
					failure(400, 'Invalid parameters')
					break
				case 404:
					failure(404, 'Invalid user ID')
					break
				case 401:
					failure(401, 'Invalid pin')
					break
				default:
					failure(500, 'Unknown error. Please try again')
			}
		})

	this.userWithEmail = (email, pin, success, failure) =>
		fetch(`https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/user?email=${email}${pin ? `&pin=${pin}` : ''}`).then(response => {
			switch (response.status) {
				case 200:
					return response.json().then(json =>
						success(json)
					)
				case 400:
					failure(400, 'Invalid parameters')
					break
				case 404:
					failure(404, 'Invalid email')
					break
				case 401:
					failure(401, 'Invalid pin')
					break
				default:
					failure(500, 'Unknown error. Please try again')
			}
		})

	this.transactions = (id, pin, success, failure) =>
		fetch(`https://cors-anywhere.herokuapp.com/https://us-central1-astra-exchange.cloudfunctions.net/transactions?id=${id}&pin=${pin}`).then(response => {
			switch (response.status) {
				case 200:
					return response.json().then(json =>
						success(json)
					)
				case 400:
					failure(400, 'Invalid parameters')
					break
				case 404:
					failure(404, 'Invalid user ID')
					break
				case 401:
					failure(401, 'Invalid pin')
					break
				default:
					failure(500, 'Unknown error. Please try again')
			}
		})

	return this
}