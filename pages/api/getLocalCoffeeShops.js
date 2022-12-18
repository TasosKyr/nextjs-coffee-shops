// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchCoffeeStores } from "../../lib/coffee-stores";

export default async function getLocalCoffeeShops(req, res) {
  try {
    const { latLong, limit } = req.query;

    const response = await fetchCoffeeStores(latLong, limit);
    console.log({response})
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Oh no! Sth went wrong!"})
  }
}
