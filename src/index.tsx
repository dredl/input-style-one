import React, { useState, useEffect } from "react"
import MadTooltip from "./tooltip"
import validator from "validator"
import _ from "lodash"
import __ from "i18next"
import "./index.scss"
import Textarea from "react-textarea-autosize"
import moment from "moment"
import DayPickerInput from "react-day-picker/DayPickerInput"
// import MomentLocaleUtils from "react-day-picker/moment"
import 'react-day-picker/lib/style.css';
import MadSelect from "./select"
import NumberFormat from "react-number-format"
import {I18nextProvider, Trans} from 'react-i18next'
import translations from './i18n'
import RedSupCross from "../assets/RedSupCross.svg"
import GreenSupGal from "../assets/GreenSupGal.svg"
interface IInputStyleOne {
  //required
  name: string
  label: string
  value: any
  handleChange(e: any, isValid: boolean): void

  //optional
  layout?: string
  inputType?: string
  disabled?: boolean
  autoComplete?: string
  placeholder?: string
  minRows?: number
  maxRows?: number
  tooltip?: {
    enabled: boolean
    isVisible: boolean
    title: string
    description: string
  }
  iconUrl?: string
  rules?: any //Array<string>
  datePickerOptions?: any
  selectOptions?: any

  numberFormatOptions?: any
}

/**
 * Рассмотреть вариант изготовления этого компонента Stateless тк. по мне это вполне реально
 * PRIME4ANIE: kogda my pomewaem v component MadTooltip.. nuzhno obora4ivat' ego toka v odin tag.. naprimer <div>
 *   inache vse posleduuwie tooltipy v forme rabotat' ne budut
 */
const InputStyleOne: React.FC<IInputStyleOne> = (props) => {
  const [tooltip, setTooltip] = useState({
    enabled: true,
    isVisible: false,
    title: "",
    description: "",
    messageType: "info"
  })

  const [status, setStatus] = useState("info")

  useEffect(() => {
    if (!props.tooltip) {
      setTooltip({
        ...tooltip,
        description: __.t("tooltipDescription", { attribute: props.label }),
        title: props.label
      })
      const { value, rules } = props

      if (value && !rules) {
      }

      if (value && rules) {
        validateRules(rules, value)
      }
    }
  }, [])


  //Вынес в отдельную ф-ю, т.к будет вызызаться в случаях если value уже существует
  const validateRules = (rules, value) => {
    let isValid = true
    value = value.toString() // poidee ne dolzhen etogo delat'.. no kod lomaetsya kada v mul'tiforme nazhimaew Back
    _.forEach(rules, rule => {
      switch (true) {
        case typeof rule === "string":
          switch (rule) {
            case "required":
              if (validator.isEmpty(value)) {
                setStatus('error')
                setTooltip({
                  ...tooltip,
                  description: __.t("tooltipDescriptionEmpty", { attribute: tooltip.title }),
                  messageType: "error"
                })
                isValid = false
              }
              break
            case "email":
              if (!validator.isEmail(value) && !validator.isEmpty(value)) {
                setStatus('error')
                setTooltip({
                  ...tooltip,
                  description: __.t("tooltipDescriptionIncorrect", { attribute: tooltip.title }),
                  messageType: "error"
                })
                isValid = false
              }
              break

            case "integer":
              if (!validator.isInt(value) && !validator.isEmpty(value)) {
                setStatus('error')
                setTooltip({
                  ...tooltip,
                  description: "Должен быть целым числом",
                  messageType: "error"
                })
                isValid = false
              }
              break
          }
          break

        case Array.isArray(rule):
          switch (rule[0]) {
            case "max":
              if (!validator.isLength(value, { max: rule[1] })) {
                setStatus('error')
                setTooltip({
                  ...tooltip,
                  description: "Количество символов превышает максималку",
                  messageType: "error"
                })
                isValid = false
              }
              break

            case "compare":
              if (value != rule[1]) {
                setStatus('error')
                setTooltip({
                  ...tooltip,
                  description: __.t("tooltipDescriptionPasswordMatch"),
                  messageType: "error"
                })
                isValid = false
              }
              break

            case "minAmountValue":
              if (value < rule[1]) {
                setStatus('error')
                setTooltip({
                  ...tooltip,
                  description: "Объем товара должен быть не менее 500 тонн",
                  messageType: "error"
                })
                isValid = false
              }
              break
            case "minValue":
              if (parseInt(value) > parseInt(rule[1])) {
                setStatus('error')
                setTooltip({
                  ...tooltip,
                  description: "значение должно быть меньше или равно " + rule[1],
                  messageType: "error"
                })
                isValid = false
              }
              break
            case "gte":
              if (parseInt(value) < parseInt(rule[1])) {
                setStatus('error')
                setTooltip({
                  ...tooltip,
                  description: "значение должно быть больше или равно " + rule[1],
                  messageType: "error"
                })
                isValid = false
              }
              break
          }
          break
      }
    })

    if (isValid) {
      setStatus('success')
      setTooltip({
        ...tooltip,
        description: __.t("tooltipDescriptionTrue", { attribute: tooltip.title }),
        messageType: "success"
      })
      isValid = false
    }

    return isValid
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { value } = e.target
    const rules = props.rules

    const isValid = validateRules(rules, value)
    props.handleChange(e, isValid)
  }

  // cb ф-я NurmerFormat, вынес отдельно т.к отличается передаваемые параметры
  const handleValueChange = (values) => {
    const { value } = values
    const { rules } = props

    const isValid = validateRules(rules, value)
    props.numberFormatOptions.onValueChange(value, isValid)
  }

  const handleFocus = (e) => {
    e.preventDefault()
    setTooltip({ ...tooltip, isVisible: true, messageType: status })
  }

  const handleBlur = (e) => {
    e.preventDefault()
    setTooltip({ ...tooltip, isVisible: false, messageType: status })
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
          <MadTooltip data={tooltip}>
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
            <ImgIcon messageType={status} />
          </div>
        </div>
      )
    }

    if (props.inputType == "password") {
      return (
        <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
          <Label />
          <MadTooltip data={tooltip}>
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
              <ImgIcon messageType={status} />
            </div>
          </MadTooltip>
        </div>
      )
    }

    if (props.inputType == "textArea") {
      return (
        <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
          <Label />
          <MadTooltip data={tooltip}>
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
                minRows={props.minRows ? props.minRows : null}
                maxRows={props.maxRows ? props.maxRows : null}
              />

              <div className="mad-form-status">
                <ImgIcon messageType={status} />
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
          <MadTooltip data={tooltip}>
            <div onFocus={e => handleFocus(e)} onBlur={e => handleBlur(e)}>
              <DayPickerInput
                onBlur={e => handleBlur(e)}
                placeholder={props.placeholder ? props.placeholder : "Выберите дату"}
                inputProps={{ readOnly: true, name: props.name }}
                onDayChange={day => props.datePickerOptions.onDayChange(moment(day).unix(), props.name, true)}
                value={props.value ? moment(props.value * 1000).format("DD MMMM YYYY") : ""}
                format="DD MMMM YYYY"
                dayPickerProps={{
                  locale: "ru",
                  name,
                  ...props.datePickerOptions
                }}
              />
              <div className="mad-form-status">
                <ImgIcon messageType={status} />
              </div>
            </div>
          </MadTooltip>
        </div>
      )
    }

    if (props.inputType == "select") {
      const { options, onChange, value, isClearable, onInputChange, loading } = props.selectOptions
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
          <MadTooltip data={tooltip}>
            <MadSelect
              name={props.name}
              isClearable={isClearable}
              onFocus={e => handleFocus(e)}
              onBlur={e => handleBlur(e)}
              options={options}
              //podumat' nuzhno li suda peredavat' isValid kak vo vseh sobitiyax handleChange
              onChange={(value, name) => onChange(value ? value.value : "", name, !!value, value ? value.label : null)}
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
      const { suffix, thousandSeparator } = props.numberFormatOptions
      return (
        <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
          <Label />
          <MadTooltip data={tooltip}>
            <NumberFormat
              name={props.name}
              className="mad-form-control"
              onFocus={e => handleFocus(e)}
              onBlur={e => handleBlur(e)}
              placeholder={props.placeholder ? props.placeholder : "Заполните " + props.label}
              value={props.value}
              disabled={props.disabled}
              suffix={suffix}
              thousandSeparator={thousandSeparator}
              onValueChange={values => handleValueChange(values)}
            />

            <div className="mad-form-status">
              <ImgIcon messageType={status} />
            </div>
          </MadTooltip>
        </div>
      )
    }
    // если inputType не указан то считать поумолчанию inputType=text
    return (
      <div className={"mad-form-group" + (props.disabled ? " disabled" : "")}>
        <Label />
        <MadTooltip data={tooltip}>
          <>
            <input
              name={props.name}
              // type={this.props.inputType}
              autoComplete={props.autoComplete}
              className="mad-form-control"
              onChange={(e: any) => handleChange(e)}
              onFocus={e => handleFocus(e)}
              onBlur={e => handleBlur(e)}
              placeholder={props.placeholder ? props.placeholder : props.label}
              value={props.value}
              disabled={props.disabled}
            />
            <div className="mad-form-status">
              <ImgIcon messageType={status} />
            </div>
          </>
        </MadTooltip>
      </div>
    )
  }

  return (
    <I18nextProvider i18n={translations}>
      {renderInput(props.layout)}
    </I18nextProvider>
  )
}

export default InputStyleOne
