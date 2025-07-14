import { useState } from "react"
import { getRecipeFromMistral, getRecipeFromChefClaude } from "./ai"
import ReactMarkdown from 'react-markdown'

export default function ClaudeRecipe({ ingredients }) {

    const [recipe, setRecipe] = useState("")
    
    async function getRecipe() {
        const response = await getRecipeFromMistral(ingredients)
        setRecipe(response)

    }

    return ingredients.length > 3 && <section>
            <div className="get-recipe-container">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
                <button onClick={getRecipe}>Get a recipe</button>
            </div>
            {recipe && <div className="suggested-recipe-container" aria-live="polite">
                <h2>Chef Claude Recommends:</h2>
                <ReactMarkdown>
                    {recipe}
                </ReactMarkdown>
            </div>}
        </section>
}