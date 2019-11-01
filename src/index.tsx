import React, { useState, useEffect } from "react"
import MadTooltip from "./tooltip"
import _ from "lodash"
import __ from "i18next"
import "./index.scss"
import Textarea from "react-textarea-autosize"
import moment from "moment"
import DayPickerInput from "react-day-picker/DayPickerInput"
import MomentLocaleUtils from "react-day-picker/moment"
import "react-day-picker/lib/style.css"
import MadSelect from "./select"
import NumberFormat from "react-number-format"
import { I18nextProvider } from "react-i18next"
import translations from "./i18n"
import { validateInput } from "./validators"
interface handleParams {
  value: any
  name: string
  label?: string
  isValid: boolean
}
interface IInputStyleOne {
  //required
  name: string
  label: string
  value: any
  handleChange(args: handleParams): void

  //optional
  /**
   * @deprecated just remove this props and everything will be ok :)
   */
  layout?: string
  enableTooltip?: boolean
  inputType?: string
  disabled?: boolean
  autoComplete?: string
  placeholder?: string
  minRows?: number
  maxRows?: number
  showLabel?: boolean
  showOptionalLabel?: boolean
  // tooltip?: {
  //   isVisible: boolean
  //   /** Заголовок подсказчика */
  //   title: string
  //   description: string
  //   messageType: string
  // }
  infoDescription?: string
  iconUrl?: string
  rules?: any //Array<string>
  datePickerOptions?: any
  selectOptions?: any
  validateAfter?: number
  numberFormatOptions?: any
}

const InputStyleOne: React.FC<IInputStyleOne> = props => {
  const {
    showLabel = true,
    showOptionalLabel = true,
    inputType,
    label,
    name,
    value,
    infoDescription = null,
    disabled,
    placeholder,
    enableTooltip = true,
    validateAfter,
    selectOptions = null,
    datePickerOptions = null,
    numberFormatOptions = null,
    autoComplete = "off"
  } = props
  const [tooltip, setTooltip] = useState({
    isVisible: false,
    title: "",
    description: "",
    descriptions: {
      info: null,
      error: null,
      success: null
    },
    messageType: "info"
  })

  useEffect(() => {
    /** Rewrite from default custom infoDescription if needed */
    setTooltip({
      ...tooltip,
      description: infoDescription ? infoDescription : __.t("tooltipDescription", { attribute: label }),
      title: label
    })
    const { value, rules } = props
    // для управления событиями в select-е
    if (selectOptions && selectOptions.value) {
      setTooltip({
        ...tooltip,
        description: infoDescription ? infoDescription : __.t("tooltipDescription", { attribute: label }),
        title: label,
        messageType: "success"
      })
    }
    /** Если изначално есть какое нибудь значение и правила сразу провести валидацию */
    if (value && rules) {
      validateRules(rules, value)
    }
  }, [])

  //Вынес в отдельную ф-ю, т.к будет вызызаться в случаях если value уже существует
  const validateRules = (rules, value, validateAfter = 0) => {
    const { tooltipValidated, isValid } = validateInput(rules, value, tooltip, label, validateAfter)
    setTooltip(tooltipValidated)
    return isValid
  }

  const handleChange = (e, validateAfter = 0) => {
    e.preventDefault()
    const { value, name } = e.target
    const isValid = validateRules(props.rules, value, validateAfter)
    props.handleChange({ value, name, label: null, isValid })
  }

  // cb ф-я NurmerFormat, вынес отдельно т.к отличается передаваемые параметры
  const handleValueChange = (values, name, validateAfter = 0) => {
    const { value } = values
    const isValid = validateRules(props.rules, value, validateAfter)
    props.handleChange({ value, name, label: null, isValid })
  }

  const handleFocus = e => {
    e.preventDefault()
    setTooltip({ ...tooltip, isVisible: true, messageType: tooltip.messageType })
  }

  const handleBlur = e => {
    e.preventDefault()
    setTooltip({ ...tooltip, isVisible: false, messageType: tooltip.messageType })
  }

  const renderInput = () => {
    const Status = ({ messageType }) => {
      if (messageType == "error") return <span className="mad-form__status mad-form__status-error" />
      if (messageType == "success") return <span className="mad-form__status mad-form__status-success" />
      return <span className="mad-form__status mad-form__status-info" />
    }
    const Icon = () => {
      if (!props.iconUrl) {
        return <></>
      }
      return (
        <>
          <img className="mad-form__icon" src={props.iconUrl} alt="" />
          <span className="mad-form__delimeter" />
        </>
      )
    }

    switch (inputType) {
      case "password": {
        return (
          <MadTooltip data={tooltip} enabled={enableTooltip}>
            <div className="mad-form__input" tabIndex={-1}>
              <input
                name={name}
                type={inputType}
                autoComplete={autoComplete}
                className="mad-form-control"
                onChange={e => handleChange(e, validateAfter)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={label}
                value={value}
                disabled={disabled}
              />
              <Status messageType={tooltip.messageType} />
            </div>
          </MadTooltip>
        )
      }
      case "textArea": {
        return (
          <MadTooltip data={tooltip} enabled={enableTooltip}>
            <div className="mad-form__input mad-form__input-textarea" tabIndex={-1}>
              <Textarea
                className="mad-form__control"
                name={name}
                value={value}
                autoComplete={props.autoComplete}
                onChange={e => handleChange(e)}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e)}
                placeholder={placeholder ? placeholder : "Заполните " + label}
                disabled={disabled}
                minRows={props.minRows ? props.minRows : 3} //todo
                maxRows={props.maxRows ? props.maxRows : 10}
              />

              <Status messageType={tooltip.messageType} />
            </div>
          </MadTooltip>
        )
      }
      case "datePicker": {
        const overlayPosition = datePickerOptions
          ? datePickerOptions.overlayPosition
            ? datePickerOptions.overlayPosition
            : "bottom"
          : "bottom"
        const handleChange = day => {
          setTooltip({ ...tooltip, ...{ messageType: day ? "success" : "info" } })
          props.handleChange({
            value: moment(day).unix() - 12 * 3600, //когда происходит конвертация с дня на unix time, почему то добавляется 12 часов
            name: name,
            isValid: true,
            label: null
          })
        }
        return (
          <MadTooltip data={tooltip} enabled={enableTooltip}>
            <div
              onFocus={handleFocus}
              onBlur={handleBlur}
              tabIndex={-1}
              style={{ outline: "none", borderColor: "transparent" }}
            >
              <DayPickerInput
                classNames={{
                  container: "DayPickerInput mad-form__input",
                  overlayWrapper: "DayPickerInput-OverlayWrapper",
                  overlay: "DayPickerInput-Overlay" + (overlayPosition == "top" ? " DayPickerInput-Overlay--top" : "") // The overlay's container
                }}
                onBlur={e => handleBlur(e)}
                placeholder={placeholder ? placeholder : "Выберите дату"}
                inputProps={{ readOnly: true, name: name, disabled }}
                onDayChange={day => handleChange(day)}
                value={value ? moment(value * 1000).format("DD MMMM YYYY") : ""}
                format="DD MMMM YYYY"
                // showOverlay={true}
                dayPickerProps={{
                  locale: "ru",
                  localeUtils: MomentLocaleUtils,
                  name,
                  ...datePickerOptions
                }}
              />
              <Status messageType={tooltip.messageType} />
            </div>
          </MadTooltip>
        )
      }
      case "select": {
        const { options, value, isClearable, onInputChange, loading, noOptionsMessage } = selectOptions

        const handleChange = ({ value, name }) => {
          setTooltip({ ...tooltip, ...{ messageType: value && value.value ? "success" : "info" } })
          props.handleChange({
            value: value ? value.value : "",
            name,
            label: value ? value.label : null,
            isValid: !!value
          })
        }
        return (
          <MadTooltip data={tooltip} enabled={enableTooltip}>
            <div tabIndex={-1}>
              <MadSelect
                name={name}
                isClearable={isClearable}
                onFocus={handleFocus}
                onBlur={handleBlur}
                options={options}
                placeholder={placeholder}
                noOptionsMessage={noOptionsMessage}
                onChange={(value, name) => handleChange({ value, name })}
                value={options.find(option => option.value == value)}
                onInputChange={onInputChange ? value => onInputChange(value) : null}
                isDisabled={disabled}
                loading={loading}
              />
            </div>
          </MadTooltip>
        )
      }
      case "numberFormat": {
        const {
          suffix,
          thousandSeparator,
          format,
          mask,
          type,
          allowNegative = false,
          allowZeroStart = false
        } = numberFormatOptions
        return (
          <MadTooltip data={tooltip} enabled={enableTooltip}>
            <div className="mad-form__input" tabIndex={-1}>
              <NumberFormat
                name={name}
                className="mad-form__control"
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder ? placeholder : "Заполните " + label}
                value={value}
                disabled={disabled}
                suffix={suffix}
                mask={mask}
                allowNegative={allowNegative}
                //todo: nado dovesty etu temu do uma tk esy ya napiwu "-0" ona ego propustit nu i drugie vozmohznie problemy
                isAllowed={values => allowZeroStart || !values.value.startsWith("0")}
                format={format}
                type={type}
                thousandSeparator={thousandSeparator}
                onValueChange={values => handleValueChange(values, name, validateAfter)}
                decimalScale={2}
              />
              <Status messageType={tooltip.messageType} />
            </div>
          </MadTooltip>
        )
      }
      default: {
        /**
         * если inputType не указан то считать поумолчанию inputType=text
         * tabIndex = -1 нужно чтобы при нажатии Tab он делал фокус не не mad-form__input
         * (ему tabIndex = 0 присваивает TippyJS) а на следующий input
         */
        return (
          <MadTooltip data={tooltip} enabled={enableTooltip}>
            <div className="mad-form__input" tabIndex={-1}>
              <Icon />
              <input
                tabIndex={0}
                name={name}
                autoComplete={props.autoComplete}
                className="mad-form__control"
                onChange={e => handleChange(e, validateAfter)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder ? placeholder : label}
                value={value}
                disabled={disabled}
              />
              <Status messageType={tooltip.messageType} />
            </div>
          </MadTooltip>
        )
      }
    }
  }
  const Label = () => {
    if (!showLabel) {
      return <></>
    }
    /** Если поле обязательно. Надпись "необязательно" не добавляем */
    if (_.indexOf(props.rules, "required") > -1) {
      return (
        <div className="mad-form__label">
          <label>{label}</label>
        </div>
      )
    }

    return (
      <div className="mad-form__label">
        <label>{label}</label>
        {showOptionalLabel && <span className="mad-form-optional">{__.t("optional")}</span>}
      </div>
    )
  }
  /** NOTE: не пытайтесь вытащить MadTootip сюда т.к. у это компонента должен быть только один child. в нашем случае mad-form__input */
  return (
    <I18nextProvider i18n={translations}>
      <div className={"mad-form" + (disabled ? " mad-form--disabled" : "")}>
        <Label />
        {renderInput()}
      </div>
    </I18nextProvider>
  )
}
export default InputStyleOne
