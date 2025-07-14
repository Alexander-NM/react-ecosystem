import { clsx } from "clsx"
import type { JSX } from "react/jsx-runtime"

type WordLettersProps = {
    currentWord: string
    guessedLetters: string[]
    isGameLost: boolean
}

export default function WordLetters({
    currentWord,
    guessedLetters,
    isGameLost,
}: WordLettersProps): JSX.Element {
    return (
        <section className="word">
            {currentWord.split("").map((letter, index) => {
                const shouldRevealLetter =
                    isGameLost || guessedLetters.includes(letter)
                const letterClassName = clsx(
                    isGameLost &&
                        !guessedLetters.includes(letter) &&
                        "missed-letter"
                )
                return (
                    <span key={index} className={letterClassName}>
                        {shouldRevealLetter ? letter.toUpperCase() : ""}
                    </span>
                )
            })}
        </section>
    )
}
