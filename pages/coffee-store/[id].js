import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import coffeeStores from "../../data/coffee-stores.json";
import styles from "../../styles/coffee-store.module.css";

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStores.map((el) => {
    return {
      params: {
        id: el.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore({ coffeeStore }) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  const { name, address, neighborhood, imgUrl } = coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">BACK TO HOME</Link>
          </div>
          <div className={styles.nameWrapper}>
          <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={`${name} image`}
          />
        </div>
        <div className={styles.col2}>
          <p>{address}</p>
          <p>{neighborhood}</p>
        </div>
      </div>
    </div>
  );
}
