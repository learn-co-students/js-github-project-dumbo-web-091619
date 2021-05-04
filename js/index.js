document.addEventListener("DOMContentLoaded", () => {

    // grab elements
    const searchForm = document.querySelector("#github-form")
    const rolodex = document.querySelector("#user-list")
    const allTheRepos = document.querySelector("#repos-list")

    function displayResult(searchResult){
        //  2. Using the results of the search, display information about the users to the
        //     page. (You might include showing their username, avatar and a link to their
        //     profile.)
                let userAvatar = document.createElement("img")
                userAvatar.src = searchResult.items[0].avatar_url
                //  3. Clicking on one of these users should send a request to the
                //     [User Repos Endpoint](#user-repos-endpoint) and return data about all the
                //     repositories for that user.
                userAvatar.addEventListener("click", () => {
                //  4. Using the response from the Users Repos Endpoint, display all the
                //     repositories for that user on the page.
                    console.log(`https://api.github.com/users/${searchResult.items[0].login}/repos`)
                    fetch(`https://api.github.com/users/${searchResult.items[0].login}/repos`)
                    .then(response => response.json())
                    .then(repoResults =>{
                        // success test
                        console.log("wow such repos!")
                        // iterate through repos
                        for (let repo of repoResults){
                            // success test
                            console.log(repo.name)
                            // add each repository name to a new <li>
                            let repoLi = document.createElement("li")
                            repoLi.innerText = repo.name
                            // add each new repo <li> to the <ul>
                            allTheRepos.appendChild(repoLi)
                        }
                    })
                })
                // append the user photo to the user info display div
                rolodex.appendChild(userAvatar)
                // make link to github profile
                let userLink = document.createElement("a")
                userLink.href = searchResult.items[0].html_url
                // give it the display text of the user username
                let userLinkUrl = document.createTextNode(searchResult.items[0].login)
                userLink.appendChild(userLinkUrl)
                // append the user profile link to the user info display div
                rolodex.appendChild(userLink)
            }

//     1. The `index.html` file has a form with a search input. When the form is
//     submitted, it should take the value of the input and search GitHub for user
//     matches using the [User Search Endpoint](#user-search-endpoint).
    searchForm.addEventListener("submit", (event) =>{
        // prevent default submission behavior so we can grab that value
        event.preventDefault()
        // get that form value
        let searchResult = event.target.search.value
        // success check
        console.log(searchResult)
        console.log(`https://api.github.com/search/users?q=${searchResult}`)
        // fetch time bb
        fetch(`https://api.github.com/search/users?q=${searchResult}`)
        .then(response => response.json())
        .then(parsedResult => {
            // success check
            console.log(parsedResult)
            displayResult(parsedResult)
        })
    })
})