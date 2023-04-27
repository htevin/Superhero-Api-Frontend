const SUPERHERO_TOKEN = "6447132595317871";
const BASEURL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;
const superHeroBtn = document.getElementById("getSuperHeroBtn");
const heroImage = document.getElementById("heroImage");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const heroName = document.getElementById("heroName");
const heroStats = document.getElementById("heroStats");


const getRandomSuperHero = (id) => {
  fetch(`${BASEURL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      const bugStat = getStatHTML(json)
      
      const img = json.image.url;
      const name = json.name;
      heroImage.innerHTML = `<h1>${name}</h1><img src='${img}'/>${bugStat}`;
    
    });
    
};


const emoji = {
  combat: '⚔️',
  durability: '🏋️‍♂️',
  intelligence: '🧠',
  power: '🔥',
  speed: '⚡',
  strength: '💪',

}

const getStatHTML = (character) => {
const getStats = Object.keys(character.powerstats).map(stat => {

   return `<p>${emoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
   
})
return getStats.join('')
}

const getSearchSuperHero = (name) => {
  fetch(`${BASEURL}/search/${name}`).then((response) =>
    response.json().then((json) => {
      const hero = json.results[0];
      
      
      
      heroImage.innerHTML = `<h1>${hero.name}</h1> <img src='${hero.image.url}' height=300 width=300/> ${GetSearchedHeroStat(json.results[0])}`;
      
    })
  );
};

const GetSearchedHeroStat = (character) => {
  const stats = Object.keys(character.powerstats).map( stat => {
  
    return `<p>${emoji[stat]}${stat}: ${character.powerstats[stat]}</p>`
   
   })
   return stats.join('')
}

superHeroBtn.onclick = () => {
  let randomHero;

  randomHero = Math.floor(Math.random() * 731) + 1;
  getRandomSuperHero(randomHero);
};
searchButton.onclick = () => getSearchSuperHero(searchInput.value);
