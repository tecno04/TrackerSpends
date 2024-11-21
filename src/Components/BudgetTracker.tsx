import { useBudget } from "../hook/useBudget"
import { AmountDisplay } from "./AmountDisplay"

export const BudgetTracker = () => {

  const { state, amountAvalaible, amountSpend } = useBudget()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <img src="./grafico.jpg" alt="Gráfico de gastos" />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg">
                RESETEAR APP
            </button>
        </div>

        <AmountDisplay label="Presupuesto" amount={state.budget}/>

        <AmountDisplay label="Disponible" amount={amountAvalaible}/>

        <AmountDisplay label="Gastado" amount={amountSpend}/>

    </div>
  )
}
