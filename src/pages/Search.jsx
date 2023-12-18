import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazam';
import { useParams } from 'react-router-dom';

const Search = () => {
    const { searchterm } = useParams();

    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error} = useGetSongsBySearchQuery(searchterm);

    // const songs = data?.tracks?.hits?.map((song) => song.track)
     
    if(isFetching) return <Loader title="Loading top charts" />

    if(error) return <Error />

  return (
    <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
            Showing results for <span className='font-black'>{searchterm}</span>
        </h2>

        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>

            {data?.tracks?.hits?.map((song,i) => (
                <SongCard 
                  key={song.key}
                  song={song?.track}  
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data?.tracks?.hits}
                  i={i}
                />
            ))}

        </div>
        
    </div>
  )
}

export default Search