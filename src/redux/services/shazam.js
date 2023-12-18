import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '21bef8bc1fmshbd86c2f1a945b55p1323b5jsna4b61fdd3c28',
//       'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//     }
//   };
  
  // fetch('https://shazam.p.rapidapi.com/charts/track', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));

    export const shazamApi = createApi({
        reducerPath: 'shazamApi',
        baseQuery: fetchBaseQuery({
          baseUrl:'https://shazam.p.rapidapi.com',
          prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '21bef8bc1fmshbd86c2f1a945b55p1323b5jsna4b61fdd3c28');

            return headers;
          },
        }),
        endpoints: (builder) => ({
          getTopCharts : builder.query({ query: () => '/charts/track'}),
          getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}`}),

          getSongDetails: builder.query({ query: ({ songid}) => 
                         `/songs/get-details?key=${songid}`
           }),
           getSongRelated: builder.query({ query: ({ songid }) => 
                            `/songs/get-related-artist?id=${songid}`
          }),
          getArtistDetails: builder.query({ query: (artistId) => 
           `/artists/get-details?id=${artistId}`
          }),
          getSongsByCountry: builder.query({ query: ( countryCode) => 
            `/charts/country?country_code = ${countryCode}`
          }),

          getSongsBySearch : builder.query({ query: (searchterm) => 
            `/search?term=${searchterm}`
          })

        }),
    });

    export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery,
                   useGetArtistDetailsQuery , useGetSongsByCountryQuery,
                  useGetSongsByGenreQuery,useGetSongsBySearchQuery } = shazamApi;