import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStores from "../../data/coffee-stores.json";

export function getStaticProps({params}) {
  return {
    props: {
      coffeeStore: coffeeStores.find(coffeeStore => {
        return coffeeStore.id.toString() === params.id
      })
    }
  }
}

export function getStaticPaths() {
  return {
    paths: [{params: {id: "0" }}], fallback: false
  }
}

export default function CoffeeStore({coffeeStore}) {
  // const router = useRouter();
  
  return (
    <div>
      Coffee Store 
      <Link href="/">BACK TO HOME</Link>
      <p>{coffeeStore.address}</p>
      <p>{coffeeStore.name}</p>
    </div>
  );
}
