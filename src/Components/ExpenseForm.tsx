import { categories } from "../data/categories"
import { DatePicker } from "react-date-picker";
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { ChangeEvent, useState, FormEvent } from "react";
import { DraftExpense, Value } from "../types/index";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hook/useBudget";

export const ExpenseForm = () => {

    /*
        Declaramos la instancia del useState, donde fijamos que sera del tipo "DraftExpense" 
        (El Type que contiene la estructura de datos que excepciona el ID).
        Como valor inicial, abrimos y declaramos un objeto que como datos iniciales el monto (0),
        nombre de gasto (vacio), categoria (vacia) y la fecha (fecha actual).
        Estos datos seran actualizados en el momento de ir configurando el formulario
    */
    const [expense, setExpense] = useState<DraftExpense>({
        amount:0,
        expenseName:'',
        category:'',
        date: new Date()
    })

    //useState que almacena el error cuando hay campos que no se llenaron o quedaron vacios
    const [error, seterror] = useState('')

    //esportamos del hook, el dispatch (Fn) para usar en el "handleSubmit"
    const { dispatch } = useBudget()

    /*
        Funcion especifica para el input date, que recibe, un valor, del tipo type "Value" donde se configura con el useState:
        *...expense : con el spread operator, guardamos los datos que ya habia configurado
        *date: el valor que recibimos como prop
    */
    const handleDate = (value: Value) => {
        setExpense({
            ...expense,
            date:value
        })
    }

    /*
        Funcion que recibe un evento del tipo HTMLInput o HTMLSelect.
        Desestructuramos desde eltarget, tanto el nombre del campo y su valor
        en una variable, guardamos con un array, si el campo recibido, tiene incluido la palabra "amount"
        Finalmente, configuramos con el set del useState:
        *...expense : Una vez mas, con el spread operator, traemos si hay algun dato mas
        *[name]: guardamos como array el nombre del input como llave, y en su valor, usamos el ternary para que, en caso de que
        "isAmountField" da true, retornamos el valor como number, caso contrario, devolvemos el tipo de dato que encontramos
    */
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

        const {name, value} = e.target

        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })

    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        
        //evitamos la re-carga del formulario
        e.preventDefault()

        //SI, llega a resultar que hay campos vacios
        if(Object.values(expense).includes('')){

            //guardamos en el useState de error, el mensaje a mostrar
            seterror("Faltan Campos por llenar")

            //retornamos un void para que no pase nada mas
            return
        }

        //Enviar al reducer los nuevos datos a guardar
        dispatch({type:'add-expense', payload: {expense: expense}})

        //reiniciar el state de los datos
        setExpense({
            amount:0,
            expenseName:'',
            category:'',
            date: new Date()
        })

    }


  return (
    <form className="space-y-5" onSubmit={ handleSubmit }>
        <legend className="uppercase text-center text-2xl font-black border-b-4">
            Nuevo Gasto
        </legend>

        { error && <ErrorMessage>{error}</ErrorMessage> }

        <div className="flex flex-col gap-2">
            <label htmlFor="text-xl">Nombre Gasto:</label>
            <input 
                type="text"
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName} //Accedemos a la propiedad necesaria desde el state del useState
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
                value={expense.amount} //Accedemos a la propiedad necesaria desde el state del useState
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category">Categorías:</label>
            <select
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                value={expense.category} //Accedemos a la propiedad necesaria desde el state del useState
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
            <DatePicker className="bg-slate-100 p-2 border-0" 
                value={expense.date} onChange={handleDate} //Accedemos a la propiedad necesaria desde el state del useState
            />
        </div>

        <input 
            type="submit"
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value="Registrar Gasto"
        />

    </form>
  )
}
