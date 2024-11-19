import { formatCurrency } from "../helpers"

type AmountProps = {
    label: string
    amount: number
}

export const AmountDisplay = ({label, amount} : AmountProps) => {
  return (
    <div>
        <p className="text-2xl text-blue-600 font-bold">{label}: {''}</p>
        <span className="font-black">{formatCurrency(amount)}</span>
    </div>
  )
}
