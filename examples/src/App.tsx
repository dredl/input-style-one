import React, { useState } from "react"
import "./App.css"
import InputStyleOne from "../../src"
// import logo from './logo.svg';
import "react-day-picker/lib/style.css"
import moment from "moment"
const App: React.FC = () => {
  const options = []
  for (let i = 0; i < 1000; i = i + 1) {
    options.push({ value: i, label: `Option ${i}` })
  }
  const [value, setValue] = useState("")
  const [card, setCard] = useState("")
  const [startPrice, setStartPrice] = useState({ value: 0, isValid: false })
  const handleChange = ({ name, value }, callback, isValid) => {
    callback(value)
  }
  const [grainReceipts, setGrainReceipts] = useState([{ value: "", isValid: false }, { value: "", isValid: false }])
  const [website, setWebsite] = useState({ value: "", isValid: false })
  const handleReceipts = ({ value, key }, isValid) => {
    let newArr = [...grainReceipts]
    console.log(newArr)
    newArr[key] = { value, isValid }
    setGrainReceipts(newArr)
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hello World</p>

        <div className="App-panel">
          <InputStyleOne
            name="receipt"
            // enableTooltip={false}
            label="website"
            value={website.value}
            handleChange={({ value, isValid }) => setWebsite({ value, isValid })}
            rules={["url", "required"]}
          />
          {grainReceipts.map((gr, key) => {
            return (
              <InputStyleOne
                name="receipt"
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
            layout="one"
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
          <InputStyleOne
            name="startDate"
            label="Дата погрузки товара"
            value={value}
            handleChange={({ isValid, value }) => setStartPrice(value)}
            rules={["required", ["lte", 500], "integer", ["maxString", 11]]}
          />
          <InputStyleOne
            inputType="numberFormat"
            name="startPrice"
            label="Стартовая цена"
            value={startPrice.value}
            handleChange={({ value, name, isValid }) => handleChange({ value, name }, setStartPrice, isValid)}
            rules={["required", , "float", ["maxString", 11]]}
            numberFormatOptions={{
              suffix: " KZT",
              thousandSeparator: true
            }}
          />
          <InputStyleOne
            inputType="numberFormat"
            handleChange={({ value, name, isValid }) => handleChange({ value, name }, setCard, isValid)}
            name="cardNumber"
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
            name="startDate"
            layout="one"
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
            handleChange={({ value, isValid }) => setValue(value)}
            // rules={["required"]}
          />
          <InputStyleOne
            name="startDate"
            label="Дата начала торгов"
            inputType="datePicker"
            value={value}
            handleChange={({ value, name, isValid, label }) => console.log({ value, name, isValid, label })}
            rules={["required"]}
            datePickerOptions={{
              disabledDays: { before: moment(moment().add(3, "days")).toDate() }, //(day => day <= moment().add(3, "days"))
              initialMonth: moment(moment().add(3, "days")).toDate()
            }}
          />
        </div>
      </header>
    </div>
  )
}

export default App
