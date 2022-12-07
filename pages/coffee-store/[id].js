import { useRouter } from "next/router";
import Link from "next/link";

export default function CoffeeStore() {
  const router = useRouter();
  console.log("🚀 ~ file: [id].js:5 ~ CoffeeStore ~ router", router);
  return (
    <div>
      Coffee Store {router.query.id}
      <Link href="/">BACK TO HOME</Link>
    </div>
  );
}
