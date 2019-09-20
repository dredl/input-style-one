## WExport InputStyleOne
React-based input component, espessially created for WExport 2.0 project. 🚀

### This component include following input types based on other popular npm packages:
+ **TEXT INPUT** - simple input with wexport based styles
+ **TEXTAREA** - thanks to author of npm package ["react-textarea-autosize"](https://www.npmjs.com/package/react-textarea-autosize)
+ **SELECT** - thanks to author of npm package ["react-select"](https://www.npmjs.com/package/react-select)
+ **NUMBER FORMAT** - thanks to author of npm package ["react-number-format"](https://www.npmjs.com/package/react-number-format)
+ **DAY PICKER** - thanks to author of npm package ["react-day-picker"](https://www.npmjs.com/package/react-day-picker)

### Installation
```sh
$ npm install input-style-one
```

## Props
+ `@required`
  + `label` - Label text above the input tag
  + `name` - name property of input tag
  + `handleChange({name, value, label, isValid} => void)` - HandleChange event of input. 
    + `value` - value of input tag
    + `name` - name of input tag. Used on this.setState([name]: value). Not necessary if you use React Hooks 
    + `label` - used only when `inputType="select"`. this value return the select component label. Sometimes it is necessary to store the label of selected value. Example: `selectOptions: [{value:1, label: "Option One"}, {value: "2", label: "Options Two"}]`
    + `isValid` - return `true` if input satisfy all rules.
+ `@optional`
  + `layout?` - `null` by default. It means that component always keep structure [`label` `input`]. If `layout="one"`, `label` above `input` will be hidden, `input` field will be with icon `iconUrl` property 
  + `enableTooltip?` - `true` by default. Enable or dirable left side Popover
  + `inputType?` - `text` by default. Available options: `select`, `password`, `textArea`, `datePicker` and `numberFormat`
  + `disabled?` - `false` by default. Set this prop `true` whenever input should be sidabled
  + `autocomplete?` - `true` by default. Set this prop `true` whenever html `autocomplete` property should be enabled/disabled
  + `placeholder?` - equals to `label` by default.
  + `minRows?` - minRow prop of text area autosize package. Will be moved to `textAreaOptions` in the future
  + `maxRows?` - maxRow prop of text area autosize package. Will be moved to `textAreaOptions` in the future
  + `infoDescription?` - pass "Custom information" message to tooltip if needed
  + `iconUrl?` - used only when `layout="one"` and `inputType="text"`
  + `rules` - Array of rules where input value should be validated. Available rules:
    + `required`
    + `email`
    + `card`
    + `integer`
    + `float`
    + `[maxString, <integer>]` - max symbols on input value
    + `[compare, <any>]` - compare input value with definite variable. Example: `repeatPassword`
    + `[minAmountValue, <number>]` - specific rule where minimal amount validated
    + `[lte, <number>]` - check whenever input value less or equal than specific number 
    + `[gte, <number>]` - check whenever input value greater or equal than specific number
    + `[custom, <function>]` - check whenever custom validation is realized. example:
      ```javascript
      const validateUsernameExist = (value) => {
        const existUser = "example@example.com"
        if (value == existUser) {
          return {
            isValid: false,
            description: "This user is already exist in system"
          }
        } else {
          return {
            isValid: true,
            description: "All is Fine"
          }
        }
      }

      ...
      rules={['required', 'email', ['custom', validateUsernameExist]]}

      ```
    + Now we have following rules but they will grow in the future 😆
  + `datePickerOptions` - all props related to DayPickerInput packages. All available props see ["react-day-picker"](https://www.npmjs.com/package/react-day-picker) package. Example: `disabledDays`, `initialMonth`
  + `selectOptions` - all props related to ReactSelect packages. All available props see ["react-select"](https://www.npmjs.com/package/react-select) packages. Example: `options`, `value`, `isClearable` 

### The are a little ["demo"](https://codesandbox.io/s/relaxed-hermann-emf7d) how to use InputStyleOne component in project. In basic issues, **IT'S RECOMMENDED** to use functions (`handleChange`, `isValidFields`) described in demo. But if you know better approach, you are welcome :) If not, just do `Ctrl+A Ctrl+C Ctrl+V` 😆