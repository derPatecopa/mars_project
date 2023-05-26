const PORT = 3000;
let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}


// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let {rovers} = state;

    return `
    <header></header>
    <main>
        <section>
            <h3>These are the rover Names: 
            ${roverNames(state)}
            ${state.rovers}
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
    return `
      ${state.rovers.map(rovers => `<p>${rovers}</p>`).join('')}
    `
}

const getSomeInfo = async (state) => {
    let {rovers} = state;

    const data = await fetch(`http://localhost:${PORT}/rovers`)
    .then(res => res.json())
    .then(test => updateStore(store, test))
    console.log(store.roverData.rovers[0])
    return data
}

// Example of a pure function that renders infomation requested from the backend


// ------------------------------------------------------  API CALLS

// Example API call
getSomeInfo(store)
