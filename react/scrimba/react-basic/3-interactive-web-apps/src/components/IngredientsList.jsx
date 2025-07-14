export default function IngredientsList({ ingredients }) {
   
    const ingredientsListItems = ingredients.map((entry) => {
        return (
            <li key={entry}>{entry}</li>
        )
    })

    return ingredients.length > 0 && <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
        </section>    
}