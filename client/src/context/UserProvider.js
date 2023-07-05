import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// const genres = {
//     method: 'GET',
//     url: 'https://streaming-availability.p.rapidapi.com/v2/genres',
//     headers: {
//       'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
//       'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
//     }
//   }

// const imdbId = {
//   method: 'GET',
//   url: 'https://streaming-availability.p.rapidapi.com/v2/get/basic',
//   params: {
//     country: 'us',
//     imdb_id: 'tt1877830',
//     output_language: 'en'
//   },
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
//     'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
//   }
// }

// const titleSearch = {
//     method: 'GET',
//     url: 'https://streaming-availability.p.rapidapi.com/v2/search/title',
//     params: {
//       title: 'justice league',
//       country: 'us',
//       // show_type: 'movie',
//       output_language: 'en'
//     },
//     headers: {
//       'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
//       'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
//     }
//   }

// try {
// 	const response = await axios.request( titleSearch )
// 	console.log(response.data.result)
// } catch (error) {
// 	console.error(error)
// }

export default function UserProvider({ children }) {
  const initUserState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    favorites: [],
    errMsg: ""
  }
  // sets user state to blank unless they are logged in
  const [userState, setUserState] = useState(initUserState)

  // sets fav show list
  const [ favShows, setFavShows ] = useState([])


  // signup
  function signup(credentials){
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthError(err.response.data.errMsg))
  }

  // login
  function login(credentials){
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        // getUserTodos() change to get userShows or something
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
        getUserShows()
      })
      .catch(err => handleAuthError(err.response.data.errMsg))
  }

  // logout
  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      todos: []
    })
    window.location.reload()
  }

  // handle error
  function handleAuthError( errMsg ) {
    setUserState( prevState => ( {
      ...prevState,
      errMsg
    } ) )
  }

  function resetAuthErr() {
    setUserState( prevState => ( {
      ...prevState,
      errMsg: ""
    } ) )
  }

  // change to a get user favorites
  function getUserShows(){
    userAxios.get( "/api/show" )
      .then(res => setFavShows(
          res.data
        ) )
      // .then( res => console.log( "res: ", res) )
      .catch(err => console.log(err.response.data.errMsg))
  }

  // console.log( "fav Shows: ", favShows)

  // change to an add user favorites
  function addShow(favShow){
    userAxios.post( "/api/new", favShow )
      .then(res => {
        setFavShows(prevState => ([ ...prevState, res.data ]))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  // remove fav
  function removeFav( favShow ) {
    userAxios.delete( `/api/show/${ favShow }` )
      .then( res => {
        setFavShows( prevState => prevState.filter( show => show._id !== favShow ) )
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

// setting up the search functionality

  //makes a new state for the search params
  const [ searchParams, setSearchParams ] = useState( {
    title: '',
    show_type: '',
    output_language: '',
    country: 'us'
  } )

  //sets a state for the search parameters
  const [ searchResults, setSearchResults ] = useState([])

  // api call with protected variable
  const searchStreaming = async () => {
      try {
          const response = await axios.get( 'https://streaming-availability.p.rapidapi.com/v2/search/title', {
              params: searchParams,
              headers: {
                  'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                  'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                },
          } )
          // result comes in an object called result that is an array. this just makes it an array of the bat
          setSearchResults( response.data.result ) 
      } catch ( err ) {
        console.log( err.response.data.errMsg )
      }
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        resetAuthErr,
        searchParams,
        setSearchParams,
        searchStreaming,
        searchResults,
        getUserShows,
        favShows,
        setFavShows,
        addShow,
        removeFav
      }}>
      { children }
    </UserContext.Provider>
  )
}