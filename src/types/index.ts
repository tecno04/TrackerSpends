type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

//Exportamos el type para guardar el gasto de control
export type Expense = {
    id:string
    expenseName:string
    amount:number
    category:string
    date: Value
}

//exportamos el type que sera para especificar los datos SIN el ID (por eso el "<Omit>", donde el segundo param, es que campo ignoramos)
export type DraftExpense = Omit<Expense, 'id'>

//Type para las categorias
export type Category = {
    id:string
    name:string,
    icon:string
}