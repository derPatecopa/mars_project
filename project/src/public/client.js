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

// ------------------------------------------------------  API CALLS

// Example API call
