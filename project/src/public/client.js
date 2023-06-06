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
    let rovers  = state.get('rovers').toJS();  

    return `
        <header></header>
        <main>
            <div class="greeting-section">
                ${Greeting(state.getIn(['user', 'name']))}
            </div>
            <section>
                <h3 class="choose-rover-header">Choose a Mars Rover!</h3>
                <div class="button-container">
                  ${rovers.map(rover => `<button class="rover-button" onClick="getRoverData('${rover}')">${rover}</button>`).join('')}
                </div>
            </section>
            <div class="rover-content">
              ${roverData(state)}
            </div>
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
        //console.log(roverData)
        return `
            <div class="rover-container">
                <div class="rover-header">
                    <h2>${roverData.latest_photos[0].rover.name}</h2>
                </div>
                <div class="rover-info">
                    <p><span>Launch Date:</span> ${roverData.latest_photos[0].rover.launch_date}</p>
                    <p><span>Landing Date:</span> ${roverData.latest_photos[0].rover.landing_date}</p>
                    <p><span>Status:</span> ${roverData.latest_photos[0].rover.status}</p>
                    <p><span>Most recent Photo Date:</span> ${roverData.latest_photos[0].earth_date}</p>
                </div>
                <div class="rover-photo">
                    <img src="${roverData.latest_photos[0].img_src}" alt="Rover photo">
                </div>
            </div>
        `
    }

    return `<p>Please click a rover to get it's details (it can take a couple of seconds)</p>`;
}

// ------------------------------------------------------  API CALLS

const getRoverData = (rover) => {
    //fetching data from API and convert it into json format
    fetch(`http://localhost:3000/rovers/${rover}`)
        .then(res => res.json())
        .then(data => {
            //Update store with the new rover data and currentRover
            updateStore(store, {
                roverData: store.get('roverData').set(rover, data),
                currentRover: rover
            });
        });
        //console.log(store.get("currentRover"))
}
