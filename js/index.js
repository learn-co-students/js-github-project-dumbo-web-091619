//1. The`index.html` file has a form with a search input.When the form is
//submitted, it should take the value of the input and search GitHub for user
//   matches using the[User Search Endpoint](#user - search - endpoint).
const searchForm = document.querySelector("#github-form")
const userList = document.querySelector("#user-list")
const reposList = document.querySelector("#repos-list")

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchField = event.target.search

    fetch(`https://api.github.com/search/users?q=${searchField.value}`)
    .then(r => r.json())
    .then(searchResultObj => {
       searchResultObj.items.forEach(searchResult => {
        //    debugger
           turnJSONtoHTML(searchResult)
       })

//3. Clicking on one of these users should send a request to the
//[User Repos Endpoint](#user - repos - endpoint) and return data about all the
//repositories for that user.
        const users = document.querySelectorAll(".user")
        users.forEach(user => {
            user.addEventListener("click", (event) => {
                fetch(`https://api.github.com/users/${user.dataset.username}/repos`)
                .then(r => r.json())
                .then(userResultObj => {
                    userResultObj.forEach(userResult => {
                        turnRepoJSONtoHTML(userResult)
                        // debugger
                    })
                })
            })
        })
        
       
    })
    searchForm.reset()

})
//2. Using the results of the search, display information about the users to the
//page. (You might include showing their username, avatar and a link to their
//   profile.)
function turnJSONtoHTML(JSONitem) {
    let usernameLI = document.createElement("li")
    let avatarLI = document.createElement("li")
    let avatarImg = document.createElement("img")
    let linkLI = document.createElement("li")
    let userBreak = document.createElement("br")

    usernameLI.innerText = `User: ${JSONitem.login}`
    usernameLI.className = "user"
    usernameLI.dataset.username = JSONitem.login
    avatarLI.innerText = "Avatar:"
    avatarImg.src = JSONitem.avatar_url
    linkLI.innerHTML = `Link: <a href="${JSONitem.html_url}" target="_blank">${JSONitem.html_url}</a>`

    userList.append(usernameLI, userBreak, avatarLI, userBreak, avatarImg, userBreak, linkLI, userBreak)
    // debugger
}

//4. Using the response from the Users Repos Endpoint, display all the
//repositories for that user on the page.
function turnRepoJSONtoHTML(userResult) {
    let repoLI = document.createElement("li")
    repoLI.innerHTML = `<a href="${userResult.html_url}" target="_blank">${userResult.html_url}</a>`
    reposList.append(repoLI)
}