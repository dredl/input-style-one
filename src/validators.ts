import __ from "i18next"
import validator from "validator"
interface ITooltip {
  enabled: boolean
  isVisible: boolean
  title: string
  description: string
  messageType: string
}
export const validateInput = (
  rules: Array<string | [any]> = [],
  value: any,
  tooltip: ITooltip,
  label: string,
  validateAfter = 0
) => {
  let description = __.t("tooltipDescriptionTrue", { attribute: label })
  let isValid = true
  value = value.toString()
  if (value.length >= validateAfter) {
    rules.forEach(rule => {
      switch (true) {
        case typeof rule === "string":
          switch (rule) {
            case "required":
              if (validator.isEmpty(value)) {
                description = __.t("tooltipDescriptionEmpty", { attribute: tooltip.title })
                isValid = false
              }
              break
            case "email":
              if (!validator.isEmail(value) && !validator.isEmpty(value)) {
                description = __.t("tooltipDescriptionIncorrect", { attribute: tooltip.title })
                isValid = false
              }
              break
            case "card":
              if (!validator.isCreditCard(value) && !validator.isEmpty(value)) {
                description = "Credit card is not valid" //TODO: perevesty //__.t("tooltipDescriptionIncorrect", { attribute: tooltip.title }),
                isValid = false
              }
              break
            case "integer":
              if (!validator.isInt(value) && !validator.isEmpty(value)) {
                description = "Должен быть целым числом"
                isValid = false
              }
              if (value < 0) {
                description = "Поле не может иметь отрицательное значение"
                isValid = false
              }
              break
            case "float":
              if (!validator.isFloat(value) && !validator.isEmpty(value)) {
                description = "Не является число с плавающей точкой"
                isValid = false
              }
              if (value < 0) {
                description = "Поле не может иметь отрицательное значение"
                isValid = false
              }
              break
            case "url":
              if (!validator.isURL(value)) {
                description = "Поле не является правильным сайтом"
                isValid = false
              }
              break
          }
          break

        case Array.isArray(rule):
          switch (rule[0]) {
            case "maxString":
              if (!validator.isLength(value, { max: rule[1] })) {
                description = "Превышено максимальное количество символов - " + rule[1]
                isValid = false
              }
              break
            case "compare":
              if (value != rule[1]) {
                description = __.t("tooltipDescriptionPasswordMatch")
                isValid = false
              }
              break

            case "minAmountValue":
              if (value < rule[1]) {
                description = `Объем товара должен быть не менее ${rule[1]} тонн`
                isValid = false
              }
              break
            case "lte":
              if (parseFloat(value) > parseFloat(rule[1])) {
                description = "значение должно быть меньше или равно " + rule[1]
                isValid = false
              }
              break
            case "gte":
              if (parseFloat(value) < parseFloat(rule[1])) {
                description = "значение должно быть больше или равно " + rule[1]
                isValid = false
              }
              break
          }
          break
      }
    })
  } else {
    return {
      tooltipValidated: {
        ...tooltip,
        messageType: "info"
      },
      status: "info",
      isValid
    }
  }

  const messageType = isValid ? "success" : "error"
  const status = isValid ? "success" : "error"

  return {
    tooltipValidated: {
      ...tooltip,
      description,
      messageType
    },
    status,
    isValid
  }
}
