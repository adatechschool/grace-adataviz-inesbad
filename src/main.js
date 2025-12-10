import './style.css'

let offset = 0
const personCards = []

// Conteneur principal
const div = document.getElementById("app")



// Barre de recherche
const searchBar = document.createElement("input")
searchBar.type = "search"
searchBar.placeholder = "ex : Guy Drut"
div.appendChild(searchBar)

const btn = document.createElement("button")
btn.textContent = "Rechercher"
div.appendChild(btn)



// Conteneur pour les cards qui stocke toutes les cards des conseilleirs. 
//Cela me eprmet de les organiser avec CSS
const cardsContainer = document.createElement("div")
cardsContainer.id = "cards-container"
div.appendChild(cardsContainer)



// Bouton "Charger plus"
const loadBtnMore = document.createElement("button")
loadBtnMore.className = "load-more"
loadBtnMore.textContent = "Charger plus"
div.appendChild(loadBtnMore)



// Fonction fetch API
async function fetchApi() {
  try {
    const limit = 20
    const response = await fetch(`https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-conseillers-de-paris-de-1977-a-2014/records?limit=${limit}&offset=${offset}`);
    const apiReturn = await response.json();

    for (let i = 0; i < apiReturn.results.length; i++) {
      const data = apiReturn.results[i];

      // Création de div pour chaque conseillet qui sera stylisée comme une card
      const card = document.createElement("div")
      card.className = "card-person"

      // Infos principales : (sécurité pour éviter les erreurs si l’image n’existe pas.)
      const list = document.createElement("li")
      list.innerHTML = `
       <img class="photo" src="${data.image?.url || ''}"/> 
        <h2 class="nom">${data.prenom} ${data.nom}</h2> 
        <h3> Mandature : ${data.mandature}</h3>
        <h3> Secteur : ${data.secteur}</h3>
        <h3> Élue le : ${data.elu_e_le}</h3>
      `
      card.appendChild(list)



      // Infos supplémentaires cachées
      const listButton = document.createElement("li")
      listButton.innerHTML = `
        <h3> Né le : ${data.ne_e_le} à ${data.ville_de_naissance}</h3>
        <h3> Groupe politique : ${data.groupe_politique}</h3>
        <h3> Fonction : ${data.groupe_politique_fonctions}</h3>
        <h3> Profession : ${data.profession}</h3>
      `
      listButton.style.display = "none"
      card.appendChild(listButton)


      // Bouton "Voir plus / Voir moins"
      const button = document.createElement("button")
      button.textContent = "Voir plus"
      card.appendChild(button)

      button.addEventListener("click", () => {
        if (listButton.style.display === "none") {
          listButton.style.display = "block"
          button.textContent = "Voir moins"
        } else {
          listButton.style.display = "none"
          button.textContent = "Voir plus"
        }
      })

      // Ajouter la card au conteneur, 
      cardsContainer.appendChild(card)

      // Stocker la card pour la recherche, Affiche la card sur la page.
      personCards.push(card)
    }

    // Recherche en direct : Dès que l’utilisateur tape dans la barre, le code filtre les cards par nom.

    searchBar.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase()
      personCards.forEach(card => {
        const name = card.querySelector(".nom").textContent.toLowerCase()
        if (name.includes(value)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    });

  } catch (error) {
    console.log(error)
  }
}

// Clic sur "Charger plus"
loadBtnMore.addEventListener("click", async () => {
  offset += 20      // Pour récuperer les 20
  await fetchApi() // Appelle fetch api pour ajouter les noiuvelles cards
})

// Premier chargement
fetchApi()
