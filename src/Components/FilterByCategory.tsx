import { ChangeEvent, useId } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hook/useBudget"

export const FilterByCategory = () => {

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-category', payload: {id: e.target.value} } )
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10 text-center">
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor={useId()}>Seleccione una Categoría para filtrar:</label>
                    <select className="bg-slate-100  w-full text-center font-bold rounded-lg p-2 border border-b-2" 
                        id="category"
                        onChange={handleChange}
                    >
                        <option value="">-- Todas las Categorías --</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </div>
    )
}
