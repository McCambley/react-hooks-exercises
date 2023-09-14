import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import * as React from 'react'
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) return
    setState(prev => {
      return {
        ...prev,
        status: 'pending',
        error: null,
      }
    })
    async function fetchData() {
      await fetchPokemon(pokemonName)
        .then(res => {
          setState({
            status: 'resolved',
            pokemon: res,
            error: null,
          })
        })
        .catch(err => {
          setState(prev => {
            return {
              ...prev,
              status: 'rejected',
              error: err,
            }
          })
        })
    }
    fetchData()
  }, [pokemonName])
  if (state.status === 'idle') {
    return <p>Submit a pokemon</p>
  }

  if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (state.status === 'rejected') {
    return (
      <div role="alert" title="Submit another pokemon">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  }

  if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemon} />
  }
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
