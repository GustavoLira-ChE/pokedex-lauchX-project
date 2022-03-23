/* this function takes a pokemon name or pokemon ID and a tag ID to add some information of the pokemon into se selection tag */
pokefetch = (pokemon, tagTarget) => {
    const url = "https://pokeapi.co/api/v2/pokemon/"
    let pokeUrl = url + pokemon
    fetch(pokeUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById(tagTarget).innerHTML = `
                <span class="infocard-img">
                    <a>
                        <img class="img-sprite" src="${data["sprites"]["front_default"]}" alt="">
                    </a>
                </span>
                <span class="infcard-data">
                    <small id="pokemonID${data["id"]}" value="${data["id"]}">Pokemon ID: ${data["id"]}</small>
                    <button class="name" onclick="showInPokedex(${tagTarget},${data["id"]})">${data["forms"][0]["name"]}</button>
                    <button onclick="showHidden('morePokemonInfo','pokedisplay',${data["id"]})">More Inf</button>
                    <small>
                        ${pokemonType(data)}
                    </small>
                <span>
            `
        })
}
/* This function takes a number of pokemons and the initial pokemon ID to get pokemon information and then using pokefetch() to find all the poikemon information */
listOfPokemonFetch = (limit, offset) => {
    url =  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let html = ""
            for(let i = 0; i < data["results"].length; i++){
                html += `
                <article id="infocard${i}" class="infocard">
                </article>
                `
            }
            document.getElementById("pokedisplay").innerHTML = html
            for(let j = 0; j < data["results"].length; j++){
                let tagtarget = "infocard" + j
                let pokemon = data["results"][j]["name"]
                pokefetch(pokemon,tagtarget)
            }
        })
}
pokemonType = (data) =>{
    let numberType = data["types"].length
    let types = ""
    for(let i = 0; i < numberType; i++){
        types += `
            <a href="" class="type ${data["types"][i]["type"]["name"]}">${data["types"][i]["type"]["name"]}</a>  `
    }
    return types
}
pokemonExtraInfo = (id,targetTag) =>{
    fetch("https://pokemon-db-json.herokuapp.com/")
        .then(response => response.json())
        .then(data => {
            let newID = parseInt(id) - 1
            let pkn = data[newID]
            let componentPokedex = `
            <div id="infoWrapper">
                <button onclick="showHidden('pokedisplay','morePokemonInfo')">X</button>
                <img src="${pkn["image"]}">
                <article>
                    <h3>About</h3>
                    <div>
                        <p>${pkn["height"]} m</p>
                        <p>Pokemon specie: ${pkn["species"]}</p>
                        <p>${pkn["weight"] } kg</p>
                    </div>
                    <p>${pkn["description"]}</p>
                </article>
                <article>
                    <h3>Base Stats</h3>
                    <table class="stats">
                        <tr>
                            <td>Attack</td>
                            <td>${pkn["baseStats"]["attack"][1]}</td>
                            <td><progress id="file" value="${pkn["baseStats"]["attack"][1]}" min="${pkn["baseStats"]["attack"][0]}" max="${pkn["baseStats"]["attack"][2]}"></progress></td>
                            <td>${pkn["baseStats"]["attack"][0]}</td>
                            <td>${pkn["baseStats"]["attack"][2]}</td>
                        </tr>
                        <tr>
                            <td>Defence</td>
                            <td>${pkn["baseStats"]["defence"][1]}</td>
                            <td><progress id="file" value="${pkn["baseStats"]["defence"][1]}" min="${pkn["baseStats"]["defence"][0]}" max="${pkn["baseStats"]["defence"][2]}"></progress></td>
                            <td>${pkn["baseStats"]["defence"][0]}</td>
                            <td>${pkn["baseStats"]["defence"][2]}</td>
                        </tr>
                        <tr>
                            <td>HP</td>
                            <td>${pkn["baseStats"]["hp"][1]}</td>
                            <td><progress id="file" value="${pkn["baseStats"]["hp"][1]}" min="${pkn["baseStats"]["hp"][0]}" max="${pkn["baseStats"]["hp"][2]}"></progress></td>
                            <td>${pkn["baseStats"]["hp"][0]}</td>
                            <td>${pkn["baseStats"]["hp"][2]}</td>
                        </tr>
                        <tr>
                            <td>Special Attack</td>
                            <td>${pkn["baseStats"]["specialAttack"][1]}</td>
                            <td><progress id="file" value="${pkn["baseStats"]["specialAttack"][1]}" min="${pkn["baseStats"]["specialAttack"][0]}" max="${pkn["baseStats"]["specialAttack"][2]}"></progress></td>
                            <td>${pkn["baseStats"]["specialAttack"][0]}</td>
                            <td>${pkn["baseStats"]["specialAttack"][2]}</td>
                        </tr>
                        <tr>
                            <td>Special Defence</td>
                            <td>${pkn["baseStats"]["specialDefence"][1]}</td>
                            <td><progress id="file" value="${pkn["baseStats"]["specialDefence"][1]}" min="${pkn["baseStats"]["specialDefence"][0]}" max="${pkn["baseStats"]["specialDefence"][2]}"></progress></td>
                            <td>${pkn["baseStats"]["specialDefence"][0]}</td>
                            <td>${pkn["baseStats"]["specialDefence"][2]}</td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td>${pkn["baseStats"]["speed"][1]}</td>
                            <td><progress id="file" value="${pkn["baseStats"]["speed"][1]}" min="${pkn["baseStats"]["speed"][0]}" max="${pkn["baseStats"]["speed"][2]}"></progress></td>
                            <td>${pkn["baseStats"]["speed"][0]}</td>
                            <td>${pkn["baseStats"]["speed"][2]}</td>
                        </tr>
                        <tr>
                            <td>Stats</td>
                            <td>Base</td>
                            <td></td>
                            <td>Min</td>
                            <td>Max</td>
                        </tr>
                    </table>
                    </article>
                    
            <div/>        
        `
            document.getElementById(targetTag).innerHTML = componentPokedex
        })
}

function showHidden(shown, hidden, id) {
    document.getElementById(shown).style.display='grid';
    document.getElementById(hidden).style.display='none';
    if(shown == 'morePokemonInfo'){
        pokemonExtraInfo(id,'morePokemonInfo')
    }
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
    });
    return false;
}
searchPokemon = () => {
    let pokemon = document.getElementById("pokemonIDNAME").value;
    pokefetch(pokemon.toLowerCase(), "pokeDexDisplay");
    fetch("https://pokeapi.co/api/v2/pokemon/"+pokemon.toLowerCase())
        .then(response => response.json())
        .then(data => {
            console.log(data["id"])
            document.getElementById("previousPkn").value = parseInt(data["id"]) - 1
            document.getElementById("nextPkn").value = parseInt(data["id"]) + 1
        })
    
}
afterBeforePokemon = (direction) => {
    let id
    if(direction == "before"){
        id = document.getElementById("previousPkn").value
        console.log(id)
        pokefetch(id, "pokeDexDisplay");
        document.getElementById("previousPkn").value = parseInt(id) - 1
        document.getElementById("nextPkn").value = parseInt(id) + 1
    } else if(direction == "after"){
        id = document.getElementById("nextPkn").value
        console.log(id)
        pokefetch(id, "pokeDexDisplay");
        document.getElementById("previousPkn").value = parseInt(id) - 1
        document.getElementById("nextPkn").value = parseInt(id) + 1
    }
}
showInPokedex = (tagTarget,id) =>{
    document.getElementById("pokeDexDisplay").innerHTML = tagTarget.innerHTML
    document.getElementById("previousPkn").value = parseInt(id) - 1
    document.getElementById("nextPkn").value = parseInt(id) + 1

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
    });
}


