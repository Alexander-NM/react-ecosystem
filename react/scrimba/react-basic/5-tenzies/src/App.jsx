import { useState, useEffect, useRef } from 'react'
import { Dice } from "./Dice"
import { nanoid } from 'nanoid'
import React from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'


function App() {
    const [diceArray, setDiceArray] = useState(() => generateAllNewDice(10))
    const { width, height } = useWindowSize()
    const rollBtn = useRef(null)
    
    // Declarative approach
    const gameWon = diceArray.every(die => die.isHeld) &&
        diceArray.every(die => die.value === diceArray[0].value)
    
    useEffect(() => {
        rollBtn.current.focus()
    }, [gameWon])
    
    const diceComponents = diceArray.map((item) => {
        return <Dice 
        key={item.id} 
        value={item.value} 
        isHeld={item.isHeld}
        hold={() => hold(item.id)}
    />})
    
    
    
    // Imperative approach
    function isGameWon() {
        const value = diceArray[0].value
        for (let i = 0; i < diceArray.length; i++) {
            if (!diceArray[i].isHeld && diceArray[i].value !== value) {
                return false
            }
        }
        return true
    }

    
    function generateAllNewDice(arraySize) {
        return new Array(arraySize)
        .fill(0)
        .map(() => ({
            value: getRandomNumber(6),
            isHeld: false,
            id: nanoid()
        }))
    }
    
    function getRandomNumber(maxNumber) {
        return Math.ceil(Math.random() * maxNumber)
    }
    
    function rollDice() {
        setDiceArray(prev => {
        return prev.map(item => {
            return item.isHeld ?
                item :
                {...item, value: getRandomNumber(6)}
        })
        })
    }
    
    function newGame() {
        setDiceArray(generateAllNewDice(10))
    }

    function hold (id) {
        setDiceArray(prev => {
        return prev.map(dice => {
            return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
        } 
        )})
    }

    return (
        <>
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice-container'>
            {diceComponents}
            </div>
            <button 
                className='roll-dice' 
                onClick={gameWon ? newGame : rollDice}
                ref={rollBtn}>
                {gameWon ? "New game" : "Roll"}
            </button>
            {gameWon && <Confetti
                            width={width}
                            height={height}
                        />}
            <div aria-live='polite' className='sr-only'>
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
        </main>
        </>
    )
}

export default App
