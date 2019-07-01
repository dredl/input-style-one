import React from "react";
import "./index.scss";
import 'react-day-picker/lib/style.css';
interface IInputStyleOne {
    name: string;
    label: string;
    value: any;
    handleChange(e: any, isValid: boolean): void;
    layout?: string;
    inputType?: string;
    disabled?: boolean;
    autoComplete?: string;
    placeholder?: string;
    minRows?: number;
    maxRows?: number;
    tooltip?: {
        enabled: boolean;
        isVisible: boolean;
        title: string;
        description: string;
    };
    iconUrl?: string;
    rules?: any;
    datePickerOptions?: any;
    selectOptions?: any;
    numberFormatOptions?: any;
}
/**
 * Рассмотреть вариант изготовления этого компонента Stateless тк. по мне это вполне реально
 * PRIME4ANIE: kogda my pomewaem v component MadTooltip.. nuzhno obora4ivat' ego toka v odin tag.. naprimer <div>
 *   inache vse posleduuwie tooltipy v forme rabotat' ne budut
 */
declare const InputStyleOne: React.FC<IInputStyleOne>;
export default InputStyleOne;
