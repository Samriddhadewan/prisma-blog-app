export const dynamic = "force-dynamic"



export default async function AboutPage() {
  await new Promise((resolve) => setTimeout(resolve, 4000))
    
  // throw new Error("something went wrong please try again")
    return (
    <div>This is a page component which is about page.</div>
  )
}
