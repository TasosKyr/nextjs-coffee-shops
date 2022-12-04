import { useRouter } from "next/router"

export default function CoffeeStore() {
  const router = useRouter()
  console.log("🚀 ~ file: [id].js:5 ~ CoffeeStore ~ router", router)
  return (
    <div>Coffee Store {router.query.id}</div>
  )
}