let store = Immutable.Map({
    user: Immutable.Map({ name: "Manuel" }),
    apod: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    currentRover: "",
    roverData: Immutable.Map()
});


// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  //updating function to use immutable merge
  store = store.merge(newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
    // Convert ImmutableJS List to JS array
    let rovers  = state.get('rovers').toJS();  

    return `
        <header></header>
        <main>
            ${Greeting(state.getIn(['user', 'name']))}
            ${roverData(state)}
            <section>
                <h3>Choose a Mars Rover!</h3>
                ${rovers.map(rover => `<button onClick="getRoverData('${rover}')">${rover}</button>`).join('')}
            </section>
        </main>
        <footer></footer>
    `
}


// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.

const Greeting = (name) => {
  if (name) {
    return `
                 <h1>Welcome, ${name}!</h1>
             `;
  }

  return `
             <h1>Hello!</h1>
         `;
};

const roverData = (state) => {
    let roverName = state.get('currentRover');
    let roverData = state.getIn(['roverData', roverName]);

    if (roverData) {
        console.log(roverData)
        return `
            <p> Name: ${roverData.latest_photos[0].rover.name}</p>
            <p> Launch Date: ${roverData.latest_photos[0].rover.launch_date}</p>
            <p> Landing Date: ${roverData.latest_photos[0].rover.landing_date}</p>
            <p> Status: ${roverData.latest_photos[0].rover.status}</p>
            <p> Most recent Photo: 
                <img src="${roverData.latest_photos[0].img_src}"
            </p>
            <p> Most recent Photo Date: ${roverData.latest_photos[0].earth_date}</p>
        `
    }

    return `<p>Please click a rover to get it's details (it can take a couple of seconds)</p>`;
}

// ------------------------------------------------------  API CALLS

const getRoverData = (rover) => {
    fetch(`http://localhost:3000/rovers/${rover}`)
        .then(res => res.json())
        .then(data => {
            //Update store with the new rover data and currentRover
            updateStore(store, {
                roverData: store.get('roverData').set(rover, data),
                currentRover: rover
            });
        });
        console.log(store.get("currentRover"))
}
