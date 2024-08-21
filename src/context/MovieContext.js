import React from 'react'

const MovieContext = React.createContext({
  searchResponse: {},
  searchQuery: () => {},
})

export default MovieContext
