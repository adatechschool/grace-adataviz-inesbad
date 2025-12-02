import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

// Fetch

async function fetchApi() {
  try {
    const response = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-conseillers-de-paris-de-1977-a-2014/records?limit=20');
    const apiReturn = await response.json();
    console.log(apiReturn);
    //  return apiReturn;

     const div = document.getElementById("app")

     for (let i =0; i < apiReturn.results.length; i++){

const list = document.createElement("li")
list.innerHTML = `  <img src="${apiReturn.results[i].image.url}">
                  <h2> Prénom : ${apiReturn.results[i].prenom} ${apiReturn.results[i].nom}</h2> 
                 <h3> Mandature :${apiReturn.results[i].mandature}</h3>
                  <h3> Secteur : ${apiReturn.results[i].secteur}</h3>
                  <h3> Élue le : ${apiReturn.results[i].elu_e_le}</h3>`

div.appendChild(list)

     } 
     
    }
    
    catch(error){
    console.log(error)

  }
}


fetchApi()
 