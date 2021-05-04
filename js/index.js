let searchForm = document.getElementById('github-form')
searchForm.addEventListener("submit", function(e){
  e.preventDefault()
  let searchParam = e.target.search.value
  // debugger
  console.log(searchParam)

  fetch(`https://api.github.com/search/users?q=${searchParam}`)
    .then(r => r.json())
    .then(results => {
      let uList = document.getElementById('user-list')
      for( var element in results["items"]){
        console.log(results)
        results["items"].forEach(el => {
          let uLi = document.createElement('LI')
          // console.log(el.login)
          uLi.innerText = el.login
          console.log(uLi)
          uLi.addEventListener("click", function(){
            fetch(el.repos_url)
            .then(r => r.json())
            .then(results => {
              for(var el1 in results){
              subLi = document.createElement("LI")
              // console.log(results[el1]["full_name"])
              subLi.innerHTML =  `<br><small>${results[el1]["full_name"]}</small>`
              uLi.append(subLi)
            }
            })
          })
          uList.append(uLi)
        })
      }
    })
})
