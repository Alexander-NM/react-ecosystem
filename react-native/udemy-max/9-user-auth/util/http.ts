import axios from "axios"
const BACKEND_URL =
    "https://react-n-expense-tracker-app-default-rtdb.firebaseio.com"

export async function getData(token: string | null) {

    const response = await axios.get(BACKEND_URL + "/message.json" + `?auth=${token}`)
    return response.data
}