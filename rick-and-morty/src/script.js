const cardContainerElement = document.querySelector('#card__container')
const buttonElement = document.querySelector('#button')

let page = 1
const getApiData = async (page) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    )

    if (!response.ok) {
      throw new Error('Não foi possível carregar os personagens')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    window.alert('Não foi possível carregar os dados')
    return { results: [] }
  }
}

const fetchAndRenderCharacters = async () => {
  const { results: characters } = await getApiData(page)
  characters.forEach(renderCard)
}

const renderCard = ({ image, name, status, gender, species }) => {
  const div = document.createElement('div')
  div.classList.add('card')
  div.innerHTML += `
    <div class="card__image-container">
            <img
              src="${image}"
              alt="${name}"
              class="card__image"
            />
          </div>
          <div>
            <h2 class="card__title">${name}</h2>
            <ul class="card__content">
              <li>
                <p class="card__status">${status}</p>
              </li>
              <li>
                <p class="card__gender">${gender}</p>
              </li>
              <li>
                <p class="card__species">${species}</p>
              </li>
            </ul>
          </div>
    `

  cardContainerElement.appendChild(div)
}

const handleClick = () => {
  ++page
  fetchAndRenderCharacters()
}

buttonElement.addEventListener('click', handleClick)

fetchAndRenderCharacters()
