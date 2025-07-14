import { useSelector, useDispatch } from "react-redux"
import { type AppDispatch, type RootState } from "../state/store"
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
} from "../state/counter/CounterSlice"

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div>
            <h2>{count}</h2>
            <div>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
                <button onClick={() => dispatch(incrementAsync(10))}>
                    Increment
                </button>
            </div>
        </div>
    )
}

export default Counter
