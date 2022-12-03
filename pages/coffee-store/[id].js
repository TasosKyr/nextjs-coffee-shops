import { useRouter } from "next/router"

export default function CoffeStore() {
  const router = useRouter()
  console.log({router})
  return (
    <div>Coffee Store {router.query.id}</div>
  )
}