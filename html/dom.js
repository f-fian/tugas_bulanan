
const lorem = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor odit aut facilis cupiditate mollitia, ipsum aliquid impedit quae recusandae, nesciunt magnam nostrum doloremque excepturi corporis animi possimus sit delectus voluptatibus?"



// async function getDataCategory(category,page){
//     const request = new Request(`http://localhost:3000/category/${category}/${page}`)
//     const responses = fetch(request)
//     // responses.then(response=>{
//     //     return (response.json())
//     // }).then(xx=>{
//     //     showData (xx)
//     // })
//     response = await responses
//     data = await response.json()
//     console.log(data.results) // list of data yang diambil dengan fetch
//     showData(data.results)
//     pagination(category,data.maxPage)
// }

const kategori = document.getElementsByClassName("ketegori-list")
for (let data of kategori){
    data.addEventListener("click",()=>{
        getDataProject({category:data.value,page:1})
        console.log(data.value) // website, mobile or something
    })
}

async function getDataProject({project,category,page}){
    console.log(project)
    console.log(category)
    console.log(page)
    const request = new Request(`http://localhost:3000/api/project/?search=${project}&category=${category}&page=${page}`)
    const responses = fetch(request)
    // responses.then(response=>{
    //     return (response.json())
    // }).then(xx=>{
    //     showData (xx)
    // })
    
    response = await responses
    data = await response.json()
    
    // console.log(data.)
    // console.log(data.results) // list of data yang diambil dengan fetch
    showData(data.results)
}


async function showData(category){  
    const list = document.getElementById("list")
    list.innerHTML = ""
    const urutan = []
    category.forEach((data)=>{
    let li = document.createElement("li")
    li.innerHTML = `<img src="${data.img}">
                <div class="keterangan">
                    <div class="tanggal">${data.date}</div>
                    <div class="penulis">Alfian</div>
                </div>
                <h3>${data.title}</h3>
                <p>${data.excerpt}</p>`
    urutan.push(li)
    })
    urutan.forEach(children=>{
        list.appendChild(children)
    })
}


function pagination(category,maxPage){
    page.innerHTML = ""
    for (let x = 1; x < maxPage+1; x++){
        let page = document.getElementById("page")
        let button = document.createElement("button")
        button.innerHTML = x
        button.classList.add("page-button")

        
        console.log(button)
        
        button.onclick = function() {
                
            getDataCategory(category,x)};
        
        page.appendChild(button)
    }
}


const input = document.getElementById("input-search")
const button = document.getElementById("button-search")
input.addEventListener("keypress",()=>{
    if (event.key === "Enter") {
    event.preventDefault();
    button.click();
}
})
button.addEventListener("click",()=>{
    console.log(input.value)
    getDataProject({project:input.value})
})