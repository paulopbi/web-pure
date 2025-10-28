const passwordText = document.querySelector('[data-password-text]')
const copyButton = document.querySelector('[data-copy-button]')
const sizeInput = document.querySelector('[data-size-input]')
const generateButton = document.querySelector('[data-generate-button]')

const getChars = () => {
  const lowercaseCheckbox = document.querySelector(
    '[data-lowercase-checkbox]'
  ).checked
  const uppercaseCheckbox = document.querySelector(
    '[data-uppercase-checkbox]'
  ).checked
  const numberCheckbox = document.querySelector(
    '[data-number-checkbox]'
  ).checked
  const symbolsCheckbox = document.querySelector(
    '[data-symbols-checkbox]'
  ).checked

  let lowercase = 'abcdefghijklmnopqrstuvwxyz'
  let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let numbers = '0123456789'
  let symbols = '!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`'
  let allChars = ''

  if (lowercaseCheckbox) allChars += lowercase
  if (uppercaseCheckbox) allChars += uppercase
  if (numberCheckbox) allChars += numbers
  if (symbolsCheckbox) allChars += symbols

  return allChars
}

const validateCheckboxes = (checked) => {
  if (!checked) {
    window.alert('Marque pelo menos 1 opção')
    return false
  }
  return true
}

const validateSize = (value) => {
  if (value < 4) {
    window.alert('Precisa ter no mínimo 4 caracteres')
    return false
  }

  if (value > 20) {
    window.alert('Precisa ter no máximo 20 caracteres')
    return false
  }
  return true
}

const generatePassword = () => {
  const inputSizeValue = Math.floor(sizeInput.value)
  const allChars = getChars()

  if (validateSize(inputSizeValue) && validateCheckboxes(allChars)) {
    let finalPassword = ''
    for (let i = 0; i < inputSizeValue; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length)
      finalPassword += allChars[randomIndex]
    }

    passwordText.textContent = finalPassword.trim()
    return
  }
}

const copyPasswordToClipboard = () => {
  const password = passwordText.textContent.trim()

  if (!password) {
    window.alert('Não tem nenhuma senha para copiar')
    return
  }

  navigator.clipboard.writeText(password)
  window.alert('Senha copiada!')
}

generateButton.addEventListener('click', generatePassword)
copyButton.addEventListener('click', copyPasswordToClipboard)
