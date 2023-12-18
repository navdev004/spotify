import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'


import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazam';


const  AroundYou = () => {
    const [country, setCountry ] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying} = useSelector((state) => state.player);
    const { data, isFetching, error} = useGetSongsByCountryQuery(country);
    

    useEffect(() => {

        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_5YdyRvKJdwunMejURA4PG8V65a1mv`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
     
        //geo.ipify.org-apiKey = at_5YdyRvKJdwunMejURA4PG8V65a1mv
       
        if(isFetching && loading )
           return <Loader title="Loading Songs around you" /> 

           if(error && country ) return <Error />
    }, [country])
    
  return (
    <div> AroundYou</div>
  )
}

export default  AroundYou