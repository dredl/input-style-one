import React, { useState } from "react"
import "./App.css"
import InputStyleOne from "../../src"
// import logo from './logo.svg';
import "react-day-picker/lib/style.css"
import moment from "moment"
const App: React.FC = () => {
  const options = [
    {
      value: 1,
      label: "Утренняя сессия"
    },
    {
      value: 2,
      label: "Дневная сессия"
    }
  ]
  const [value, setValue] = useState(1561984575)
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Hello World</p>

        <div className="App-panel">
          <InputStyleOne
            name="startDate"
            label="Дата погрузки товара"
            inputType="select"
            value={value}
            handleChange={(e, isValid) => setValue(e.target.value)}
            rules={["required"]}
            selectOptions={{
              options: options,
              onChange: (value, name, isValid) => setValue(value)
            }}
          />
          <InputStyleOne
            name="startDate"
            label="Дата погрузки товара"
            value={value}
            handleChange={(e, isValid) => setValue(e.target.value)}
            rules={["required"]}
          />
          <InputStyleOne
            name="startDate"
            layout="one"
            iconUrl="../../assets/cross-imput.svg"
            label="Дата погрузки товара"
            value={value}
            handleChange={(e, isValid) => setValue(e.target.value)}
            rules={["required"]}
          />
          <InputStyleOne
            name="startDate"
            label="Дата погрузки товара"
            inputType="textArea"
            value={value}
            handleChange={(e, isValid) => setValue(e.target.value)}
            rules={["required"]}
          />
          <InputStyleOne
            name="startDate"
            label="Дата начала торгов"
            inputType="datePicker"
            value={value}
            handleChange={(e, isValid) => null}
            rules={["required"]}
            datePickerOptions={{
              onDayChange: (value, name, isValid) => setValue(value),
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
