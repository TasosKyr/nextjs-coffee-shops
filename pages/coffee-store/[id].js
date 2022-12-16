import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import coffeeStores from "../../data/coffee-stores.json";
import styles from "../../styles/coffee-store.module.css";
import nearMe from "../../public/static/icons/nearMe.svg";
import places from "../../public/static/icons/places.svg";
import star from "../../public/static/icons/star.svg";
import cls from "classnames";

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

  function handleUpvoteButton() {}

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
          <div className={styles.storeImgWrapper}>
            <Image
              src={imgUrl}
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
            <p className={styles.text}>{neighborhood}</p>
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
