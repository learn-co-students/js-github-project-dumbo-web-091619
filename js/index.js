'use strict'
const githubForm = document.querySelector('#github-form')
githubForm.addEventListener('submit', (event) => {
  event.preventDefault()
  searchForUserWithName(event.target.search.value)
})

function searchForUserWithName (username) {
  makeGetRequestWithQuery(username)
    .then(displayAllUsers)
}

function makeGetRequestWithQuery (username) {
  return fetch(`https://api.github.com/search/users?q=${username}`) //eslint-disable-line
    .then(response => response.json())
    .then(message => message.items)
}

function displayAllUsers (users) {
  const userList = document.querySelector('#user-list')
  for (const user of users) {
    displayUserIn(user, userList)
  }
}

function displayUserIn (user, userList) {
  const userListItem = createAndAppendElementWithCallback('li', userList)
  createAndAppendElementWithCallback('a', userListItem, (element) => {
    element.innerText = user.login
    element.href = user.repos_url
    element.addEventListener('click', (event) => {
      event.preventDefault()
      getAllReposAt(event.target.href)
    })
  })
}

function getAllReposAt (repoURL) {
  fetch(repoURL).then(resp => resp.json()).then(displayAllRepos) // eslint-disable-line
}

function displayAllRepos (repos) {
  const repoList = document.querySelector('#repos-list')
  repoList.innerHTML = ''
  for (const repo of repos) {
    displayRepoIn(repo, repoList)
  }
}

function displayRepoIn (repo, listContainer) {
  createAndAppendElementWithCallback('li', listContainer, (element) => {
    element.innerText = repo.name
  })
}

function createAndAppendElementWithCallback (tagName, parent, callback) {
  const element = document.createElement(tagName)
  parent.append(element)
  if (callback !== undefined) {
    callback(element)
  }
  return element
}
