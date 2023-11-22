import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/Die'

function App() {
  const [dice, setDice] = useState(createNewDice());

  function createNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    } 
    return newDice
  }

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => (
      die.id === id ?
        {...die, isHeld: !die.isHeld} : die
    )))
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => (
      die.isHeld === true ? die : generateNewDie()
    )))
  }

  const diceElements = dice.map(die => (
      <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)}/>
    ))
 
  return (
    <main>
       <div className="dice-container">
          {diceElements}
        </div>
        <button className='roll-btn' onClick={rollDice}>Roll</button>
    </main>
  )
  
}

export default App
