import { v4 as UUID4 } from "uuid";
import { DraftExpense, Expense } from "../types"

//Exportamos el type de Acciones que se van a poder usar en el useReducer
export type BudgetActions = 
{ type: 'add-budget', payload: { budget: number } } | 
{ type: 'show-modal' } |
{ type: 'close-modal' } | 
{ type: 'add-expense', payload: { expense: DraftExpense } } | 
{ type: 'delete-expense', payload: {id: Expense['id']} } | 
{ type: 'get-expense-by-id', payload: {id: Expense['id']} }

//Tipo de state para el estado del useReducer
export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
}

//Estado inicial del estado para inicializarlo en el useReducer
export const initialState = {
    budget: 0,
    modal: false,
    expenses: [],
    editingId: ''
}

const createExpense = (draftexpense: DraftExpense) : Expense => {
    return {
        ...draftexpense,
        id: UUID4()
    }
}

//exportamos el Reducer para usar con el useReducer
export const budgetReducer = (state: BudgetState = initialState, action:BudgetActions) => {

    //SI, el type recibido es para adicionar un budget, retornamos lo que ya habia en el state y ademas lo que venga en el payload
    if(action.type === 'add-budget'){
        
        return {
            ...state,
            budget: action.payload.budget
        }

    }

    if(action.type === 'show-modal'){
        
        return{
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal'){
        
        return{
            ...state,
            modal: false
        }
    }

    if(action.type === 'add-expense'){

        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense] ,
            modal: false //esto cierra el modal
        }

    }

    if(action.type === 'delete-expense'){
        return{
            ...state,
            expenses: state.expenses.filter(rem_expense => rem_expense.id !== action.payload.id)
        }
    }

    if(action.type === 'get-expense-by-id'){
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    //Finalmente, si alguno type no coincide, retornamos el state
    return state

}