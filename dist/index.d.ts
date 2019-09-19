import React from "react";
import "./index.scss";
import "react-day-picker/lib/style.css";
interface handleParams {
    value: any;
    name: string;
    label?: string;
    isValid: boolean;
}
interface IInputStyleOne {
    name: string;
    label: string;
    value: any;
    handleChange(args: handleParams): void;
    layout?: string;
    enableTooltip?: boolean;
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
    validateAfter?: number;
    numberFormatOptions?: any;
}
declare const InputStyleOne: React.FC<IInputStyleOne>;
export default InputStyleOne;
