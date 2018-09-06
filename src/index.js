document.addEventListener('DOMContentLoaded', () => {
  const dogCollection = document.getElementById('table-body')
  const dogForm = document.getElementById('dog-form')

  fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => {
      data.forEach(dog => {
        let dogDiv = dogCard(dog)
        dogCollection.append(dogDiv)
      })
    })
  //Create Dog Form
  // dogForm.addEventListener('submit', (event) => {
  //   event.preventDefault()
  //   newDogName = document.querySelector('input[name="name"]')
  //   newDogBreed = document.querySelector('input[name="breed"]')
  //   newDogSex = document.querySelector('input[name="sex"]')
  //   fetch("http://localhost:3000/dogs", {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({
  //       name: newDogName.value,
  //       breed: newDogBreed.value,
  //       sex: newDogSex.value
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(data => dogCollection.appendChild(dogCard(data)))
  //   newDogName.value = ''
  //   newDogBreed.value = ''
  //   newDogSex.value = ''
  // })
  //Edit Dog
  dogCollection.addEventListener('click', (event) => {
    console.log(event)
    if (event.target.innerText == 'Edit') {
      let parent = event.target.parentNode.parentNode
      newDogName = document.querySelector('input[name="name"]')
      newDogBreed = document.querySelector('input[name="breed"]')
      newDogSex = document.querySelector('input[name="sex"]')
      newDogName.value = parent.children[0].innerText
      newDogBreed.value = parent.children[1].innerText
      newDogSex.value = parent.children[2].innerText
      dogForm.addEventListener('click', (event) => {
        fetch(`http://localhost:3000/dogs/${parent.getAttribute(`data-id`)}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: newDogName.value,
            breed: newDogBreed.value,
            sex: newDogSex.value
          })
        })

      })

    }
  })
})

function dogCard(dog) {
  let dogCard = document.createElement('tr')
  dogCard.setAttribute('data-id', dog.id)
  dogCard.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button>Edit</button></td>`
  return dogCard
}
