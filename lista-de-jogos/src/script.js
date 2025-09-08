/** biome-ignore-all lint/correctness/noUnusedVariables: <*/
const ulElement = document.querySelector('#list')
const inputElement = document.querySelector('#input')
const formElement = document.querySelector('#form')

let gameList = ['Red Dead Redemption II']

const renderList = () => {
  ulElement.innerHTML = ''

  gameList.forEach((game, index) => {
    const li = document.createElement('li')
    li.classList.add('list__item')

    const button = document.createElement('button')
    button.classList.add('list__button')
    button.textContent = '❌'
    button.addEventListener('click', () => deleteGame(index))

    const title = document.createElement('p')
    title.classList.add('list__title')
    title.textContent = game

    li.appendChild(button)
    li.appendChild(title)
    ulElement.appendChild(li)
  })
}

const deleteGame = (index) => {
  gameList = gameList.filter((_, i) => i !== index)
  renderList()
}

const resetInput = () => {
  inputElement.value = ''
}

const handleAddGames = (e) => {
  e.preventDefault()
  const inputValue = inputElement.value.trim()

  if (!inputValue) {
    window.alert('Por favor, preencha algum jogo!')
    return
  }

  gameList.push(inputValue)
  resetInput()
  renderList()
}

formElement.addEventListener('submit', handleAddGames)

renderList()
