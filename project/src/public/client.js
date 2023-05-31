const PORT = 3000;
//using immutable for the state object
let store = Immutable.Map({
    user: Immutable.Map({ name: 'Student' }),
    apod: '',
    rovers: Immutable.List(['curiosity', 'opportunity', 'spirit']),
    currentRover: 'none'
})


// add our markup to the page
const root = document.getElementById('root')

const updateStore = (state, newState) => {
    //updating store for Immutable
    store = state.merge(newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content

const App = (state) => {
   
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.



// Example of a pure function that renders infomation requested from the backend


// ------------------------------------------------------  API CALLS

// getting Rover Data from API
const getRoverInfo = async (roverName, state) => {
    let {currentRover} = state
    //fetch data from the server from api in index.js
    currentRover = await fetch (`http://localhost:${PORT}/rovers/${roverName}`)
    .then(res=> res.json())
    const newState = state.set('currentRover', currentRover)
    updateStore(store, newState)
    return currentRover
}



