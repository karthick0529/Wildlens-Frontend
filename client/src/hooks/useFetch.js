import { useEffect, useState } from "react"


const useFetch = (url) =>{

const [tour,setTour] = useState([]);
const [error,setError]= useState(null);
const [loading,setLoading] = useState(null);

useEffect (() => {

    const fetchTour = async () => {
        setLoading(true);

        try {
            const res = await fetch (url)
            if(!res.ok){
                setError('failed to fetch')
                
            }
            const result = await res.json()
            setTour(result)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

fetchTour();
},[url])

    return {
        tour,error,loading
    }

}

export default useFetch;