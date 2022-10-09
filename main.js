const cardPage = document.querySelector(`.cardholder`)
const completedPage = document.querySelector(`.completed`)

const displayCvc = document.querySelector(`.card-box__cvc`)
const displayCardNumber = document.querySelector(`.card-box__number`)
const displayName = document.querySelector(`.card-box__name`)
const displayMM = document.querySelector(`.card-box__mm`)
const displayYY = document.querySelector(`.card-box__yy`)

const formName = document.querySelector(`#name`)
const formNumber = document.querySelector(`#number`)
const formMM = document.querySelector(`#mm`)
const formYY = document.querySelector(`#yy`)
const formCvc = document.querySelector(`#cvc`)
const formInputs = document.querySelectorAll(`.cardholder__input`)

// const errorName = document.querySelector(`.error--name`)
// const errorCardNumber = document.querySelector(`.error--card-number`)
// const errorDate = document.querySelector(`.error--date`)
// const errorCvc = document.querySelector(`.error--cvc`)

const submitBtn = document.querySelector(`.cardholder__btn`)
const completedBtn = document.querySelector(`.completed__btn`)

const regexLetters = new RegExp(/^[A-Za-z ąńćżźóśł]*$/)
const regexNumbers = new RegExp(/^([0-9]{4})+ ([0-9]{4})+ ([0-9]{4})+ ([0-9]{4})*$/)
const regexNumbersShort = new RegExp(/^[0-9]*$/)

//shows error
const showError = (input, msg) => {
	const errorField = document.querySelector(`.error--${input.id}`)
	errorField.classList.add(`show`)
	errorField.textContent = msg
}

//clears errors
const clearError = input => {
	const errorField = document.querySelector(`.error--${input.id}`)
	errorField.classList.remove(`show`)
}

//checks if form fields are empty
const checkForm = input => {
	if (input.value.length > 0) {
		return true
	} else {
		return false
	}
}
//counts errors when clicking confirm btn
const checkError = () => {
	const allInputs = document.querySelectorAll(`.show`)
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains(`error`)) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		completedPage.classList.add(`active`)
		cardPage.classList.remove(`active`)
		clearValue([formName, formNumber, formMM, formYY, formCvc])
	}
}
//Clean form fields
const clearValue = input => {
	input.forEach(el => {
		el.value = ''
	})
}

//updates data displayed on cards
const updateDisplayData = input => {
	const displayInput = document.querySelector(`.card-box__${input.id}`)
	// if (input.id == `number`) {

	// 	displayInput.textContent = cardNumber
	// } else {
	displayInput.textContent = input.value
	// }
}
//checks name for correctness
formName.addEventListener(`keyup`, () => {
	if (checkForm(formName)) {
		if (regexLetters.test(formName.value)) {
			if (formName.value.length > 2) {
				clearError(formName)
				updateDisplayData(formName)
			} else {
				showError(formName, `Must be at least 3 characters!`)
			}
		} else {
			showError(formName, `Can't input numbers!`)
		}
	} else {
		showError(formName, `Cant be blank!`)
	}
})

formNumber.addEventListener(`keyup`, () => {
	if (checkForm(formNumber)) {
		if (regexNumbers.test(formNumber.value)) {
			updateDisplayData(formNumber)
			if (formNumber.value.length == 19) {
				clearError(formNumber)
			} else {
				showError(formNumber, 'Wrong card number!')
			}
		} else {
			showError(formNumber, `Use correct format! xxxx xxxx xxxx xxxx`)
		}
	} else {
		showError(formNumber, `Cant be blank!`)
	}
})

formMM.addEventListener(`keyup`, () => {
	if (checkForm(formMM)) {
		updateDisplayData(formMM)
		if (regexNumbersShort.test(formMM.value)) {
			if (formMM.value.length == 2 && formYY.value > 0 && formMM.value < 13) {
				clearError(formMM)
			} else {
				showError(formMM, 'Wrong date!')
			}
		} else {
			showError(formMM, 'Cant use letters!')
		}
	} else {
		showError(formMM, `Cant be blank!`)
	}
})

formYY.addEventListener(`keyup`, () => {
	if (checkForm(formYY)) {
		updateDisplayData(formYY)
		if (regexNumbersShort.test(formYY.value)) {
			if (formYY.value.length == 2 && formYY.value >= 0) {
				clearError(formYY)
			} else {
				showError(formYY, 'Wrong date!')
			}
		} else {
			showError(formYY, 'Cant use letters!')
		}
	} else {
		showError(formYY, `Cant be blank!`)
	}
})

formCvc.addEventListener(`keyup`, () => {
	if (checkForm(formCvc)) {
		updateDisplayData(formCvc)
		if (regexNumbersShort.test(formCvc.value)) {
			if (formCvc.value.length == 3) {
				clearError(formCvc)
			} else {
				showError(formCvc, 'Wrong CVC!')
			}
		} else {
			showError(formCvc, 'Cant use letters!')
		}
	} else {
		showError(formCvc, `Cant be blank!`)
	}
})

//action on submit btn
submitBtn.addEventListener(`click`, e => {
	e.preventDefault()
	formInputs.forEach(input => {
		if (!checkForm(input)) {
			showError(input, `Cant be blank!`)
		}
	})
	checkError()
})

//finishing the whole process and starting over
completedBtn.addEventListener(`click`, () => {
	completedPage.classList.remove(`active`)
	cardPage.classList.add(`active`)
	displayCvc.textContent = `000`
	displayCardNumber.textContent = `0000 0000 0000 0000`
	displayMM.textContent = `00`
	displayYY.textContent = `00`
	displayName.textContent = `Jane Appleseed`
})
