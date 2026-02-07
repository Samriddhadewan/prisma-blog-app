"use client";

import { useEffect } from "react";

export default function ErrorAbout({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // we can pass this error to the logger 
        console.error(error)
    })

    return (
        <div>
            <h1>Something went wrong please try again</h1>
            <button onClick={() => reset()}>Retry</button>
        </div>
    )
}
