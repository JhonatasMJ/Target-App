import { TextInputProps } from "react-native";
import { CurrencyInputProps } from "react-native-currency-input";

export type InputProps  = TextInputProps &  {
    label: string
} 

export type InputCurrencyProps = CurrencyInputProps & { 
    label: string
}