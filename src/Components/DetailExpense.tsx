import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
import { formatDate } from "../helpers"
import { Expense } from "../types"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hook/useBudget";

type ExpenseProps = {
    expense: Expense
}

export const DetailExpense = ({expense} : ExpenseProps) => {

    const categoryInfo = useMemo(() => categories.filter(cate => cate.id === expense.category)[0], [expense])
    const { dispatch } = useBudget()

    const UpdateSwipeAction = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type:'get-expense-by-id', payload: {id: expense.id} } ) } >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const DeleteSwipeAction = () => (
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({type:'delete-expense', payload:{id: expense.id} } ) } destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem maxSwipe={30} leadingActions={UpdateSwipeAction()} trailingActions={DeleteSwipeAction()} >
            <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                
                <div>
                    <img src={`/icono_${categoryInfo.icon}.svg`} alt={categoryInfo.name} className="w-20"/>
                </div>
                
                <div className="flex-1 space-y-3">
                    <p className="text-sm font-bold uppercase text-slate-600">{categoryInfo.name}</p>
                    <p>{expense.expenseName}</p>
                    <p className="text-slate-600 text-sm mb-6">{formatDate(expense.date!.toString())}</p>
                </div>

                <AmountDisplay amount={expense.amount} label="Gastados" />

            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}
