const PORT = 3000;
//using immutable for the state object
let store = Immutable.Map({
  user: Immutable.Map({ name: "Student" }),
  apod: "",
  rovers: Immutable.List(["curiosity", "opportunity", "spirit"]),
  selectedRover: null,
});

// add our markup to the page
const root = document.getElementById("root");

//function for updating the store object
const updateStore = (state, newState) => {
  //updating store for Immutable
  //mergin fetched newState into current object
  //merged data is not immutable, therefore you can access it via regular dot noation
  store = state.merge(newState);
  render(root, store);
};

//renders content to index.html via App()
const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  return `<p>${
    state.getIn(["rovers", 0]).curiosity.latest_photos[0].rover.name
  }</p>
  ${infoText(state)}
  <img src="${state.getIn(["rovers", 0]).curiosity.latest_photos[0].img_src}" width="500" height="600">
`;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", async () => {
  //loading the data for store BEFORE the site is being rendered
  await Promise.all(
    store.get("rovers").map(async (roverName) => {
      const roverData = await getRoverInfo(roverName);
      store = store.setIn(["rovers", roverName], roverData);
    })
  );
  console.log(store.getIn(["rovers", 0]));
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

const infoText = () => {
  return `
  <header></header>
          <main>
              <section>
                  <h3>Put things on the page!</h3>
                  <p>Here is an example section.</p>
                  <p>
                      One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                      the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                      This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                      applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                      explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                      but generally help with discoverability of relevant imagery.
                  </p>
              </section>
          </main>
  `
}




// ------------------------------------------------------  API CALLS

// getting Rover Data from API
const getRoverInfo = async (roverName) => {
  // fetching data from api in index.js
  const data = await fetch(`http://localhost:${PORT}/rovers/${roverName}`)
    .then((res) => res.json())
    .catch((err) => console.errror(err));

  //Update store with the new roverData using updateIn from immutable
  store = store.updateIn(["rovers"], (roversList) => {
    const index = roversList.indexOf(roverName);
    const newData = { [roverName]: data };

    //if rover exists in the List, replace it with the updated version
    if (index >= 0) {
      return roversList.set(index, newData);
    }

    //if rover does not exist yet, append it to the list
    return roversList.push(newData);
  });
  return data;
};
