import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'
import { useBudget } from "../hook/useBudget"
import { AmountDisplay } from "./AmountDisplay"


export const BudgetTracker = () => {

  const { state, dispatch ,amountAvalaible, amountSpend } = useBudget()

  const percentaje = +((amountSpend / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            {/* <img src="./grafico.jpg" alt="Gráfico de gastos" /> */}
            <CircularProgressbar 
              value={percentaje} 
              styles={buildStyles(
                                  {
                                    pathColor: percentaje === 100 ? "#DC2626" : "#3b82f6", 
                                    trailColor: "#F5F5F5", 
                                    textSize: 8
                                  }
                                )
                      } 
              text={`${percentaje}% Gastado`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg" onClick={() => { dispatch({type:'reset-expnese'}) } } >
                RESETEAR APP
            </button>
        </div>

        <AmountDisplay label="Presupuesto" amount={state.budget}/>

        <AmountDisplay label="Disponible" amount={amountAvalaible}/>

        <AmountDisplay label="Gastado" amount={amountSpend}/>

    </div>
  )
}
