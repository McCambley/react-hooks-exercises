// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  React.useEffect(() => {
    if (!pokemonName) return
    setPokemon(null)
    setError(null)
    async function fetchData() {
      await fetchPokemon(pokemonName)
        .then(res => {
          // console.log(response)
          console.log(res)
          setPokemon(res)
        })
        .catch(err => {
          console.log(err)
          setError(err)
        })
    }
    fetchData()
  }, [pokemonName])
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  if (error) {
    return (
      <div role="alert" title="Submit another pokemon">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
  //   1. no pokemonName: 'Submit a pokemon'
  if (!pokemonName) {
    return <p>Submit a pokemon</p>
  }

  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  if (pokemonName && !pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  }
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
