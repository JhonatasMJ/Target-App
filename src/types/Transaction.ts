import { TransactionTypes } from "@/utils/TransactionTypes"

export type TransactionProps = {
    id: string
    value: string
    date: string
    description?: string
    type: TransactionTypes
   
}

export type Props = {
    data: TransactionProps
    onRemove: () => void
}