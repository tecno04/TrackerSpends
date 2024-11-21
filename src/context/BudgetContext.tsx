import { useReducer, createContext, Dispatch,ReactNode, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducer/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    amountAvalaible: number
    amountSpend: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const amountAvalaible = useMemo(() => {
        const totalExpenses = state.expenses.reduce((total, expense) => expense.amount + total, 0)
        return state.budget - totalExpenses
      }, [state.expenses])
    
      const amountSpend = useMemo(() => {
        const totalSpend = state.expenses.reduce((spend, expense) => expense.amount + spend, 0)
        return totalSpend
      }, [state.expenses])

    return(
        <BudgetContext.Provider value={{ state, dispatch, amountAvalaible, amountSpend }} >
            {children}
        </BudgetContext.Provider>
    )

}