
const {Map, List, update} = require('immutable');
const PORT = 3000;
let store = Map({
    user: Map({ name: 'Student' }),
    apod: '',
    rovers: List([{'curiosity': {'id':12345}}, 'opportunity', 'spirit']),
    currentRover: 'none'
})

//console.log(store.get('rovers').get(0))

const updateStore = (state, newState) => {
    //updating store for Immutable
    store = state.merge(newState);
  };

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

//   getRoverInfo(store.get('rovers').get(0)).then(() => {
//     console.log(store.getIn(['rovers',0]));
//   });

//to get data added to the list later on, you can just use the usual dot notaion
getRoverInfo(store.get('rovers').get(0)).then(() => {
    console.log(store.getIn(['rovers', 0]).curiosity.latest_photos[0].id);
  });
