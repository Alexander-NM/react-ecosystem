import { useState, useRef } from "react"
import { languages } from "./languages"
import { Keyboard } from "./components/keyboard.jsx"
import { getFarewellText, getRandomWord } from "./utils.js"
import clsx from 'clsx'
import Confetti from 'react-confetti'

export function App() {
    // State values
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setguessedLetters] = useState([])

    // Derived values
    
    // My method
    
    // let wrongGuessCount = 0
    // guessedLetters.forEach(
        //     letter => 
            //         !currentWord.includes(letter) ? 
        //         wrongGuessCount++ : 
        //         wrongGuessCount
        // )
        
    // Course method
    const wrongGuessCount = 
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
        
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const showFarewellMsg = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    
    const isGameWon = 
        Array.from(currentWord).every(letter => guessedLetters.includes(letter))
    const isGameLost = 
        wrongGuessCount >= (languages.length - 1)
    const isGameOver = 
        isGameWon || isGameLost
        
        
        // Static values
    // let getFarewellText = wrongGuessCount ? 
    //     getFarewellText(languages[wrongGuessCount - 1].name) :
    //     ""
    // if (lastWrongGessCount.current )

    const gameStatuses = {
        win: {
            header: "You win!",
            body: "Well done! 🎉"
        },
        lost: {
            header: "Game over!",
            body: "You lose! Better start learning Assembly 😭"
        },
        farewell: {
            body: wrongGuessCount ? 
                getFarewellText(languages[Math.min(wrongGuessCount - 1, languages.length - 1)].name) :
                ""
        }
    }

    const currentWordEls = Array.from(currentWord).map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const notGuessedLetter = isGameLost && !guessedLetters.includes(letter)
        
        return (
            <span 
                key={index} 
                className={clsx(notGuessedLetter && "notGuessedLetter")}
            >
                {shouldRevealLetter ? letter : ""}
            </span>
        )
    })

    const progLangEls = languages.map((lang, index) => {
        const style = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
            <span
                key={lang.name} 
                style={style}
                className={clsx(index < wrongGuessCount && "lost")}
            >
               {lang.name} 
            </span>)
    })

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && showFarewellMsg
    })

    function resetGame() {
        setCurrentWord(getRandomWord())
        setguessedLetters([])
    }

    return (
        <main>
            {isGameWon && <Confetti/>}
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section 
                aria-live="polite"
                role="status"
                className={gameStatusClass}
            >
                {isGameOver && <h2>
                    {isGameWon && gameStatuses.win.header}
                    {isGameLost && gameStatuses.lost.header}
                </h2>}
                <p>
                    {isGameWon && gameStatuses.win.body}
                    {isGameLost && gameStatuses.lost.body}
                    {!isGameOver && showFarewellMsg && gameStatuses.farewell.body}
                </p>
            </section>
            <section className="languages">
                {progLangEls}
            </section>
            <section className="word-container">
                {currentWordEls}
            </section>
            <section className="keyboard-container">
                <Keyboard 
                    clickHandler={setguessedLetters}
                    guessedLetters={guessedLetters}
                    currentWord={currentWord}
                    isGameOver={isGameOver}
                />
            </section>
            {isGameOver && <button onClick={resetGame} className="new-game">New Game</button>}
        </main>
    )
}
