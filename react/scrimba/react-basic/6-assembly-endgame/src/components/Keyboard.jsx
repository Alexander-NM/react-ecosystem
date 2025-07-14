import clsx from 'clsx'

export function Keyboard({ clickHandler, guessedLetters, currentWord, isGameOver }) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    return alphabet.split("").map((letter, index) => (
        <button
            className={clsx(
                "orange",
                guessedLetters.includes(letter) && 
                currentWord.includes(letter) &&
                "green", 
                guessedLetters.includes(letter) && 
                !currentWord.includes(letter) &&
                "red")} 
            onClick={() => clickHandler(
                prevLetters => { 
                    return (prevLetters.includes(letter) ?
                    prevLetters :
                    [...prevLetters, letter])
                }
            )} 
            key={index}
            disabled={isGameOver}
            aria-disabled={guessedLetters.includes(letter)}
            aria-label={`Letter ${letter}`}
        >
            {letter}
        </button>
    )) 
} 
