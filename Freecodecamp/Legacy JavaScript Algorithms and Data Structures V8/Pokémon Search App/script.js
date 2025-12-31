function search() {
  const input = document.getElementById("search-input").value;
  const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input.toLowerCase()}`;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        alert("Pokémon not found");
      }
      return response.json(); // Parse the JSON from the response
    })
    .then(function (data) {
      document.getElementById("pokemon-name").innerHTML =
        data.name.toUpperCase();
      document.getElementById("pokemon-id").innerHTML = "#" + data.id;
      document.getElementById("weight").innerHTML = "weight: " + data.weight;
      document.getElementById("height").innerHTML = "height: " + data.height;
      document.getElementById("sprite").src = data.sprites.front_default;

      const typesDiv = document.getElementById("types");
      typesDiv.innerHTML = "";
      data.types.forEach(function (typeInfo) {
        let p = document.createElement("p");
        p.innerHTML = typeInfo.type.name;
        p.className = typeInfo.type.name;
        typesDiv.appendChild(p);
      });

      function getStat(data, statName) {
        let a = data.stats.find(function (statInfo) {
          return statInfo.stat.name === statName;
        });
        return a.base_stat;
      }
      document.getElementById("hp").innerHTML = getStat(data, "hp");
      document.getElementById("attack").innerHTML = getStat(data, "attack");
      document.getElementById("defense").innerHTML = getStat(data, "defense");
      document.getElementById("special-attack").innerHTML = getStat(
        data,
        "special-attack"
      );
      document.getElementById("special-defense").innerHTML = getStat(
        data,
        "special-defense"
      );
      document.getElementById("speed").innerHTML = getStat(data, "speed");
    });
}
