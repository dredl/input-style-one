import React, { Component, Fragment } from "react"
import Select, { components } from "react-select"
import "./index.scss"
import ShivU from "../../assets/ShivU.svg"
import ShivD from "../../assets/ShivD.svg"
// const ShivU = ""
// const ShivD = ""
const StdSpinner = () => {
  return (
    <div className="mad-uploader-spinner">
      <div className="sk-three-bounce">
        <div className="sk-bounce-1 sk-child" />
        <div className="sk-bounce-2 sk-child" />
        <div className="sk-bounce-3 sk-child" />
      </div>
    </div>
  )
}

const NoOptionsMessage = props => {
  return (
    <components.NoOptionsMessage {...props}>
      <span>Пусто</span>
    </components.NoOptionsMessage>
  )
}

const LoadingMessage = props => {
  return (
    <components.LoadingMessage {...props}>
      <StdSpinner />
    </components.LoadingMessage>
  )
}

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {!props.selectProps.value ? (
          props.selectProps.menuIsOpen ? (
            <img src={ShivU} alt="" style={{ width: 15, height: 15 }} />
          ) : (
            <img src={ShivD} alt="" style={{ width: 15, height: 15 }} />
          )
        ) : !props.selectProps.isClearable ? (
          <img src={ShivD} alt="" style={{ width: 15, height: 15 }} />
        ) : (
          <div />
        )}
      </components.DropdownIndicator>
    )
  )
}
const ClearIndicator = props => {
  const {
    children = <img src="/assets/cross-imput.svg" style={{ width: 15 }} alt="" />,
    getStyles,
    innerProps: { ref, ...restInnerProps }
  } = props
  return (
    <Fragment>
      <div {...restInnerProps} ref={ref} style={getStyles("clearIndicator", props)}>
        <div style={{ cursor: "pointer" }}>{children}</div>
      </div>
    </Fragment>
  )
}
const MadSelect = ({
  isRequired = false,
  label = null,
  name,
  options,
  value = null,
  isDisabled = false,
  onChange,
  onFocus = null,
  onBlur = null,
  isClearable = true,
  placeholder = "Выберите",
  onInputChange = null,
  loading = null
}) => {
  return (
    <div className="mad-form-group">
      {label && (
        <label className="mad-form-label">
          {label}
          {isRequired && !isDisabled && <span style={{ color: "red" }}> *</span>}
        </label>
      )}
      <Select
        isLoading={loading}
        options={options}
        name={name}
        classNamePrefix="mad-select"
        isDisabled={isDisabled}
        isClearable={isClearable}
        onChange={e => onChange(e, name)}
        styles={styles}
        onFocus={onFocus ? e => onFocus(e) : null}
        onBlur={onBlur ? e => onBlur(e) : null}
        onInputChange={onInputChange ? value => onInputChange(value) : null}
        components={{ DropdownIndicator, ClearIndicator, NoOptionsMessage, LoadingMessage }}
        defaultValue={value}
        placeholder={placeholder}
      />
    </div>
  )
}
const customStyles = {
  control: (base, state) => ({
    ...base,
    "height": "40px",
    "min-height": "40px"
  })
}

const styles = {
  control: (provided, state) => ({
    ...provided,
    "&:hover": {
      borderColor: !state.isFocused ? "#B3B3B3" : "#808080"
    },
    "border": !state.isFocused ? "2px solid #B3B3B3" : "2px solid #808080",
    "borderRadius": "0.25rem",
    "boxShadow": "none"
  }),
  placeholder: (provided, state) => ({
    ...provided,
    "color": "#B3B3B3",
    "font-family": "dinpro-med"
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none"
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided
    // padding: "8px 10px 8px 8px"
  }),
  option: (provided, state) => ({
    ...provided,
    ":active": {
      backgroundColor: state.isSelected ? "#F2F2F2" : "#F2F2F2"
    },
    "backgroundColor": state.isSelected ? "#F2F2F2" : state.isFocused ? "#F2F2F2" : "transparent",
    "color": state.isDisabled ? "black" : state.isSelected ? "black" : "inherit"
  }),
  menuList: (provided, state) => ({
    ...provided,
    "::-webkit-scrollbar-track": {
      "margin-top": 0
    }
  })
}
export default MadSelect
