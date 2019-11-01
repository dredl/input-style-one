import __ from "i18next"
import validator from "validator"
interface ITooltip {
  isVisible: boolean
  title: string
  description: string
  infoDescription?: string
  messageType: string
}
export const validateInput = (
  rules: Array<string | [any]> = [],
  value: any,
  tooltip: any,
  label: string,
  validateAfter = 0
) => {
  /** Если поле не required и он пустой, то по умолчанию должно быть messageType и description = info, а потом уже срабатывают другие rules */
  let description = __.t("tooltipDescription", { attribute: label })
  let messageType = "info"
  let isValid = true
  value = value.toString()
  /** Можно указать с какого момента надо  */
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
              // if (value < 0) {
              //   description = "Поле не может иметь отрицательное значение"
              //   isValid = false
              // }
              break
            case "float":
              if (!validator.isFloat(value) && !validator.isEmpty(value)) {
                description = "Не является число с плавающей точкой"
                isValid = false
              }
              // if (value < 0) {
              //   description = "Поле не может иметь отрицательное значение"
              //   isValid = false
              // }
              break
            case "url":
              if (!validator.isEmpty(value) && !validator.isURL(value)) {
                description = "Поле не является правильным сайтом"
                isValid = false
              }
              break
            default:
          }
          break

        case Array.isArray(rule):
          switch (rule[0]) {
            case "custom":
              const result = rule[1](value)
              if (!result.isValid) {
                description = result.description
                isValid = false
              }
              break
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
      isValid
    }
  }

  if (isValid) {
    /** Если он прошел все правила и длина строки = 0 - значит поле optional, соответственно messageType = info*/
    if (value.length != 0) {
      description = __.t("tooltipDescriptionTrue", { attribute: label })
      messageType = "success"
    }
  } else {
    /** error description формируется в рулах */
    messageType = "error"
  }

  return {
    tooltipValidated: {
      ...tooltip,
      description,
      messageType
    },
    isValid
  }
}
