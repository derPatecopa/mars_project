const PORT = 3000;
//using immutable for the state object
let store = Immutable.Map({
  user: Immutable.Map({ name: "Student" }),
  apod: "",
  rovers: Immutable.List(["curiosity", "opportunity", "spirit"]),
  currentRover: "none",
});

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (state, newState) => {
  //updating store for Immutable
  store = state.merge(newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content

const App = (state) => {
  return `<p>${store.get("rovers").get(0)}</p>`;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.

// Example of a pure function that renders infomation requested from the backend

// ------------------------------------------------------  API CALLS

// getting Rover Data from API

const getRoverInfo = async (roverName) => {
  const data = await fetch(`http://localhost:${PORT}/rovers/${roverName}`).then(
    (res) => res.json()
  )
  .catch((err) => console.errror(err));

  //Update store with the new roverData
  store = store.updateIn(['rovers'], (roversList)=> {
      const index = roversList.indexOf(roverName);
      const newData = {[roverName]:data};

  //if rover exists in the List, replace it with the updated version
  if (index >= 0) {
      return roversList.set(index,newData);
  }

  //if rover does not exist yet, append it to the list
  return roversList.push(newData);
  });
  return data;
};

getRoverInfo(store.get('rovers').get(0)).then(() => {
  console.log(store.getIn(['rovers', 0]));
});





