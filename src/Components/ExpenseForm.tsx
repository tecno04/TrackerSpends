import { categories } from "../data/categories"
import { DatePicker } from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { ChangeEvent, useState } from "react";
import { DraftExpense, Value } from "../types/index";

export const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        amount:0,
        expenseName:'',
        category:'',
        date: new Date()
    })

    const handleDate = (value: Value) => {
        setExpense({
            ...expense,
            date:value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

        const {name, value} = e.target

        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })

    }


  return (
    <form className="space-y-5">
        <legend className="uppercase text-center text-2xl font-black border-b-4">
            Nuevo Gasto
        </legend>

        <div className="flex flex-col gap-2">
            <label htmlFor="text-xl">Nombre Gasto:</label>
            <input 
                type="text"
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount">Valor Gasto:</label>
            <input 
                type="number"
                id="amount"
                placeholder="Añade el valor del gasto"
                className="bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category">Categorías:</label>
            <select
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
            {
                categories.map(categorie => (
                    <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                ))
            }
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category">Fecha Gasto:</label>
            <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleDate}/>
        </div>

        <input 
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value="Registrar Gasto"
        />

    </form>
  )
}
