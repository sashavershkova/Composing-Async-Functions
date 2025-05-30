const axios = require('axios');

// A helper method to pick one value from a list
const getRandomValue = (values) => {
  const index = Math.floor(Math.random() * values.length);
  return values[index];
};

// Helper method to retrieve a list of breeds
// https://dog.ceo/dog-api/documentation/
// returns a Promise to an array of breed names

const getBreeds = () => {
  return axios.get('https://dog.ceo/api/breeds/list/all')
    .then((response) => {
      const breeds = Object.keys(response.data.message);
      console.log('we have some data');
      return breeds;
    });
};

// Helper method to retrieve a random image for a
// specified breed
// https://dog.ceo/dog-api/documentation/breed
// RANDOM IMAGE FROM A BREED COLLECTION
// returns a Promise to a url (string)

const getRandomImageForBreed = (breed) => {
  return axios.get(`https://dog.ceo/api/breed/${breed}/images`)
    .then((response) => {
      const imageUrl = getRandomValue(response.data.message);
      console.log('Here is the image');
      return imageUrl;
    });
};

// use our other helpers to make a function that returns
// a random image from a random breed
// returns a Promise to a url (string)

const getRandomDogImage = () => {
  return getBreeds().then((breeds) => {
    const randomBreed = getRandomValue(breeds);
    return getRandomImageForBreed(randomBreed);
  })
    .then((imageUrl) => {
      console.log(`Here is my URL: ${imageUrl}`)
      return imageUrl;
    });
};

// This is the call we would like to make work
// This function should return a Promise to a url (string)
getRandomDogImage()
  .then(url => {
    console.log(url);
  });
