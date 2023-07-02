

const URL = 'http://localhost:3000/films'

//Get request with fetch
function getMovie(){
    firstMovie()
    return fetch(URL)
    .then(res => res.json())
    .then(movie => {
        
        movie.forEach(value => {
        let cinema = document.createElement('p')
        cinema.textContent = value.title
        let container = document.querySelector('#cont')
        let container2 = document.querySelector('.container-2')
       container.appendChild(cinema)
       
       cinema.addEventListener('click', ()=> {
        let scene=document.createElement('img')
        scene.src=value.poster
        container2.appendChild(scene)

        let view=document.createElement('p')
        view.innerText=`Description: ${value.description}`
        container2.appendChild(view)

        let watch=document.createElement('p')
        watch.innerText=`Showtime: ${value.showtime}`
        container2.appendChild(watch)

        let trailer=document.createElement('p')
        trailer.innerText=`Runtime: ${value.runtime}`
        container2.appendChild(trailer)
        
    } ,{once:true})
    })})

}
//Get request for first movie
function firstMovie(){
    return fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(data => {
        console.log(data[0])
        let firstmovie = data[0]
    let container2 = document.querySelector('.container-2')
    let scene=document.createElement('img')
        scene.src=firstmovie.poster
        container2.appendChild(scene)

        let view=document.createElement('p')
        view.innerText=`Description: ${firstmovie.description}`
        container2.appendChild(view)

        let watch=document.createElement('p')
        watch.innerText=`Showtime: ${firstmovie.showtime}`
        container2.appendChild(watch)

        let trailer=document.createElement('p')
        trailer.innerText=`Runtime: ${firstmovie.runtime}`
        container2.appendChild(trailer)

        let availableTickets = parseInt(firstmovie.capacity) - parseInt(firstmovie.tickets_sold)
        console.log(availableTickets)

        let tickets=document.createElement('p')
        tickets.innerText =availableTickets
        container2.appendChild(tickets)

        let button = document.createElement('button')
        if(availableTickets<=0){
            button.disabled=true
            button.innerText="Sold Out"
        }
        else(button.innerText="Purchase Ticket")
        container2.appendChild(button)

        button.addEventListener('click', ()=> {
            firstmovie.tickets_sold++
            let id =firstmovie.id
            let tickets_sold =firstmovie.tickets_sold
            console.log(firstmovie.tickets_sold,id)

            return fetch(`http://localhost:3000/films/${id}`,{
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json","Accept":"application/json" 
                },
                body:JSON.stringify({tickets_sold})
            })
            .then(res => res.json())
            .then(data => console.log(data))
        })
    })
    
}


document.addEventListener('DOMContentLoaded', getMovie)
