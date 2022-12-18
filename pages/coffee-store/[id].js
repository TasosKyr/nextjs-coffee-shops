import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import nearMe from "../../public/static/icons/nearMe.svg";
import places from "../../public/static/icons/places.svg";
import star from "../../public/static/icons/star.svg";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores?.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id;
  });
  return {
    props: {
      initialCoffeeStore: findCoffeeStoreById || {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores?.map((el) => {
    return {
      params: {
        id: el?.id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore({ initialCoffeeStore }) {
  const router = useRouter();
  const id = router.query.id;
  const [coffeeStore, setCoffeeStore] = useState(initialCoffeeStore);
  const {
    state: { localCoffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialCoffeeStore)) {
      if (localCoffeeStores?.length > 0) {
        const findCoffeeStoreById = localCoffeeStores?.find((el) => {
          return el.id.toString() === id;
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, locality, imgUrl } = coffeeStore;
  function handleUpvoteButton() {}

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← BACK TO HOME</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              width={600}
              height={360}
              className={styles.storeImg}
              alt={`${name} image`}
            />
          </div>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src={places} width={24} height={24} alt="location icon" />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src={nearMe}
              width={24}
              height={24}
              alt="neighborhood icon"
            />
            <p className={styles.text}>{locality}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={star} width={24} height={24} alt="star icon" />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}
