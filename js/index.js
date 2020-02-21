let gitHubForm = document.getElementById('github-form')
let userUl = document.getElementById('user-list')
let repoUl = document.getElementById('repos-list')

gitHubForm.addEventListener('submit',e =>{
  e.preventDefault()
  let userInput = e.target.search.value
  fetch(`https://api.github.com/search/users?q=${userInput}`)
  .then(res => res.json())
  .then(response =>{
    // console.log(response)
    //   let userAvatar = response.avatar_url   
    response.items.forEach(user =>{
      let userLi = document.createElement('li')
      let userImg = document.createElement('img')
      let userName = document.createElement('h2')
      let aTag = document.createElement('a') // create 'a' tag

      userImg.src = user.avatar_url // set 'src' to image url
      userName.innerText = user.login
      aTag.href = user.html_url // set 'href' to the url
      aTag.innerText = "Click for more"

      userLi.id = user.id

      userLi.append(userName, aTag, userImg)
      userUl.append(userLi)

      userLi.addEventListener("click", event => {
        fetch(`https://api.github.com/users/${user.login}/repos`)
        .then(r => r.json())
        .then(res => {
            res.forEach(repo => {
                
            })
        })
      })
    })
  })    
})

