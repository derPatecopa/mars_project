const PORT = 3000;
let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ''
}


// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    const nextState = Object.assign({}, store, newState);
    render(root, nextState);
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    // same like let rovers = state.rovers;
    roverInfos(state);
    console.log(state)
    return `
    <header></header>
    <main>
        <section>
            <h3>These are the rover Names: 
            ${roverNames(state)}
            </h3>
        </section>
    </main>
    `
    
}


// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const roverNames = (state) => {
    if(state.rovers.length > 0){
        return `
        ${state.rovers.map(rovers => `<p>${rovers.name}</p>`).join('')}
      `
    }
   
}

const roverInfos = async (state) => {
    const data = await getRoverInfo(state);
    const rovers = await Promise.all(
        data.roverData.rovers.map(async (rover,index) => {
        const update = data.roverData.rovers[index];
        const latestPhotos = await getLatestPhotos(rover.name);
        const photos = latestPhotos.latest_photos.slice(0,3).map(photo => photo.img_src);
        return Object.assign({}, rover, {
            rover_name: update.name,
            landing_date: update.landing_date,
            launch_date: update.launch_date,
            satus: update.status,
            latest_photos:photos
        });
    })
    );
    updateStore(state, {rovers})
}
    

// Example of a pure function that renders infomation requested from the backend


// ------------------------------------------------------  API CALLS

//getting RoverData from API
const getRoverInfo = async () => {
    const data = await fetch(`http://localhost:${PORT}/rovers`)
    .then(res => res.json())
    //.then(roverData => updateStore(store, roverData))
    //console.log(store.roverData.rovers[0])
    // console.log(data.roverData)
    //console.log(data.roverData.rovers[1])
    return data;
}

const getLatestPhotos = async (rover_name) => {
    const data = await fetch(`http://localhost:${PORT}/rovers/${rover_name}/latest_photos`)
    .then(res => res.json())
    return data;
}

