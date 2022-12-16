const getUrlForCoffeeStores = (near, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${encodeURI(
    query
  )}&near=${encodeURI(near)}&limit=${encodeURI(limit)}`;
};

export async function fetchCoffeeStores() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };
  try {
    const response = await fetch(
      getUrlForCoffeeStores("Berlin, DE", "coffee shops", 6),
      options
    );
    const data = await response.json();
    console.log(data?.results)
    return data?.results; // will be passed to the page component as props
  } catch (error) {
    console.log(error)
  }
}
