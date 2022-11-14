// const animals = [
//   { name: "budi", species: "dog", class: { name: "mamalia" } },
//   { name: "nemo", species: "fish", class: { name: "invertebrata" } },
//   { name: "bayu", species: "dog", class: { name: "mamalia" } },
//   { name: "jalin", species: "dog", class: { name: "mamalia" } },
//   { name: "dory", species: "fish", class: { name: "inveterbrata" } },
// ];

// // let OnlyDog = (animals)=>{
// //     foreach()
// // };

// const OnlyDog = animals.filter((element) => element.species == "dog");
// console.log(OnlyDog);

// let ovipar = [];
// animals.forEach((element) => {
//   if (element.species == "fish") {
//     element.class.name = "Ovipar";
//     ovipar.push(element);
//   }
// });
// console.log(ovipar);
// $.ajax({
//   url: "https://pokeapi.co/api/v2/pokemon/",
// }).done((res)=>{
//   // console.log(res.results);
//   let temp="";
//   $.each(res.results,function(key,val){
//       // literal template
//       temp += `<tr>
//                   <td>${key+1}</td>
//                   <td>${val.name}</td>
//                   <td><button class="btn btn-primary" onclick="detailPoke('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalDetailPoke">Detail</button></td>
//               </tr>`;
//   })
//   // console.log(temp);
//   $("#tablePoke").html(temp);

// }).fail((err)=>{
//   console.log(err);
// });



$.ajax({
  url: "https://pokeapi.co/api/v2/pokemon/",
})
  .done((res) => {
    let temp = "";
    $.each(res.results, function (key, val) {
      temp += `
      <tr>
      <td>${key + 1}</td>
      <td>${val.name}</td>
      <td><button class="btn btn-primary" onclick="detailPoke('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalDetailPoke">Detail</button></td>
      </tr>`;
    });
    console.log(res);
    $("#tablePoke").html(temp);
  })
  .fail((err) => {
    console.log(err);
  });

  function detailPoke(url){
    $.ajax({
        url: url
    }).done((res)=>{
      console.log(res);
      $(".modal-title").html(res.name.toUpperCase());
      // $(".teks").html(res.weight);

      // Picture
      let pict = "";
      pict = `
      <div class="carousel-item active">
        <img src="${res.sprites.other.dream_world.front_default}" class="d-block w-100" height="300" alt="...">
      </div>
      <div class="carousel-item">
      <img src="${res.sprites.other.home.front_default}" class="d-block w-100" height="300" alt="...">
      </div>
      <div class="carousel-item">
       <img src="${res.sprites.other.home.front_shiny}" class="d-block w-100" height="300"  alt="...">
      </div>`
      $(".picture").html(pict);

      // Types
      let types = "";
      $.each(res.types, function (key, val) {
        types += `
        <span class="badge rounded-pill text-bg-primary">${val.type.name}</span>
        `
      });
      $(".types").html(types);
      // Status
      let status = "";
      let rname = [];
      let rvalue = [];
       $.each(res.stats,function(key,val){
      status += `
      <p class="badge rounded-pill text-bg-warning">${val.stat.name}</p>
        <div class="progress">
          <div class="progress-bar progress-bar-striped" role="progressbar" aria-label="Example with label" style="width:${val.base_stat}%;" aria-valuenow="${val.base_stat}" aria-valuemin="0" aria-valuemax="100">${val.base_stat}</div>
        </div>
        <br>
      `
      rname.push(val.stat.name);
      rvalue.push(val.base_stat);
      $(".status").html(status);
      // Witdh and Height
      let width = "";
      width = `
      <span class="badge text-bg-info">Weight : ${res.weight}</span>
      <span class="badge text-bg-danger">Height : ${res.height}</span>
      `
      $(".mass").html(width);

      //console.log(res.species.url);
    })
    console.log(rname);
    console.log(rvalue);
    speciesDetail(res.species.url);
    var marksCanvas = document.getElementById("marksChart");

    var marksData = {
      labels: rname,
      datasets: [{
        label: "Stat",
        backgroundColor: "rgba(200,0,0,0.2)",
        data: rvalue
      } ]
    };

    var radarChart = new Chart(marksCanvas, {
      type: 'radar',
      data: marksData
    });

    }).fail((err)=>{
      console.log(err);
    });
  }
 

  function speciesDetail(url){
    $.ajax({
      url:url
    }).done((res)=>{
      console.log(res.flavor_text_entries[0].flavor_text);
      let desc = "";
      desc = `${res.flavor_text_entries[0].flavor_text}`
      $(".description").html(desc);
    }).fail((err)=>{

    })
  }


$("#nonRadar").click(function(){
  $('#marksChart').toggle();
})
  
