interface ITooltip {
    enabled: boolean;
    isVisible: boolean;
    title: string;
    description: string;
    messageType: string;
}
export declare const validateInput: (rules: (string | [any])[], value: any, tooltip: ITooltip, label: string, validateAfter?: number) => {
    tooltipValidated: {
        messageType: string;
        enabled: boolean;
        isVisible: boolean;
        title: string;
        description: string;
    };
    status: string;
    isValid: boolean;
};
export {};
