const form = document.querySelector('[data-form]')
const input = document.querySelector('[data-input]')
const ul = document.querySelector('[data-ul-list]')

const tasks = []

const resetInput = () => {
  input.value = ''
}

const clearDom = () => {
  ul.innerHTML = ''
}

const showEmptyListMessage = () => {
  const isTheListEmpty = tasks.length === 0
  if (isTheListEmpty) {
    const li = document.createElement('li')
    li.textContent = 'Sua lista está vazia, digite algo.'
    li.classList.add('empty')

    ul.append(li)
  }
}

const deleteTask = (index) => {
  tasks.splice(index, 1)
  render()
}

const toggleCompletedState = (element) => {
  element.classList.toggle('completed')
}

const render = () => {
  clearDom()
  showEmptyListMessage()

  tasks.forEach((task, index) => {
    const li = document.createElement('li')

    const span = document.createElement('span')
    span.textContent = task

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'x'

    li.appendChild(span)
    li.appendChild(deleteBtn)
    ul.appendChild(li)

    deleteBtn.addEventListener('click', () => deleteTask(index))
    li.addEventListener('click', () => toggleCompletedState(span))
  })
}

const addTask = (task) => {
  tasks.push(task)
  resetInput()
  render()
}

const inputErrorMessage = () => {
  clearDom()

  const li = document.createElement('li')
  li.textContent = 'O campo está vazio, preencha com algum valor!'
  li.classList.add('error')

  ul.append(li)
}

const handleSubmit = (e) => {
  e.preventDefault()
  const inputValue = input.value.trim()

  if (!inputValue) {
    inputErrorMessage()
    return
  }

  addTask(inputValue)
}

showEmptyListMessage()

form.addEventListener('submit', handleSubmit)
