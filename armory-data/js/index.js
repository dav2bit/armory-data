let suggestionSystem = {
  searchInput : document.querySelector(".search>input"),
  autocompleteList : document.querySelector(".recomendit"),
  suggestions : [
    "Տ-90",
    "Տ-80",
    "Տ-72",
    "Տ-55",
    "Տ-54",
    "ԲՄՊ-1",
    "ԲՄՊ-2",
    "ԲՄԴ-1",
    "ԲՌՄ-1Կ",
    "ԲՏՌ-60",
    "ԲՏՌ-70",
    "ԲՏՌ-80",
    "ԲՌԴՄ-2",
    "ՄՏ-ԼԲ",
    "ԳԱԶ-2975 ՏԻԳՌ",
    "Շտուռմ",
    "Կոնկուրս",
    "Միլան",
    "Մալյուտկա",
    "Ֆագոտ",
    "Էլբրոուս",
    "իսկանդեր",
    "Տոչկա-ՈՒ",
    "ԲՄ-21 Գռադ",
    "Սմերչ",
    "ՏՈՍ-1Ա Սոլնտսեպյոկ",
    "2Ս1 Գվոզդիկա",
    "2Ս3 Ակացիա",
    "Յաչիդ-Բ",
    "Դ-30",
    "Դ-1",
    "ՄՏ-12"
  ],

  displaySuggestions(suggestions) {
    this.autocompleteList.innerHTML = "";
    console.log(this.searchInput)
    suggestions.forEach((suggestion) => {
      const listItem = document.createElement("li");
      listItem.classList.add("autocomplete-item");
      listItem.textContent = suggestion;
  
      listItem.addEventListener("click", () => {
        this.searchInput.value = suggestion;
        this.autocompleteList.style.display = "none";
      });
  
      this.autocompleteList.appendChild(listItem);
    });
  
    this.autocompleteList.style.display = "block";
  },

  sugest(ev) {
    const searchTerm = ev.target.value.trim().toLowerCase(); 
    let suggestions = this.suggestions
    if (searchTerm === "") {
      this.autocompleteList.style.display = "none"; 
      return;
    }
  
  
    const startsWithLetter = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(searchTerm)
    );
  
    const containsLetter = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(searchTerm) &&
        !startsWithLetter.includes(suggestion)
    );
  
    const filteredSuggestions = startsWithLetter.concat(containsLetter);
  
    this.displaySuggestions(filteredSuggestions);
  },

  autocomplete(ev){
    let recs = this.autocompleteList.querySelector("li")
    if (recs == null) {return;}
    this.searchInput.value = recs.innerHTML;
    this.autocompleteList.style.display = "none";

    searchInput.focus();
  },
  mainSugestList(){
    this.suggestions.forEach(sugestion =>{
      const li = document.createElement("li");
      li.innerHTML = sugestion;
      document.querySelector(".list>ul").appendChild(li);
      li.addEventListener('click',el=>{
        document.querySelector('.list').style.display='none'
        document.querySelector(".search>input").value = el.target.innerHTML
        dataProces.draw(el.target.innerHTML)
      })
    })
  
  }
}

let dataProces ={


  async fetchData(name) {
    let data = await (await fetch("../resources/data.json")).json();
    return data[name]  
  },
  changeHtml(name,type,date,size,used,armament,information,src3d){

    document.querySelector(".name>h1").innerText  = name
    document.querySelector(".type>.value").innerText  = type
    document.querySelector(".date>.value").innerText  = date
    document.querySelector(".size>.value").innerText  = size
    document.querySelector(".used>.value").innerText  = used
    document.querySelector(".armament>.value").innerText  = armament
    document.querySelector(".information>.value").innerText  = information

    document.querySelector("iframe").src = `https://sketchfab.com/models/${src3d}/embed?autostart=1`

    document.querySelectorAll(".photo").forEach((el,i)=>{
        el.src = `./resources/photos/${name}/${i+1}.jpg`
        console.log(el)
    })
  
  },

  async draw(name){
    let data = await this.fetchData(name)
    console.log(data)
    this.changeHtml(name,data['type'],data['date'],data['Dimensions'],data['useTheseArmies'],data['armament'],data['info'],data["3d"])

    document.querySelectorAll(".swiper-slide").forEach(elem=>{
      elem.addEventListener('click', ev => modal.open(ev.target.src))
    })
    document.querySelector('.content').style.display='block'
   

  }

}

let modal = {
  close(){
    window.scrollTo(0,1000)
    document.querySelector(".modal").classList.remove("active")
    document.querySelector('body').classList.remove("no-scroll")
  },
  open(el){
    window.scrollTo(0,top)
    document.querySelector(".modal").classList.add("active")
    document.querySelector(".modal>.d-photos>img").src = el
    document.querySelector('body').classList.add("no-scroll")
    document.querySelector('.close').addEventListener('click', ev => this.close())
  
  }
}

suggestionSystem.mainSugestList()

suggestionSystem.searchInput.addEventListener("input", ev => suggestionSystem.sugest(ev));

document.addEventListener("keydown", async function (event) {
  if (event.key == "Tab") {
    event.preventDefault();
    suggestionSystem.autocomplete(event)
  }
})

document.querySelector(".searchBox>form").addEventListener("submit",ev=>{
  ev.preventDefault()
  suggestionSystem.autocompleteList.style.display = "none"
  let name= document.querySelector(".search>input").value.trim()
  document.querySelector('.list').style.display='none'
  dataProces.draw(name)
  
})


