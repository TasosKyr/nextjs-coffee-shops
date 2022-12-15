import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import cls from "classnames"

const Card = ({ name, image, imgUrl }) => {
  return (
    <Link href={imgUrl}>
      <a className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
            className={styles.cardImage}
              src={image}
              width={260}
              height={160}
              alt={`${name} coffee store image`}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
