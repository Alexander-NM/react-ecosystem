import Confetti from "react-confetti"

const ConfettiContainer: React.FC<{ isGameWon: boolean }> = ({ isGameWon }) => {
    if (!isGameWon) {
        return null
    } else {
        return <Confetti recycle={false} numberOfPieces={1000} />
    }
}

export default ConfettiContainer
