// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

/**
 * @param {string} key
 * @param {*} value
 * @returns {(string | React.Dispatch<React.SetStateAction<string>>)[]}
 */
function useLocalStorageState(key, value) {
  // 🐨 initialize the state to the value from localStorage
  const initializeValue = () => {
    const localValue = window.localStorage.getItem(key)
    return localValue ? JSON.parse(localValue) : value
  }

  const [returnValue, setReturnValue] = React.useState(initializeValue)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    const stringifiedValue = JSON.stringify(returnValue)
    window.localStorage.setItem(key, stringifiedValue)
  }, [key, returnValue])

  return [returnValue, setReturnValue]
}

function Greeting({initialName}) {
  const [name, setName] = useLocalStorageState(
    'name',
    JSON.stringify(initialName),
  )

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
