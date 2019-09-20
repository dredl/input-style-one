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
import { I18nextProvider, Trans } from "react-i18next"
import translations from "./i18n"
import RedSupCross from "../assets/RedSupCross.svg"
import GreenSupGal from "../assets/GreenSupGal.svg"
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
  layout?: string
  enableTooltip?: boolean
  inputType?: string
  disabled?: boolean
  autoComplete?: string
  placeholder?: string
  minRows?: number
  maxRows?: number
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
      description: props.infoDescription
        ? props.infoDescription
        : __.t("tooltipDescription", { attribute: props.label }),
      title: props.label
    })
    const { value, rules } = props

    if (value && !rules) {
    }

    if (value && rules) {
      validateRules(rules, value)
    }
  }, [])

  //Вынес в отдельную ф-ю, т.к будет вызызаться в случаях если value уже существует
  const validateRules = (rules, value, validateAfter = 0) => {
    const { tooltipValidated, isValid } = validateInput(rules, value, tooltip, props.label, validateAfter)
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
  const handleValueChange = (values, validateAfter = 0) => {
    const { value } = values
    const isValid = validateRules(props.rules, value, validateAfter)
    props.handleChange({ value, name: "whatever", label: null, isValid })
  }

  const handleFocus = e => {
    e.preventDefault()
    setTooltip({ ...tooltip, isVisible: true, messageType: tooltip.messageType })
  }

  const handleBlur = e => {
    e.preventDefault()
    setTooltip({ ...tooltip, isVisible: false, messageType: tooltip.messageType })
  }

  const renderInput = (layout = null) => {
    const ImgIcon = ({ messageType }) => {
      if (messageType == "error") {
        return <img src={RedSupCross} alt="" />
      }

      if (messageType == "success") {
        return <img src={GreenSupGal} alt="" />
      }

      return <img src="" alt="" />
    }

    const Label = () => {
      if (_.indexOf(props.rules, "required") > -1) {
        return <label className="mad-form-label">{props.label}</label>
      }

      return (
        <div className="mad-form-labels">
          <label className="mad-form-label">{props.label}</label>
          <span className="mad-form-optional">{__.t("optional")}</span>
        </div>
      )
    }

    if (layout == "one") {
      if (props.inputType == "select") {
        // todo: nado kak nit' ne poboyatsya sdelat' prosto merge s MadSelect Componentom (<MadSekect {...props.selectOptions}>)
        const { options, onChange, value, isClearable, onInputChange, loading, noOptionsMessage } = props.selectOptions
        const { handleChange } = props
        let selectedValue = null
        if (_.find(options, { value })) {
          selectedValue = {
            value: value,
            label: _.find(options, { value }) ? _.find(options, { value }).label : ""
          }
        }

        return (
          <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
            <MadTooltip data={tooltip} enabled={props.enableTooltip}>
              <MadSelect
                name={props.name}
                isClearable={isClearable}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e)}
                options={options}
                noOptionsMessage={noOptionsMessage}
                onChange={(value, name) =>
                  props.handleChange({
                    value: value ? value.value : "",
                    name,
                    label: value ? value.label : null,
                    isValid: !!value
                  })
                }
                placeholder={props.placeholder}
                value={selectedValue}
                onInputChange={onInputChange ? value => onInputChange(value) : null}
                isDisabled={props.disabled}
                loading={loading}
              />
            </MadTooltip>
          </div>
        )
      }
      return (
        <div className="input__item">
          <div className="input__item-icon icons">
            {props.iconUrl && (
              <>
                <img src={props.iconUrl} alt="" />
                <span />
              </>
            )}
          </div>
          <MadTooltip data={tooltip} enabled={props.enableTooltip}>
            <input
              name={props.name}
              type={props.inputType}
              onChange={(e: any) => handleChange(e)}
              onFocus={e => handleFocus(e)}
              onBlur={e => handleBlur(e)}
              className="input-control-s"
              placeholder={props.label}
              value={props.value}
              autoComplete={props.autoComplete}
            />
          </MadTooltip>
          <div className={"input__item-status"}>
            <ImgIcon messageType={tooltip.messageType} />
          </div>
        </div>
      )
    }

    if (props.inputType == "password") {
      return (
        <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
          <Label />
          <MadTooltip data={tooltip} enabled={props.enableTooltip}>
            <>
              <input
                name={props.name}
                type={props.inputType}
                autoComplete={props.autoComplete}
                className="mad-form-control"
                onChange={(e: any) => handleChange(e)}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e)}
                placeholder={props.label}
                value={props.value}
                disabled={props.disabled}
              />
              <div className="mad-form-status">
                <ImgIcon messageType={tooltip.messageType} />
              </div>
            </>
          </MadTooltip>
        </div>
      )
    }

    if (props.inputType == "textArea") {
      return (
        <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
          <Label />
          <MadTooltip data={tooltip} enabled={props.enableTooltip}>
            <>
              <Textarea
                className="mad-form-control"
                name={props.name}
                value={props.value}
                autoComplete={props.autoComplete}
                onChange={e => handleChange(e)}
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e)}
                placeholder={props.placeholder ? props.placeholder : "Заполните " + props.label}
                disabled={props.disabled}
                minRows={props.minRows ? props.minRows : 3}
                maxRows={props.maxRows ? props.maxRows : 10}
              />

              <div className="mad-form-status">
                <ImgIcon messageType={tooltip.messageType} />
              </div>
            </>
          </MadTooltip>
        </div>
      )
    }

    if (props.inputType == "datePicker") {
      return (
        <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
          <Label />
          <MadTooltip data={tooltip} enabled={props.enableTooltip}>
            <div onFocus={e => handleFocus(e)} onBlur={e => handleBlur(e)}>
              <DayPickerInput
                onBlur={e => handleBlur(e)}
                placeholder={props.placeholder ? props.placeholder : "Выберите дату"}
                inputProps={{ readOnly: true, name: props.name }}
                onDayChange={day =>
                  props.handleChange({ value: moment(day).unix(), name: props.name, isValid: true, label: null })
                }
                value={props.value ? moment(props.value * 1000).format("DD MMMM YYYY") : ""}
                format="DD MMMM YYYY"
                dayPickerProps={{
                  locale: "ru",
                  localeUtils: MomentLocaleUtils,
                  name,
                  ...props.datePickerOptions
                }}
              />
              <div className="mad-form-status">
                <ImgIcon messageType={tooltip.messageType} />
              </div>
            </div>
          </MadTooltip>
        </div>
      )
    }

    if (props.inputType == "select") {
      const { options, onChange, value, isClearable, onInputChange, loading, noOptionsMessage } = props.selectOptions
      let selectedValue = null
      if (_.find(options, { value })) {
        selectedValue = {
          value: value,
          label: _.find(options, { value }) ? _.find(options, { value }).label : ""
        }
      }

      return (
        <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
          <Label />
          <MadTooltip data={tooltip} enabled={props.enableTooltip}>
            <MadSelect
              name={props.name}
              isClearable={isClearable}
              onFocus={e => handleFocus(e)}
              onBlur={e => handleBlur(e)}
              options={options}
              placeholder={props.placeholder}
              noOptionsMessage={noOptionsMessage}
              onChange={(value, name) =>
                props.handleChange({
                  value: value ? value.value : "",
                  name,
                  label: value ? value.label : null,
                  isValid: !!value
                })
              }
              value={selectedValue}
              onInputChange={onInputChange ? value => onInputChange(value) : null}
              isDisabled={props.disabled}
              loading={loading}
            />
          </MadTooltip>
        </div>
      )
    }

    if (props.inputType == "numberFormat") {
      const { suffix, thousandSeparator, format, mask, type } = props.numberFormatOptions
      return (
        <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
          <Label />
          <MadTooltip data={tooltip} enabled={props.enableTooltip}>
            <>
              <NumberFormat
                name={props.name}
                className="mad-form-control"
                onFocus={e => handleFocus(e)}
                onBlur={e => handleBlur(e)}
                placeholder={props.placeholder ? props.placeholder : "Заполните " + props.label}
                value={props.value}
                disabled={props.disabled}
                suffix={suffix}
                mask={mask}
                format={format}
                type={type}
                thousandSeparator={thousandSeparator}
                onValueChange={values => handleValueChange(values, props.validateAfter)}
                decimalScale={2}
              />

              <div className="mad-form-status">
                <ImgIcon messageType={tooltip.messageType} />
              </div>
            </>
          </MadTooltip>
        </div>
      )
    }
    // если inputType не указан то считать поумолчанию inputType=text
    return (
      <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
        <Label />
        <MadTooltip data={tooltip} enabled={props.enableTooltip}>
          <>
            <input
              name={props.name}
              autoComplete={props.autoComplete}
              className="mad-form-control"
              onChange={(e: any) => handleChange(e, props.validateAfter)}
              onFocus={e => handleFocus(e)}
              onBlur={e => handleBlur(e)}
              placeholder={props.placeholder ? props.placeholder : props.label}
              value={props.value}
              disabled={props.disabled}
            />
            <div className="mad-form-status">
              <ImgIcon messageType={tooltip.messageType} />
            </div>
          </>
        </MadTooltip>
      </div>
    )
  }

  return <I18nextProvider i18n={translations}>{renderInput(props.layout)}</I18nextProvider>
}

export default InputStyleOne
