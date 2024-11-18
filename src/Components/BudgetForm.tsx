import { useState, ChangeEvent, useMemo } from "react"

export const BudgetForm = () => {

    //inicializamos el useState
    const [budget, setBudget] = useState(0)

    //Es la funcion que ejecuta al escribir el valor, donde pasamos el valor a numero
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    /*
    Generamos una funcion, donde usamos "useMemo()" para recordar el resultado de la funcion (siempre, y cuando, su dependencia no cambie)
    retornamos true en caso de que el "budget" (el useState donde almacena el valor de presupuesto) es diferente a "NaN" o si es mayor
    a 0, caso contrario devuelve un false
    */
    const isValid = useMemo(() => { return isNaN(budget) || budget <= 0 }, [budget])

  return (
    <>
        <form className="space-y-5">
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Presupuesto:
                </label>
                <input 
                className="w-full bg-white border border-gray-200 p-2 text-center"
                id="budget"
                type="number"
                name="budget"
                placeholder="Ingresa el monto del presupuesto"
                value={budget}
                onChange={handleChange}
            />
            </div>
            <input 
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    </>
  )
}
