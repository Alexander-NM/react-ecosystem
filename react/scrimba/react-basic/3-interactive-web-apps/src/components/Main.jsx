import { useState } from "react"
import IngredientsList from './IngredientsList'
import ClaudeRecipe from './ClaudeRecipe'

export default function Main() {
    
    const [ingredients, setIngredients] = useState([])
    
    function addIngredient(formData) {
        const newEngredient = formData.get("ingredient")
        setIngredients(prev => [...prev, newEngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                    type="text"
                    aria-label="Add ingredient" 
                    placeholder="e.g. oregano"
                    name="ingredient"
                />
                <button >Add ingredient</button>
            </form>
            <IngredientsList 
                ingredients={ingredients}
            /> 
            <ClaudeRecipe 
                ingredients={ingredients}
            />
        </main>
    )
}