const DOMElements = {
  form: document.querySelector('#form'),
  input: document.querySelector('#input'),
  name: document.querySelector('#name'),
  login: document.querySelector('#login'),
  id: document.querySelector('#id'),
  profile: document.querySelector('#profile__url'),
  avatar: document.querySelector('#avatar'),
  blog: document.querySelector('#blog'),
  location: document.querySelector('#location'),
  bio: document.querySelector('#bio'),
  repository: document.querySelector('#repo'),
  gists: document.querySelector('#gists'),
  followers: document.querySelector('#followers'),
  following: document.querySelector('#following'),
  created_at: document.querySelector('#created'),
}

const fetchUser = async (name) => {
  try {
    const URL = `https://api.github.com/users/${name}`
    const response = await fetch(URL)

    if (!response.ok) {
      throw new Error('Algo deu errado ao buscar os dados')
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    window.alert(
      'Algo deu errado ao buscar os dados, tente novamente mais tarde!'
    )
  }
}

const convertDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const renderData = ({
  login,
  name,
  id,
  html_url,
  avatar_url,
  blog,
  location,
  bio,
  public_repos,
  public_gists,
  followers,
  following,
  created_at,
}) => {
  DOMElements.name.textContent = name
  DOMElements.login.textContent = login
  DOMElements.id.textContent = id
  DOMElements.profile.textContent = html_url
  DOMElements.blog.textContent = blog
  DOMElements.location.textContent = location
  DOMElements.bio.textContent = bio
  DOMElements.repository.textContent = public_repos
  DOMElements.gists.textContent = public_gists
  DOMElements.followers.textContent = followers
  DOMElements.following.textContent = following
  DOMElements.blog.setAttribute('href', blog)
  DOMElements.profile.setAttribute('href', html_url)
  DOMElements.avatar.setAttribute('src', avatar_url)
  DOMElements.created_at.textContent = convertDate(created_at)
}

const validateInput = (inputValue) => {
  const normalizeValue = inputValue.trim().toLowerCase()
  const isTheStringEmpty = normalizeValue === ''

  if (isTheStringEmpty) {
    window.alert('O input está vazio, insira um nome!')
    throw new Error('O input está vazio, insira um nome!')
  }

  return normalizeValue
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const { input } = DOMElements
  const userData = await fetchUser(validateInput(input.value))
  renderData(userData)
}

DOMElements.form.addEventListener('submit', handleSubmit)
