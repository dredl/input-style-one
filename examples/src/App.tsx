import React, { useState } from "react"
import "./App.css"
import InputStyleOne from "../../src"
// import logo from './logo.svg';
import "react-day-picker/lib/style.css"
import moment from "moment"
const App: React.FC = () => {
  const options = []
  for (let i = 1; i < 1000; i = i + 1) {
    options.push({ value: i, label: `Option ${i}` })
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

  const submitSomething = () => {}
  console.log(phone.value)
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hello World</p>

        <div className="App-panel">
          <InputStyleOne
            name="receipt"
            iconUrl="../../assets/cross-imput.svg"
            infoDescription="Custom Info Description"
            // disabled={true}
            // enableTooltip={false}
            label="website"
            value={website.value}
            handleChange={({ value, isValid }) => setWebsite({ value, isValid })}
            rules={["required", "url", ["custom", validateWebsite]]}
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
          <InputStyleOne
            name="startDate"
            placeholder="Выберите страну"
            // enableTooltip={false}
            showLabel={false}
            label="Дата погрузки товара"
            inputType="select"
            value={value}
            disabled={true}
            infoDescription={"QUQU epta"}
            handleChange={({ value, name, label, isValid }) => console.log({ value, name, label }, isValid)}
            rules={["required"]}
            selectOptions={{
              options: options,
              value: options[5].value,
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
            disabled={true}
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
            value={value}
            handleChange={({ value, name, isValid, label }) => console.log({ value, name, isValid, label })}
            rules={["required"]}
            disabled={true}
            datePickerOptions={{
              disabledDays: [{ before: moment(moment().add(3, "days")).toDate() }, { daysOfWeek: [0, 6] }],
              // disabledDays: { before: moment(moment().add(3, "days")).toDate() }, //(day => day <= moment().add(3, "days"))
              initialMonth: moment(moment().add(3, "days")).toDate(),
              overlayPosition: "top"
            }}
          />
          <InputStyleOne
            name="startDate"
            // layout="one"
            placeholder="Выберите страну"
            // enableTooltip={false}
            label="Дата погрузки товара"
            inputType="select"
            value={value}
            handleChange={({ value, name, label, isValid }) => console.log({ value, name, label }, isValid)}
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
