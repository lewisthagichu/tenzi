import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Die from './components/die'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(createNewDice());
  const [tenzies, setTenzies] = useState(false)
  const [currentCount, setCurrentCount] = useState(0)
  const [bestCount, setBestCount] = useState(
    () => JSON.parse(localStorage.getItem('bestCount')) || Infinity)
  
  useEffect(() => {
    const allDiceHeld = dice.every(die => die.isHeld === true);
    const firstValue = dice[0].value
    const shareSameValue = dice.every(die => die.value === firstValue);

    if(allDiceHeld && shareSameValue) {
      console.log("Won!");
      setTenzies(true)
    }
  }, [dice])

  useEffect(() => {
    if (tenzies && currentCount < bestCount) {
      setBestCount(currentCount)
      localStorage.setItem("bestCount", JSON.stringify(currentCount))
    }
  }, [bestCount, currentCount, tenzies]) 

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
      setCurrentCount(count => count + 1)
    } else {
      setTenzies(false)
      setDice(createNewDice())
      setCurrentCount(0)
    }
  }
  
  const diceElements = dice.map(die => (
      <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)}
     />
    ))
 
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
      Click each die to freeze it at its current value between rolls.</p>

      <div className="dice-container">
        {diceElements}
      </div>

      <button className='roll-btn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>

      <div className='roll-count'>
        <p>{`Rolls: ${currentCount}`}</p>
        <p>{`Best: ${bestCount > 1000 ? 0 : bestCount}`}</p>
      </div>
    </main>
  )
  
}

export default App
