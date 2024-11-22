import { useBudget } from "../hook/useBudget";
import { DetailExpense } from "./DetailExpense";

export const ExpenseList = () => {

    const { state } = useBudget()

    const filteredExpenses = state.currentCategory 
                                ?
                                state.expenses.filter(filtered => filtered.category === state.currentCategory)
                                :
                                state.expenses 

  return (
    <div className="mt-10">
        {
            filteredExpenses.length === 0 
            ? 
            <p className=" text-gray-600 text-2xl text-center font-bold p-2">No Hay Gastos guardados</p> 
            : 
            (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos:</p>
                    {
                        filteredExpenses.map(expense => (
                            <DetailExpense key={expense.id} expense={expense}/>
                        ))
                    }
                </>
            )
        }
    </div>
  )
}
