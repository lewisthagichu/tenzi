import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/Die'

function App() {
  const [dice, setDice] = useState(createNewDice());

  function createNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(
        {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6)
        }
      )
    } 
    return newDice
  }
  const diceElements = dice.map(die => (
      <Die key={die.id} value={die.value} />
    ))
 
  return (
    <main>
       <div className="dice-container">
          {diceElements}
        </div>
    </main>
  )
  
}

export default App
