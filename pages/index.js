import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/Banner/banner";
import Card from "../components/Card/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/useTrackLocation";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export async function getStaticProps(context) {
  const berlinCoffeeStores = await fetchCoffeeStores();

  return { props: { berlinCoffeeStores } };
}

export default function Home({ berlinCoffeeStores }) {
  const buttonText = "View stores nearby";
  const [error, setError] = useState(null);

  const {
    dispatch,
    state,
  } = useContext(StoreContext);

  const { localCoffeeStores, latLong } = state;

  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { localCoffeeStores: fetchedCoffeeStores },
          });
          
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Shops</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Finding..." : buttonText}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {error && <p>Something went wrong: {error}</p>}

        {localCoffeeStores?.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Coffee Shops near me</h2>
            <div className={styles.cardLayout}>
              {localCoffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    name={coffeeStore.name}
                    href={`/coffee-store/${coffeeStore.id}`}
                    imgUrl={coffeeStore.imgUrl}
                    className={styles.card}
                    key={coffeeStore.id}
                  />
                );
              })}
            </div>
          </div>
        )}

        {berlinCoffeeStores?.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Berlin Coffee Shops</h2>
            <div className={styles.cardLayout}>
              {berlinCoffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    name={coffeeStore.name}
                    href={`/coffee-store/${coffeeStore.id}`}
                    imgUrl={coffeeStore.imgUrl}
                    className={styles.card}
                    key={coffeeStore.id}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
