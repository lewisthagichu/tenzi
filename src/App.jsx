import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/die'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(createNewDice());
  const [tenzies, setTenzies] = useState(false)
  
  useEffect(() => {
    const allDiceHeld = dice.every(die => die.isHeld === true);
    const firstValue = dice[0].value
    const shareSameValue = dice.every(die => die.value === firstValue);

    if(allDiceHeld && shareSameValue) {
      console.log("Won!");
      setTenzies(true)
    }
  }, [dice])

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
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => (
        die.isHeld === true ? die : generateNewDie()
      )))
    }
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
