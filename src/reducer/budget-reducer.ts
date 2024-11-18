//Exportamos el type de Acciones que se van a poder usar en el useReducer
export type BudgetActions = 
{ type: 'add-budget', payload: { budget: number } }

//Tipo de state para el estado del useReducer
export type BudgetState = {
    budget: number
}

//Estado inicial del estado para inicializarlo en el useReducer
export const initialState = {
    budget: 0
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


    //Finalmente, si alguno type no coincide, retornamos el state
    return state

}