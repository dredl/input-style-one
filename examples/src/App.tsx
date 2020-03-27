import React, { useState } from "react"
import "./App.css"
import InputStyleOne from "../../src"
// import logo from './logo.svg';

import moment from "moment"
const App: React.FC = () => {
  const options = []
  for (let i = 1; i < 1000; i = i + 1) {
    options.push({
      value: `select_${i}`,
      label: `Option ${i}`
    })
  }
  const [value, setValue] = useState("")
  const [card, setCard] = useState("")
  const [startPrice, setStartPrice] = useState({ value: "", isValid: false })
  const handleChange = ({ name, value }, callback, isValid) => {
    callback({ value, isValid })
  }
  const [phone, setPhone] = useState({ value: "+77025775735", isValid: false })
  const [grainReceipts, setGrainReceipts] = useState([{ value: "", isValid: false }, { value: "", isValid: false }])
  const [website, setWebsite] = useState({ value: "", isValid: false })
  const handleReceipts = ({ value, key }, isValid) => {
    let newArr = [...grainReceipts]
    console.log(newArr)
    newArr[key] = { value, isValid }
    setGrainReceipts(newArr)
  }
  const validateWebsite = value => {
    if (value == "kot") {
      return {
        isValid: false,
        description: "This is custom error description and validation of inputstyleone "
      }
    }
    return {
      isValid: true,
      description: "All is Fine"
    }
  }
  const [regionId, setRegionId] = useState(1)
  const submitSomething = () => {}
  console.log(phone.value)
  const [searchValue, setSearchValue] = useState("")
  const onInputChange = value => {
    setSearchValue(value)
  }
  const [unix, setUnix] = useState("")
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hello World</p>

        <div className="App-panel">
          <InputStyleOne
            name="receipt"
            iconUrl="../../assets/cross-imput.svg"
            infoDescription="Custom Info Description Custom Info Description Custom Info Description Custom Info Description Custom Info Description"
            // disabled={true}
            inputType="password"
            // enableTooltip={false}
            label="website"
            value={website.value}
            handleChange={({ value, isValid }) => setWebsite({ value, isValid })}
            // rules={["required", "url", ["custom", validateWebsite]]}
          />
          <button onClick={submitSomething}>Submit</button>
          {grainReceipts.map((gr, key) => {
            return (
              <InputStyleOne
                name="receipt"
                key={key}
                // enableTooltip={false}
                label="№ зерновой расписки"
                value={gr.value}
                handleChange={({ value, isValid }) => handleReceipts({ value, key }, isValid)}
                rules={["required"]}
              />
            )
          })}
          {/* <InputStyleOne
            name="startDate"
            placeholder="Выберите страну"
            // enableTooltip={false}
            showLabel={false}
            label="Выберите страну"
            inputType="multi-select"
            value={[options[0], options[1]]}
            infoDescription={"QUQU epta"}
            handleChange={({ name, selectValues, isValid }) => console.log({ name, selectValues, isValid })}
            rules={["required"]}
            selectOptions={{
              options: options,
              onInputChange: value => onInputChange(value),
              noOptionsMessage: (
                <span>
                  {searchValue} not found. <span onClick={e => console.log("clicked")}>add it?</span>
                </span>
              ),
              value: [options[0], options[1]]
            }}
          /> */}
          <InputStyleOne
            name="startDate"
            placeholder="Выберите страну"
            // enableTooltip={false}
            showLabel={false}
            label="Дата погрузки товара"
            inputType="select"
            value={options[0]}
            // disabled={true}
            infoDescription={"QUQU epta"}
            handleChange={({ value, name, label, isValid }) => console.log({ value, name, label }, isValid)}
            rules={["required"]}
            selectOptions={{
              options: options,
              value: regionId,
              noOptionsMessage: "Strana ne naidena"
            }}
          />
          <InputStyleOne
            name="startDate"
            label="Дата погрузки товара"
            value={value}
            handleChange={({ isValid, value }) => setStartPrice(value)}
            rules={["required", ["lte", 500], "integer", ["maxString", 11]]}
          />
          <InputStyleOne
            inputType="numberFormat"
            iconUrl="../../assets/cross-imput.svg"
            // disabled={true}
            name="startPrice"
            label="Стартовая цена"
            value={startPrice.value}
            handleChange={({ value, name, isValid }) => handleChange({ value, name }, setStartPrice, isValid)}
            rules={["required", , "float", ["maxString", 11]]}
            numberFormatOptions={{
              suffix: " KZT",
              thousandSeparator: true,
              allowNegative: true,
              allowZeroStart: false
            }}
          />
          <InputStyleOne
            inputType="numberFormat"
            handleChange={({ value, name, isValid }) => handleChange({ value, name }, setCard, isValid)}
            name="cardNumber"
            disabled={true}
            value={card}
            label="Номер карты"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            rules={["required", "integer", "card"]}
            validateAfter={16}
            numberFormatOptions={{
              format: "#### #### #### ####",
              mask: "_"
            }}
          />
          <InputStyleOne
            inputType="numberFormat"
            handleChange={({ value, name, isValid }) => handleChange({ value, name }, setPhone, isValid)}
            name="phoneNumber"
            value={phone.value}
            label="Номер телефона"
            validateAfter={10}
            placeholder="+7(XXX)XXX-XX-XX"
            rules={["required", "integer"]}
            numberFormatOptions={{
              format: "+7(###)###-##-##",
              mask: "_"
            }}
          />
          <InputStyleOne
            name="startDate"
            iconUrl="../../assets/cross-imput.svg"
            label="Дата погрузки товара"
            value={value}
            handleChange={({ value, isValid }) => setValue(value)}
            rules={["required", "float"]}
          />
          <InputStyleOne
            name="startDate"
            label="Дата погрузки товара"
            inputType="textArea"
            value={value}
            // disabled={true}
            showLabel={false}
            // showOptionalLabel={false}
            handleChange={({ value, isValid }) => setValue(value)}
            rules={["required"]}
          />
          <InputStyleOne
            name="startDate"
            label="Дата начала торгов"
            inputType="datePicker"
            value={unix}
            handleChange={({ value, isValid }) => setUnix(value)}
            rules={["required"]}
            datePickerOptions={{
              disabledDays: { before: moment(moment().add(3, "days")).toDate() },
              initialMonth: moment(moment().add(3, "days")).toDate()
            }}
          />
          {/* <InputStyleOne
            name="startDate"
            label="Дата начала торгов"
            inputType="datePicker"
            value={unix}
            handleChange={({ value, name, isValid, label }) => {
              console.log("value", value)
              setUnix(value)
            }}
            rules={["required"]}
            iconUrl="../../assets/cross-imput.svg"
            datePickerOptions={{
              disabledDays: [{ before: moment(moment().add(3, "days")).toDate() }, { daysOfWeek: [0, 6] }],
              // disabledDays: { before: moment(moment().add(3, "days")).toDate() }, //(day => day <= moment().add(3, "days"))
              initialMonth: moment(moment().add(3, "days")).toDate(),
              overlayPosition: "top"
            }}
          /> */}
          <InputStyleOne
            name="startDate"
            // layout="one"
            placeholder="Выберите страну"
            // enableTooltip={false}
            label="Дата погрузки товара"
            inputType="select"
            value={options.find(item => item.value == value)}
            handleChange={({ value, name, label, isValid }) => setValue(value)}
            rules={["required"]}
            selectOptions={{
              options: options,
              noOptionsMessage: "Strana ne naidena"
            }}
          />
        </div>
      </header>
    </div>
  )
}

export default App
