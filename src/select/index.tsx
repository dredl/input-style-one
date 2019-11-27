import React, { Component, Fragment } from "react"
import Select, { components } from "react-select"
import "./index.scss"
import __ from "i18next"
import ShivU from "../../assets/ShivU.svg"
import ShivD from "../../assets/ShivD.svg"
import CrossInput from "../../assets/cross-imput.svg"
import { VariableSizeList as List } from "react-window"

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
    children = <img src={CrossInput} style={{ width: 15 }} alt="" />,
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
  onMultiChange = null,
  onFocus = null,
  onBlur = null,
  isClearable = true,
  placeholder = "Выберите",
  onInputChange = null,
  loading = null,
  noOptionsMessage = null,
  isMulti = false
}) => {
  const GROUP_HEADER_HEIGHT = 10
  const ITEM_HEIGHT = 34

  /** Дефолтный MenuList очень медленно работает с большим массивом данных поэтому используем react-window*/
  const MenuList = props => {
    const { options, getValue } = props
    console.log(props.children.length)
    const [value] = getValue()

    const initialOffset = options.indexOf(value) * ITEM_HEIGHT

    const children = React.Children.toArray(props.children)

    function getOptionSize(option) {
      if (option && option.options) {
        return option.options.length * ITEM_HEIGHT + GROUP_HEADER_HEIGHT
      }
      return ITEM_HEIGHT
    }

    function getItemSize(i) {
      return getOptionSize(options[i])
    }
    const totalHeight = options.reduce((height, option) => {
      return height + getOptionSize(option)
    }, 0)
    const estimatedItemSize = totalHeight / options.length
    return (
      <List
        height={Math.min(totalHeight != 0 ? totalHeight : ITEM_HEIGHT, 140)}
        itemCount={children.length}
        itemSize={getItemSize}
        estimatedItemSize={estimatedItemSize}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    )
  }
  return (
    <>
      {label && (
        <label className="mad-form__label">
          {label}
          {isRequired && !isDisabled && <span style={{ color: "red" }}> *</span>}
        </label>
      )}
      <Select
        isLoading={loading}
        options={options}
        name={name}
        className={"mad-select" + (isMulti ? " mad-select--isMulti" : undefined)}
        classNamePrefix="mad-select"
        isDisabled={isDisabled}
        menuPlacement="auto"
        // menuPosition="fixed"
        // menuIsOpen={true}
        isMulti={isMulti}
        isClearable={isClearable}
        onChange={e => (!isMulti ? onChange(e, name) : onMultiChange(e, name))}
        styles={styles}
        noOptionsMessage={() => (noOptionsMessage ? noOptionsMessage : __.t("noOptions"))}
        onFocus={onFocus ? e => onFocus(e) : null}
        onBlur={onBlur ? e => onBlur(e) : null}
        onInputChange={onInputChange ? value => onInputChange(value) : null}
        components={{ DropdownIndicator, ClearIndicator, LoadingMessage, MenuList }}
        defaultValue={value} //4to budet pokazano pri inicializacii
        value={!isMulti ? value : undefined} //4to mojet byt' pri izmenenii. esly isMulti = true, value dolzhen byt' undefine inace multiselect ne budet rabotat'
        placeholder={placeholder}
      />
    </>
  )
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
    color: "#B3B3B3",
    fontFamily: "dinpro-med"
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
      backgroundColor: state.isSelected ? "#F2F2F2" : "#transparent"
    },
    ":hover": {
      backgroundColor: "#e6e6e6"
    },
    "backgroundColor": state.isSelected ? "#F2F2F2" : "transparent", //state.isFocused ? "#F2F2F2" : "transparent",
    "color": state.isDisabled ? "black" : state.isSelected ? "black" : "inherit"
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
    fontFamily: "dinpro-med"
  })
}
export default MadSelect
