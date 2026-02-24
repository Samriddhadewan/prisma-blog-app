"use client";

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

// export const dynamic = "force-dynamic"



export default function AboutPage() {
  const [data, setData] = useState();
  const [error, setError] = useState<{message : string | null} | null>(null);
  
  console.log(data)
  console.log(error)

  useEffect(()=> {
    (async()=> {
      const {data, error} = await getBlogs();
      setData(data);
      setError(error)
    })();
  },[])

  // await new Promise((resolve) => setTimeout(resolve, 4000)) 
    
  // throw new Error("something went wrong please try again")
    return (
    <div>This is a page component which is about page.</div>
  )
}
