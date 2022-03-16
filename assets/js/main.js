// Listen for submit event 

document.getElementById('loan-form').addEventListener('submit', calculateResults);



// Calculate Results Function

function calculateResults(e) {
	e.preventDefault()

	// Hide results if exists already
	document.getElementById('results').classList.add('d-none')

	// UI Variables
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayment  = parseFloat(years.value) * 12;

	// Compute monthly payment
	const x = Math.pow(1 + calculatedInterest, calculatedPayment);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayment).toFixed(2);
		totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

		// Show Laoding then hide and show results
		const loading = document.getElementById('loading')
		loading.classList.remove('d-none')

		setTimeout(() => {
			loading.classList.add('d-none')
			document.getElementById('results').classList.remove('d-none')
		}, 1000)


	} else {

		loading.classList.remove('d-none')

		setTimeout(() => {
			loading.classList.add('d-none')

			document.querySelector('.alert').classList.remove('d-none')
			setTimeout(() =>
				document.querySelector('.alert').classList.add('d-none')
			, 1500)
		}, 1000)

		
	}
}