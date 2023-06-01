// const PORT = 3000;
// let store = {
//     user: { name: "Student" },
//     apod: '',
//     rovers: ['Curiosity', 'Opportunity', 'Spirit'],
// }

// // add our markup to the page
// const root = document.getElementById('root')

// const updateStore = (store, newState) => {
//     store = Object.assign(store, newState)
//     render(root, store)
// }

// const render = async (root, state) => {
//     root.innerHTML = App(state)
// }

// // create content
// const App = (state) => {
//     let { rovers, apod } = state

//     return `
//         <header></header>
//         <main>
//             ${Greeting(store.user.name)}
//             <section>
//                 <h3>Put things on the page!</h3>
//                 <p>Here is an example section.</p>
//                 <p>
//                     One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
//                     the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
//                     This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
//                     applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
//                     explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
//                     but generally help with discoverability of relevant imagery.
//                 </p>
//                 ${ImageOfTheDay(apod)}
//             </section>
//         </main>
//         <footer></footer>
//     `
// }

// // listening for load event because page should load before any JS is called
// window.addEventListener('load', () => {
//     render(root, store)
// })

// // ------------------------------------------------------  COMPONENTS

// // Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//     if (name) {
//         return `
//             <h1>Welcome, ${name}!</h1>
//         `
//     }

//     return `
//         <h1>Hello!</h1>
//     `
// }

// // Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {

//     // If image does not already exist, or it is not from today -- request it again
//     const today = new Date()
//     const photodate = new Date(apod.date)
//     console.log(photodate.getDate(), today.getDate());

//     console.log(photodate.getDate() === today.getDate());
//     if (!apod || apod.date === today.getDate() ) {
//         getImageOfTheDay(store)
//     }

//     // check if the photo of the day is actually type video!
//     if (apod.media_type === "video") {
//         return (`
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `)
//     } else {
//         return (`
//             <img src="${apod.image.url}" height="350px" width="100%" />
//             <p>${apod.image.explanation}</p>
//         `)
//     }
// }

// // ------------------------------------------------------  API CALLS

// // Example API call
// const getImageOfTheDay = (state) => {
//     let { apod } = state

//     const data = fetch(`http://localhost:${PORT}/apod`)
//         .then(res => res.json())
//         .then(apod => updateStore(store, { apod }))

//     return data
// }
//

// }

// console.log(store.rovers[0])

// -------------------------------------------------- first approach

// content

// const App = (state) => {
//     // same like let rovers = state.rovers;
//     roverInfos(state);
//     console.log(state)
//     return `
//     <header></header>
//     <main>
//         <section>
//             <h3>These are the rover Facts:
//             ${roverFacts(state)}
//             </h3>
//         </section>
//     </main>
//     `
// }

// Components

// const roverFacts = (state) => {
//     if(state.rovers.length > 0){
//         return `
//         ${state.rovers.map(rovers => `<ul>
//             <li>
//             Name: ${rovers.name}
//             <ul>
//             <li>
//             Landing Date: ${rovers.landing_date}
//             </li>
//             <li>
//             Launch Date: ${rovers.launch_date}
//             </li>
//             <li>
//             Mission Status: ${rovers.status}
//             </li>

//             </ul>
//             </li>
//         </ul>`).join('')}
//       `
//     }

// }

// const roverInfos = async (state) => {
//     const data = await getRoverInfo(state);
//     const rovers = await Promise.all(
//         data.roverData.rovers.map(async (rover,index) => {
//         const update = data.roverData.rovers[index];
//         const latestPhoto = await getLatestPhotos(rover.name, rover.max_sol);
//         console.log(latestPhoto)
//         const photo = latestPhoto.photos.img_src;
//         // create a new Object for rover
//         return Object.assign({}, rover, {
//             rover_name: update.name,
//             landing_date: update.landing_date,
//             launch_date: update.launch_date,
//             status: update.status,
//             max_sol: update.max_sol,
//             latest_photo:photo
//         });
//     })
//     );
//     // merge the new Rover Object into the store variable
//     updateStore(state, {rovers})
// }

// API calls

// //getting RoverData from API
// const getRoverInfo = async () => {
//     const data = await fetch(`http://localhost:${PORT}/rovers`)
//     .then(res => res.json())
//     //.then(roverData => updateStore(store, roverData))
//     //console.log(store.roverData.rovers[0])
//     // console.log(data.roverData)
//     //console.log(data.roverData.rovers[1])
//     return data;
// }

// const getLatestPhotos = async (rover_name, max_sol) => {
//     const data = await fetch(`http://localhost:${PORT}/rovers/${rover_name}/${max_sol}/latest_photos`)
//     .then(res => res.json())
//     //console.log(data)
//     return data;
// }

// {/* <li>
//             Latest Three Photos:
//             ${rovers.latest_photos.map(photo =>
//                 `<img src = "${photo}" alt="" width="100" height="100"`)}
//             </li> */}
