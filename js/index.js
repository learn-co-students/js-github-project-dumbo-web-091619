document.addEventListener('DOMContentLoaded', (event) => {
let searchBar = document.getElementById('search');
let githubForm = document.getElementById('github-form');
let searchButton = githubForm.querySelector('[type="submit"]')
let userList = document.getElementById('user-list')
let repoList = document.getElementById('repos-list')

//==========================================================
//add event listener to search button
searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    let searchQuery = searchBar.value
    getUserInfo(searchQuery)
})
//==========================================================
//get user info by username

function getUserInfo(username) {
    fetch(`https://api.github.com/search/users?q=${username}`)
	.then(response => response.json())
	.then((responseObject) => {
        renderObject(responseObject)
    })
}

function getRepoInfo(url) {
    fetch(url)
	.then(response => response.json())
	.then((responseObject) => {
        repoList.innerHTML = "";
        responseObject.forEach(repo => {
            let repoLi = document.createElement('li');
            let a = document.createElement('a')
            a.textContent = repo.name;
            a.setAttribute('href', `${repo.html_url}`);
            a.setAttribute('target', '_blank');
            repoLi.appendChild(a);

            repoList.append(repoLi)
        });
    })
}

function renderObject(obj) {
    let userLi = document.createElement('li')
    let userDiv = document.createElement('div')
    let linkUl = document.createElement('ul')
    let linkLi = document.createElement('li')
    let userObj = obj.items[0]
    let a = document.createElement('a')
    let repoUrl = userObj.repos_url



    a.textContent = "Github Link";
    a.setAttribute('href', `${userObj.html_url}`);
    a.setAttribute('target', '_blank');
    linkLi.appendChild(a);
    linkUl.appendChild(linkLi);

    userLi.textContent = `${userObj.login}`

    userLi.append(linkUl);
    userDiv.append(userLi);

    userDiv.addEventListener('click', (e) => {
        getRepoInfo(repoUrl);   
    })



    userList.append(userDiv);
}
//==========================================================









});
