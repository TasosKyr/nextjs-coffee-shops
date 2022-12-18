import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${encodeURI(
    query
  )}&ll=${encodeURI(latLong)}&limit=${encodeURI(limit)}`;
};

const getPhotosOfCoffeeStores = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });

  const smallPhotos = photos?.response?.results.map((el) => el.urls["small"]);
  return smallPhotos;
};

export async function fetchCoffeeStores(latLong="41.8781,-87.6298", limit=6) {
  const photos = await getPhotosOfCoffeeStores();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  try {
    const response = await fetch(
      getUrlForCoffeeStores(latLong, "coffee shops", limit),
      options
    );
    const data = await response.json();
    const concatenatedData = data?.results.map((result, index) => {
      return {
        id: result.fsq_id,
        name: result.name,
        address: result.location.formatted_address,
        locality: result.location.locality,
        imgUrl: photos.length > 0 ? photos[index] : null,
      };
    });
    return concatenatedData; // will be passed to the page component as props
  } catch (error) {
    console.log(error);
  }
}
