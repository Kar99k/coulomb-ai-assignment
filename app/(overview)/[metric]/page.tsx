"use client"

import { useParams } from "next/navigation"

export default function DetailedView(){
    const params = useParams()
    
    return (
        <div>
            DetailedView of : {params.metric}
        </div>
    )
}