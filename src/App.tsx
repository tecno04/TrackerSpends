import { useEffect, useMemo } from "react"
import { BudgetForm } from "./Components/BudgetForm"
import { useBudget } from "./hook/useBudget"
import { BudgetTracker } from "./Components/BudgetTracker"
import ExpenseModal from "./Components/ExpenseModal"
import { ExpenseList } from "./Components/ExpenseList"
import { FilterByCategory } from "./Components/FilterByCategory"

function App() {

  const { state} = useBudget()

  const isValidBudget = useMemo(() => { return state.budget > 0 }, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString()) //guardamos en el local storage, lo que almacene el state en cuanto al presupuesto inicial
    localStorage.setItem('expenses', JSON.stringify(state.expenses)) //guardamos cada gasto adicionado en el state de gastos sobre el presupuesto
  }, [state]) //siempre que cambie algo en el state, useEffect renderizara de nuevo

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        { 
          isValidBudget 
            ? 
            <BudgetTracker /> 
            : 
            <BudgetForm /> }
      </div>

      <main className="max-w-3xl mx-auto py-10">
        { isValidBudget &&
          <>
          <FilterByCategory />
            <ExpenseList />
            <ExpenseModal /> 
          </>
        }
      </main>

    </>
  )
}

export default App
