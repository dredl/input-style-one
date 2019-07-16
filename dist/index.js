'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Tippy = _interopDefault(require('@tippy.js/react'));
require('tippy.js/dist/tippy.css');
var validator = _interopDefault(require('validator'));
var _ = _interopDefault(require('lodash'));
var __ = _interopDefault(require('i18next'));
var Textarea = _interopDefault(require('react-textarea-autosize'));
var moment = _interopDefault(require('moment'));
var DayPickerInput = _interopDefault(require('react-day-picker/DayPickerInput'));
var MomentLocaleUtils = _interopDefault(require('react-day-picker/moment'));
require('react-day-picker/lib/style.css');
var Select = require('react-select');
var Select__default = _interopDefault(Select);
var NumberFormat = _interopDefault(require('react-number-format'));
var reactI18next = require('react-i18next');
var LanguageDetector = _interopDefault(require('i18next-browser-languagedetector'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".tippy-popper[x-placement^=bottom] .tippy-arrow{border-top-color:#191919}.tippy-tooltip{padding:0!important;border-radius:5px;background-color:#191919}.tippy-arrow{border-top-color:#191919}.tippy-tooltip .tippy-arrow{border-bottom-color:#191919}.tippy-popper[x-placement^=left] .tippy-arrow{border-left-color:#191919}.tippy-popper[x-placement^=right] .tippy-arrow{border-right-color:#191919}.mad-tooltip{padding:10px;border-radius:5px}.mad-tooltip.success{border-bottom:5px solid #52c745}.mad-tooltip.error{border-bottom:5px solid red}.mad-tooltip.info{border-bottom:5px solid #ffd012}.mad-tooltip__content{display:flex;flex-direction:column}.mad-tooltip__title{line-height:1;font-size:13px;font-family:dinpro-bold;text-align:left}.mad-tooltip__description{margin-top:5px;font-size:13px;font-family:dinpro-med;text-align:left}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy90b29sdGlwL2luZGV4LnNjc3MiLCJzcmMvc3R5bGVzL19mb250cy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLGdEQUVDLHdCQUhjLENBTWYsZUFDRSxtQkFBcUIsQ0FDckIsaUJBQWtCLENBQ2xCLHdCQUF5QixDQUszQixhQUNFLHdCQWZhLENBaUJkLDRCQUNDLDJCQWxCYSxDQW9CZiw4Q0FDRSx5QkFyQmEsQ0F1QmYsK0NBQ0UsMEJBeEJhLENBMkJmLGFBQ0UsWUFBYSxDQVViLGlCQUFrQixDQVhwQixxQkFHSSwrQkFBZ0MsQ0FIcEMsbUJBTUksMkJBQWdDLENBTnBDLGtCQVNJLCtCQUFnQyxDQUdsQyxzQkFDRSxZQUFhLENBQ2IscUJBQXNCLENBRXhCLG9CQUNFLGFBQWMsQ0FDZCxjQUFlLENBQ2YsdUJDL0NtQixDRGdEbkIsZUFBZ0IsQ0FFbEIsMEJBQ0UsY0FBZSxDQUNmLGNBQWUsQ0FDZixzQkN0RGlCLENEdURqQixlQUFnQiIsImZpbGUiOiJpbmRleC5zY3NzIn0= */";
styleInject(css);

var MadTooltip = function (_a) {
    var children = _a.children, data = _a.data;
    var title = data.title, description = data.description, isVisible = data.isVisible, messageType = data.messageType;
    var Content = (React__default.createElement(React.Fragment, null,
        React__default.createElement("div", { className: "mad-tooltip " + messageType },
            React__default.createElement("div", { className: "mad-tooltip__content" },
                React__default.createElement("span", { className: "mad-tooltip__title" }, title),
                React__default.createElement("span", { className: "mad-tooltip__description" }, description)))));
    return (React__default.createElement(React.Fragment, null,
        React__default.createElement(Tippy, { content: Content, animation: "fade", placement: "right", trigger: "manual", isVisible: isVisible, hideOnClick: false, arrow: true }, children)));
};

var css$1 = ".mad-form-cd{display:flex;margin-top:3px}.mad-form-cd span{font-size:13px;display:flex;align-items:center;cursor:pointer}.mad-form-cd span img{padding-right:5px;width:16px;height:16px}.mad-form-cd .addBlock{margin-right:15px;color:#5cba51}.mad-form-cd .removeBlock{color:red}.mad-form-labels{display:flex;justify-content:space-between;align-items:flex-end}.mad-form-optional{font-size:13px;font-family:dinpro-med;color:#ccc;margin-bottom:5px;line-height:1}.mad-form-group{position:relative;display:flex;flex-direction:column;line-height:1;margin-bottom:10px}.mad-form-group .mad-form-label{font-size:15px;align-self:flex-start;font-family:dinpro-med;color:#4b4b4d;margin-bottom:5px}.mad-form-group .DayPickerInput{width:100%}.mad-form-group textarea.mad-form-control{width:-webkit-fill-available;line-height:1}.mad-form-group .DayPickerInput input,.mad-form-group .mad-form-control{display:block;width:-webkit-fill-available;padding:8px 10px;font-size:16px;line-height:1;color:#000;font-family:dinpro-bold;background-color:#fff;background-clip:padding-box;border:2px solid #b3b3b3;border-radius:4px;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.mad-form-group .DayPickerInput input::-webkit-input-placeholder,.mad-form-group .mad-form-control::-webkit-input-placeholder{color:#b3b3b3;font-family:dinpro-med}.mad-form-group .DayPickerInput input:-moz-placeholder,.mad-form-group .DayPickerInput input::-moz-placeholder,.mad-form-group .mad-form-control:-moz-placeholder,.mad-form-group .mad-form-control::-moz-placeholder{color:#b3b3b3;font-family:dinpro-med}.mad-form-group .DayPickerInput input:-ms-input-placeholder,.mad-form-group .mad-form-control:-ms-input-placeholder{color:#b3b3b3;font-family:dinpro-med}.mad-form-group .DayPickerInput input:focus,.mad-form-group .mad-form-control:focus{outline:0;border-color:grey}.mad-form-group .DayPickerInput input:disabled,.mad-form-group .mad-form-control:disabled{background-color:#f2f2f2;color:#999}.mad-form-group .mad-form-input-group{width:100%;height:40px;font-size:16px;line-height:1.5;color:#000;font-family:dinpro-bold;background-color:#fff;background-clip:padding-box;border:2px solid #b3b3b3;border-radius:4px;display:flex;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.mad-form-group .mad-form-input-group::-webkit-input-placeholder{color:#b3b3b3;font-family:dinpro-med}.mad-form-group .mad-form-input-group:-moz-placeholder,.mad-form-group .mad-form-input-group::-moz-placeholder{color:#b3b3b3;font-family:dinpro-med}.mad-form-group .mad-form-input-group:-ms-input-placeholder{color:#b3b3b3;font-family:dinpro-med}.mad-form-group .mad-form-input-group:focus{outline:0;border-color:grey}.mad-form-group .mad-form-input-group img{width:18px;height:18px}.mad-form-group .mad-form-input-group .mad-form-control{border:none}.mad-form-group .mad-form-status{position:absolute;top:50%;right:14px}.mad-form-group .mad-form-status img{width:8px}.mad-form-group.disabled .mad-form-status img{visibility:hidden}.mad-form-group.disabled .mad-form-label span{color:#4b4b4d}.input__item,.mad-form .form-row{position:relative}.input__item{width:100%;margin-bottom:18px;display:flex}.input__item .input-control-s{flex-grow:1;font-family:dinpro-bold;font-size:16px;display:block;background-color:#fff;border-top-right-radius:5px;border-bottom-right-radius:5px;padding:8px 10px;outline:none;border:2px solid #b3b3b3;border-left:0 solid transparent}.input__item .input-control-s::placeholder{color:#b3b3b3;font-family:dinpro-med}.input__item-icon{border-top-left-radius:5px;border-bottom-left-radius:5px;border-top:2px solid #b3b3b3;border-bottom:2px solid #b3b3b3;border-left:2px solid #b3b3b3;position:relative;padding:4px 0 4px 6px;align-items:center;display:flex}.input__item-icon img{height:18px;width:18px}.input__item-icon span{margin-left:6px;border-left:1px solid #b3b3b3;padding-top:25px}.input__item-status{background:#fff;position:absolute;right:14px;top:7px}.input__item-status img{width:8px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5zY3NzIiwic3JjL3N0eWxlcy9fZm9udHMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQkUsYUFDRCxZQUFhLENBQ2IsY0FBZSxDQUZiLGtCQUlBLGNBQWUsQ0FDZixZQUFhLENBQ2Isa0JBQW1CLENBQ25CLGNBQWUsQ0FQZixzQkFTRCxpQkFBa0IsQ0FDbEIsVUFBVyxDQUNYLFdBQVksQ0FYWCx1QkFlQSxpQkFBa0IsQ0FDbEIsYUFBYyxDQWhCZCwwQkFtQkEsU0FBYyxDQUdmLGlCQUNELFlBQWEsQ0FDYiw2QkFBOEIsQ0FDOUIsb0JBQXFCLENBRXBCLG1CQUNELGNBQWUsQ0FDZixzQkM3Q29CLENEOENwQixVQUFjLENBQ2QsaUJBQWtCLENBQ2xCLGFBQWMsQ0FFYixnQkFDRCxpQkFBa0IsQ0FDbEIsWUFBYSxDQUNiLHFCQUFzQixDQUN0QixhQUFjLENBQ2Qsa0JBQW1CLENBTGpCLGdDQU9BLGNBQWUsQ0FDZixxQkFBc0IsQ0FDdEIsc0JDM0RrQixDRDREbEIsYUFBYyxDQUNkLGlCQUFrQixDQVhsQixnQ0FnQkEsVUFBVyxDQWhCWCwwQ0FtQkQsNEJBQTZCLENBQzdCLGFBQWMsQ0FwQmIsd0VBdUJBLGFBQWMsQ0FDZCw0QkFBNkIsQ0FDN0IsZ0JBQWlCLENBQ2pCLGNBYmMsQ0FjZCxhQUFjLENBQ2QsVUFBWSxDQUNaLHVCQzlFb0IsQ0QrRXBCLHFCQUFzQixDQUN0QiwyQkFBNEIsQ0FDNUIsd0JBQXlCLENBQ3pCLGlCQUFrQixDQUtsQixvRUFBd0UsQ0F0RnpFLDhIQW1GQSxhQUFjLENBQ2Qsc0JDdEZtQixDRFFuQixzTkE2RUEsYUFBYyxDQUNkLHNCQ3RGbUIsQ0RXbkIsb0hBMEVBLGFBQWMsQ0FDZCxzQkN0Rm1CLENEa0RsQixvRkF3Q0QsU0FBVSxDQUNWLGlCQUFxQixDQXpDcEIsMEZBNENELHdCQUFvQyxDQUNwQyxVQUFjLENBN0NiLHNDQWlEQSxVQUFXLENBQ1gsV0FBeUIsQ0FDekIsY0F0Q2MsQ0F1Q2QsZUFBZ0IsQ0FDaEIsVUFBWSxDQUNaLHVCQ3ZHb0IsQ0R3R3BCLHFCQUFzQixDQUN0QiwyQkFBNEIsQ0FDNUIsd0JBQXlCLENBQ3pCLGlCQUFrQixDQUNsQixZQUFhLENBS2Isb0VBQXdFLENBaEh6RSxpRUE2R0EsYUFBYyxDQUNkLHNCQ2hIbUIsQ0RRbkIsK0dBdUdBLGFBQWMsQ0FDZCxzQkNoSG1CLENEV25CLDREQW9HQSxhQUFjLENBQ2Qsc0JDaEhtQixDRGtEbEIsNENBa0VELFNBQVUsQ0FDVixpQkFBcUIsQ0FuRXBCLDBDQXNFRCxVQUFXLENBQ1gsV0FBWSxDQXZFWCx3REEwRUQsV0FBWSxDQTFFWCxpQ0E4RUMsaUJBQWtCLENBQ2xCLE9BQVEsQ0FDVCxVQUFXLENBaEZYLHFDQWtGRCxTQUFVLENBbEZULDhDQXdGQyxpQkFBa0IsQ0F4Rm5CLDhDQTZGQyxhQUFjLENBU2xCLGlDQUhDLGlCQVFjLENBTGYsYUFFRSxVQUFXLENBRVgsa0JBQW1CLENBQ25CLFlBQWEsQ0FMZiw4QkFPRSxXQUFZLENBQ1osdUJDL0pxQixDRGdLckIsY0FBZSxDQUVmLGFBQWMsQ0FDZCxxQkFBdUIsQ0FDdkIsMkJBQTRCLENBQzVCLDhCQUErQixDQUMvQixnQkFBaUIsQ0FDakIsWUFBYSxDQUtaLHdCQUF5QixDQUF6QiwrQkFBeUIsQ0FyQjVCLDJDQXlCRSxhQUFjLENBQ2Qsc0JDbExtQixDRG9MbkIsa0JBQ0QsMEJBQTJCLENBQzNCLDZCQUE4QixDQUU1Qiw0QkFBc0IsQ0FDdEIsK0JBQXlCLENBQ3pCLDZCQUF1QixDQUV6QixpQkFBa0IsQ0FFbEIscUJBQXNCLENBQ3RCLGtCQUFtQixDQUNuQixZQUFhLENBWlgsc0JBY0EsV0FBWSxDQUNaLFVBQVcsQ0FmWCx1QkFrQkEsZUFBZ0IsQ0FDaEIsNkJBQThCLENBQzlCLGdCQUFpQixDQUdsQixvQkFDRCxlQUFpQixDQUNqQixpQkFBa0IsQ0FFbEIsVUFBVyxDQUNYLE9BQVEsQ0FMTix3QkFRQSxTQUFVIiwiZmlsZSI6ImluZGV4LnNjc3MifQ== */";
styleInject(css$1);

var css$2 = ".mad-select__menu{font-family:dinpro-med;margin-top:5px!important;text-align:left}.mad-select__control{height:40px}.mad-select__single-value{color:#333;font-family:dinpro-bold}.mad-select__dropdown-indicator{padding:8px 10px 8px 8px!important}.mad-select__indicators{padding-right:10px}.mad-select__indicators div,.mad-select__indicators div div{padding:0!important}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZWxlY3QvaW5kZXguc2NzcyIsInNyYy9zdHlsZXMvX2ZvbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsa0JBQ0Usc0JDSG1CLENESW5CLHdCQUEwQixDQUMxQixlQUFnQixDQUVsQixxQkFDRSxXQUFZLENBRWQsMEJBQ0UsVUFBYyxDQUNkLHVCQ1hxQixDRGF2QixnQ0FDRSxrQ0FBb0MsQ0FHdEMsd0JBQ0Usa0JBQW1CLENBRHJCLDREQUtNLG1CQUFxQiIsImZpbGUiOiJpbmRleC5zY3NzIn0= */";
styleInject(css$2);

var ShivU = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iU2hpdlUuc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMyIiAvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjAuMzUiDQogICAgIGlua3NjYXBlOmN4PSI0MDAiDQogICAgIGlua3NjYXBlOmN5PSI3ODguNTcxNDMiDQogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSINCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIg0KICAgICBzaG93Z3JpZD0iZmFsc2UiDQogICAgIHVuaXRzPSJweCINCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNjAwIg0KICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4MzciDQogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIiAvPg0KICA8bWV0YWRhdGENCiAgICAgaWQ9Im1ldGFkYXRhNSI+DQogICAgPHJkZjpSREY+DQogICAgICA8Y2M6V29yaw0KICAgICAgICAgcmRmOmFib3V0PSIiPg0KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgPGRjOnR5cGUNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4NCiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+DQogICAgICA8L2NjOldvcms+DQogICAgPC9yZGY6UkRGPg0KICA8L21ldGFkYXRhPg0KICA8Zw0KICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSINCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciINCiAgICAgaWQ9ImxheWVyMSINCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMjU0LjY2NjY1KSI+DQogICAgPGcNCiAgICAgICBpZD0iZzQwIg0KICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuMTAyNDMwNiwwLDAsMS4xMDI0MzA2LDIuMjA0ODYxMmUtNCwyNTQuNjY2ODcpIj4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGgyNiINCiAgICAgICAgIHN0eWxlPSJmaWxsOm5vbmUiDQogICAgICAgICBkPSJNIDAsMzguMzk5OCBWIDAgaCAzOC4zOTk4IHYgMzguMzk5OCB6IiAvPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDI4Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6IzU2NTc1NztmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgIGQ9Im0gNi4yMzAyLDI5LjM0NjQgMTIuOTY4MiwtMTIuOTY4MyAxMi45NzExLDEyLjk2ODMgMC4wNTU4LDAuMDYxMyBjIDAuNjQ5OCwwLjcxNCAxLjU4NjgsMS4xNjMgMi42MjcxLDEuMTYzIDEuOTYwNiwwIDMuNTQ3NCwtMS41ODY5IDMuNTQ3NCwtMy41NDc1IDAsLTEuMDQwMiAtMC40NDksLTEuOTc3MyAtMS4xNjI5LC0yLjYyNzEgTCAzNy4xNzU1LDI0LjM0MDMgMjEuNzAyOCw4Ljg2NDkgYyAtMS4zODA1LC0xLjM4MDUgLTMuNjI4MywtMS4zODA1IC01LjAwODgsMCBMIDEuMTYyOCwyNC4zOTYxIGMgLTAuNzE0LDAuNjQ5OCAtMS4xNjMsMS41ODY5IC0xLjE2MywyLjYyNzEgMCwxLjk2MDYgMS41ODY5LDMuNTQ3NSAzLjU0NzUsMy41NDc1IDEuMDcwOSwwIDIuMDMzLC0wLjQ3NDEgMi42ODI5LC0xLjIyNDMgeiIgLz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg==';

var ShivD = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iU2hpdkQuc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMyIiAvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjAuMzUiDQogICAgIGlua3NjYXBlOmN4PSItMzk4LjU3MTQzIg0KICAgICBpbmtzY2FwZTpjeT0iNzg4LjU3MTQzIg0KICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICB1bml0cz0icHgiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTYwMCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODM3Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgLz4NCiAgPG1ldGFkYXRhDQogICAgIGlkPSJtZXRhZGF0YTUiPg0KICAgIDxyZGY6UkRGPg0KICAgICAgPGNjOldvcmsNCiAgICAgICAgIHJkZjphYm91dD0iIj4NCiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+DQogICAgICAgIDxkYzp0eXBlDQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+DQogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPg0KICAgICAgPC9jYzpXb3JrPg0KICAgIDwvcmRmOlJERj4NCiAgPC9tZXRhZGF0YT4NCiAgPGcNCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiDQogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiDQogICAgIGlkPSJsYXllcjEiDQogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTI1NC42NjY2NSkiPg0KICAgIDxnDQogICAgICAgaWQ9ImcyNCINCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLjEwMjQzNjMsMCwwLDEuMTAyNDM2MywyLjIwNDg3MjZlLTQsMjU0LjY2NjY1KSI+DQogICAgICA8cGF0aA0KICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgIGlkPSJwYXRoMTAiDQogICAgICAgICBzdHlsZT0iZmlsbDpub25lIg0KICAgICAgICAgZD0iTSAwLDAgViAzOC4zOTk4IEggMzguMzk5OCBWIDAgWiIgLz4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGgxMiINCiAgICAgICAgIHN0eWxlPSJmaWxsOiM1NjU3NTc7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICBkPSJNIDYuMjMwMiw5LjA1MzUgMTkuMTk4NCwyMi4wMjE3IDMyLjE2OTUsOS4wNTM1IDMyLjIyNTMsOC45OTIxIGMgMC42NDk4LC0wLjcxNCAxLjU4NjgsLTEuMTYzIDIuNjI3MSwtMS4xNjMgMS45NjA2LDAgMy41NDc0LDEuNTg2OSAzLjU0NzQsMy41NDc1IDAsMS4wNDAyIC0wLjQ0OSwxLjk3NzMgLTEuMTYyOSwyLjYyNzEgTCAzNy4xNzU1LDE0LjA1OTUgMjEuNzAyOCwyOS41MzUgYyAtMS4zODA1LDEuMzgwNCAtMy42MjgzLDEuMzgwNCAtNS4wMDg4LDAgTCAxLjE2MjgsMTQuMDAzNyBjIC0wLjcxNCwtMC42NDk4IC0xLjE2MywtMS41ODY5IC0xLjE2MywtMi42MjcxIDAsLTEuOTYwNiAxLjU4NjksLTMuNTQ3NSAzLjU0NzUsLTMuNTQ3NSAxLjA3MDksMCAyLjAzMywwLjQ3NDEgMi42ODI5LDEuMjI0NCB6IiAvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+';

var CrossInput = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iY3Jvc3MtaW5wdXQuc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMyIiAvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjEuOTc5ODk5Ig0KICAgICBpbmtzY2FwZTpjeD0iMjA3LjQ3ODQxIg0KICAgICBpbmtzY2FwZTpjeT0iMTYwLjQxNjA1Ig0KICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICB1bml0cz0icHgiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAwMSINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii05Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTkiDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+DQogIDxtZXRhZGF0YQ0KICAgICBpZD0ibWV0YWRhdGE1Ij4NCiAgICA8cmRmOlJERj4NCiAgICAgIDxjYzpXb3JrDQogICAgICAgICByZGY6YWJvdXQ9IiI+DQogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0Pg0KICAgICAgICA8ZGM6dHlwZQ0KICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPg0KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4NCiAgICAgIDwvY2M6V29yaz4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxnDQogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIg0KICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIg0KICAgICBpZD0ibGF5ZXIxIg0KICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yNTQuNjY2NjUpIj4NCiAgICA8Zw0KICAgICAgIGlkPSJnNzEiDQogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC4zMzgwODIzMywwLDAsMC4zMzgwODIzMywtNzkuNTEyMDQyLDEzMy44Mzg5MykiPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDU3Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZSINCiAgICAgICAgIGQ9Ik0gMjM3LjYzODYsMzYwLjk0NDggViA0ODAuOTQ1IEggMzU3LjYzODUgViAzNjAuOTQ0OCBaIiAvPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDU5Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6IzU2NTc1NztmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgIGQ9Im0gMzMwLjM0ODUsNDY5LjMxMTMgLTMyLjcxMTYsLTMyLjcxMTggLTMyLjcwMjcsMzIuNzAyNyBjIC0yLjAzMDcsMi4zNDQ2IC01LjAzNzIsMy44MjYyIC04LjM4MzcsMy44MjYyIC02LjEyNzEsMCAtMTEuMDg2MywtNC45NTkyIC0xMS4wODYzLC0xMS4wODYzIDAsLTMuMjUwMiAxLjQwMzEsLTYuMTc4NiAzLjYzNDUsLTguMjA5NCBsIDMyLjg4NTYsLTMyLjg4NjQgLTMyLjg3OTYsLTMyLjg4MDIgYyAtMi4yMzE0LC0yLjAzMDcgLTMuNjM0NiwtNC45NTkyIC0zLjYzNDYsLTguMjA5NCAwLC02LjEyNzEgNC45NTkyLC0xMS4wODYzIDExLjA4NjMsLTExLjA4NjMgMy4zNDY2LDAgNi4zNTMsMS40ODE3IDguMzgzOCwzLjgyNjIgbCAzMi42OTY3LDMyLjY5NjggMzIuNzA1NiwtMzIuNzA1OSBjIDIuMDMwOCwtMi4zNDQ1IDUuMDM3MiwtMy44MjYyIDguMzgzOCwtMy44MjYyIDYuMTI3MSwwIDExLjA4NjMsNC45NTkyIDExLjA4NjMsMTEuMDg2MyAwLDMuMjUwMiAtMS40MDMyLDYuMTc4NyAtMy42MzQ2LDguMjA5NCBsIC0zMi44ODg3LDMyLjg4OTMgMzIuODk0NiwzMi44OTU1IGMgMi4yMzE1LDIuMDMwNyAzLjYzNDYsNC45NTkyIDMuNjM0Niw4LjIwOTQgMCw2LjEyNzEgLTQuOTU5MiwxMS4wODYzIC0xMS4wODYzLDExLjA4NjMgLTMuMzQ2NiwwIC02LjM1MywtMS40ODE3IC04LjM4MzcsLTMuODI2MiB6IiAvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+';

// const ShivU = ""
// const ShivD = ""
var StdSpinner = function () {
    return (React__default.createElement("div", { className: "mad-uploader-spinner" },
        React__default.createElement("div", { className: "sk-three-bounce" },
            React__default.createElement("div", { className: "sk-bounce-1 sk-child" }),
            React__default.createElement("div", { className: "sk-bounce-2 sk-child" }),
            React__default.createElement("div", { className: "sk-bounce-3 sk-child" }))));
};
var NoOptionsMessage = function (props) {
    return (React__default.createElement(Select.components.NoOptionsMessage, __assign({}, props),
        React__default.createElement("span", null, "\u041F\u0443\u0441\u0442\u043E")));
};
var LoadingMessage = function (props) {
    return (React__default.createElement(Select.components.LoadingMessage, __assign({}, props),
        React__default.createElement(StdSpinner, null)));
};
var DropdownIndicator = function (props) {
    return (Select.components.DropdownIndicator && (React__default.createElement(Select.components.DropdownIndicator, __assign({}, props), !props.selectProps.value ? (props.selectProps.menuIsOpen ? (React__default.createElement("img", { src: ShivU, alt: "", style: { width: 15, height: 15 } })) : (React__default.createElement("img", { src: ShivD, alt: "", style: { width: 15, height: 15 } }))) : !props.selectProps.isClearable ? (React__default.createElement("img", { src: ShivD, alt: "", style: { width: 15, height: 15 } })) : (React__default.createElement("div", null)))));
};
var ClearIndicator = function (props) {
    var _a = props.children, children = _a === void 0 ? React__default.createElement("img", { src: CrossInput, style: { width: 15 }, alt: "" }) : _a, getStyles = props.getStyles, _b = props.innerProps, ref = _b.ref, restInnerProps = __rest(_b, ["ref"]);
    return (React__default.createElement(React.Fragment, null,
        React__default.createElement("div", __assign({}, restInnerProps, { ref: ref, style: getStyles("clearIndicator", props) }),
            React__default.createElement("div", { style: { cursor: "pointer" } }, children))));
};
var MadSelect = function (_a) {
    var _b = _a.isRequired, isRequired = _b === void 0 ? false : _b, _c = _a.label, label = _c === void 0 ? null : _c, name = _a.name, options = _a.options, _d = _a.value, value = _d === void 0 ? null : _d, _e = _a.isDisabled, isDisabled = _e === void 0 ? false : _e, onChange = _a.onChange, _f = _a.onFocus, onFocus = _f === void 0 ? null : _f, _g = _a.onBlur, onBlur = _g === void 0 ? null : _g, _h = _a.isClearable, isClearable = _h === void 0 ? true : _h, _j = _a.placeholder, placeholder = _j === void 0 ? "Выберите" : _j, _k = _a.onInputChange, onInputChange = _k === void 0 ? null : _k, _l = _a.loading, loading = _l === void 0 ? null : _l;
    return (React__default.createElement("div", { className: "mad-form-group" },
        label && (React__default.createElement("label", { className: "mad-form-label" },
            label,
            isRequired && !isDisabled && React__default.createElement("span", { style: { color: "red" } }, " *"))),
        React__default.createElement(Select__default, { isLoading: loading, options: options, name: name, classNamePrefix: "mad-select", isDisabled: isDisabled, isClearable: isClearable, onChange: function (e) { return onChange(e, name); }, styles: styles, onFocus: onFocus ? function (e) { return onFocus(e); } : null, onBlur: onBlur ? function (e) { return onBlur(e); } : null, onInputChange: onInputChange ? function (value) { return onInputChange(value); } : null, components: { DropdownIndicator: DropdownIndicator, ClearIndicator: ClearIndicator, NoOptionsMessage: NoOptionsMessage, LoadingMessage: LoadingMessage }, defaultValue: value, placeholder: placeholder })));
};
var styles = {
    control: function (provided, state) { return (__assign({}, provided, { "&:hover": {
            borderColor: !state.isFocused ? "#B3B3B3" : "#808080"
        }, "border": !state.isFocused ? "2px solid #B3B3B3" : "2px solid #808080", "borderRadius": "0.25rem", "boxShadow": "none" })); },
    placeholder: function (provided, state) { return (__assign({}, provided, { "color": "#B3B3B3", "font-family": "dinpro-med" })); },
    indicatorSeparator: function (provided, state) { return (__assign({}, provided, { display: "none" })); },
    indicatorsContainer: function (provided, state) { return (__assign({}, provided
    // padding: "8px 10px 8px 8px"
    )); },
    option: function (provided, state) { return (__assign({}, provided, { ":active": {
            backgroundColor: state.isSelected ? "#F2F2F2" : "#F2F2F2"
        }, "backgroundColor": state.isSelected ? "#F2F2F2" : state.isFocused ? "#F2F2F2" : "transparent", "color": state.isDisabled ? "black" : state.isSelected ? "black" : "inherit" })); },
    menuList: function (provided, state) { return (__assign({}, provided, { "::-webkit-scrollbar-track": {
            "margin-top": 0
        } })); }
};

var commonRU = {
    tooltipDescription: 'Пожалуйста, введите "{{attribute}}".',
    tooltipDescriptionEmpty: "Данное поле обязательно для заполнения.",
    tooltipDescriptionTrue: 'Поле "{{attribute}}" заполнено верно.',
    tooltipDescriptionIncorrect: "Bведитe действующий адрес электронной почты. Например: ivanov@mail.ru",
    tooltipDescriptionPasswordMatch: "Введенные пароли не совпадают.",
    optional: "не обязательно"
};

var commonEn = {
    tooltipDescription: 'Please enter "{{attribute}}".',
    tooltipDescriptionEmpty: "This field is required.",
    tooltipDescriptionTrue: 'The "{{attribute}}" field is correct.',
    tooltipDescriptionIncorrect: "Enter valid email address. Example: ivanov@mail.ru",
    tooltipDescriptionPasswordMatch: "Those passwords didn't match. Try again.",
    optional: "optional"
};

var commonKK = {
    tooltipDescription: '"{{attribute}}" енгізіңіз.',
    tooltipDescriptionEmpty: "Бұл жолды толтыру қажет.",
    tooltipDescriptionTrue: 'The "{{attribute}}" field is correct.',
    tooltipDescriptionIncorrect: "Нақты электрондық поштаны енгізіңіз. Мысалы: ivanov@mail.ru",
    tooltipDescriptionPasswordMatch: "Еңгізілген құпиясөздер сәйкес келмейді. Қайтадан еңгізіп көріңіз.",
    optional: "міндетті емес"
};

__
    .use(reactI18next.reactI18nextModule)
    .use(LanguageDetector)
    .init({
    fallbackLng: "en",
    interpolation: {
        escapeValue: false // react already safes from xss
    },
    resources: {
        ru: { common: commonRU },
        en: { common: commonEn },
        kk: { common: commonKK }
    },
    ns: ["common"],
    defaultNS: "common",
    // react-i18next options
    react: {
        wait: true
    },
    keySeparator: "-->" // we do not use keys in form messages.welcome
});

var RedSupCross = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iRnVrc2lhRG90LmNkci5zdmciPg0KICA8ZGVmcw0KICAgICBpZD0iZGVmczIiIC8+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgaWQ9ImJhc2UiDQogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiINCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiDQogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCINCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCINCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgICAgaW5rc2NhcGU6em9vbT0iMC4zNSINCiAgICAgaW5rc2NhcGU6Y3g9IjQwMCINCiAgICAgaW5rc2NhcGU6Y3k9IjU2MCINCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIg0KICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiDQogICAgIHNob3dncmlkPSJmYWxzZSINCiAgICAgdW5pdHM9InB4Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2MDAiDQogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjgzNyINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+DQogIDxtZXRhZGF0YQ0KICAgICBpZD0ibWV0YWRhdGE1Ij4NCiAgICA8cmRmOlJERj4NCiAgICAgIDxjYzpXb3JrDQogICAgICAgICByZGY6YWJvdXQ9IiI+DQogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0Pg0KICAgICAgICA8ZGM6dHlwZQ0KICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPg0KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4NCiAgICAgIDwvY2M6V29yaz4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxnDQogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIg0KICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIg0KICAgICBpZD0ibGF5ZXIxIg0KICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yNTQuNjY2NjUpIj4NCiAgICA8Zw0KICAgICAgIGlkPSJnOTEiDQogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS4xMDI0Mjc3LDAsMCwxLjEwMjQyNzcsLTEuMTAyNDI3N2UtNCwyNTQuNjY2NTQpIj4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGg3NyINCiAgICAgICAgIHN0eWxlPSJmaWxsOm5vbmUiDQogICAgICAgICBkPSJNIDFlLTQsMWUtNCBWIDM4LjQwMDIgSCAzOC40MDAyIFYgMWUtNCBaIiAvPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDc5Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6I0ZGMDAwMDtmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgIGQ9Ik0gMTkuMiwwIEEgMTkuMiwxOS4yIDAgMCAxIDM4LjQwMDEsMTkuMiAxOS4yLDE5LjIgMCAxIDEgMTkuMiwwIFoiIC8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4=';

var GreenSupGal = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iRnVrc2lhRG90LmNkci5zdmciPg0KICA8ZGVmcw0KICAgICBpZD0iZGVmczIiIC8+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgaWQ9ImJhc2UiDQogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiINCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiDQogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCINCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCINCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgICAgaW5rc2NhcGU6em9vbT0iMC4zNSINCiAgICAgaW5rc2NhcGU6Y3g9IjQwMCINCiAgICAgaW5rc2NhcGU6Y3k9IjU2MCINCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIg0KICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiDQogICAgIHNob3dncmlkPSJmYWxzZSINCiAgICAgdW5pdHM9InB4Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2MDAiDQogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjgzNyINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+DQogIDxtZXRhZGF0YQ0KICAgICBpZD0ibWV0YWRhdGE1Ij4NCiAgICA8cmRmOlJERj4NCiAgICAgIDxjYzpXb3JrDQogICAgICAgICByZGY6YWJvdXQ9IiI+DQogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0Pg0KICAgICAgICA8ZGM6dHlwZQ0KICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPg0KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4NCiAgICAgIDwvY2M6V29yaz4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxnDQogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIg0KICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIg0KICAgICBpZD0ibGF5ZXIxIg0KICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yNTQuNjY2NjUpIj4NCiAgICA8Zw0KICAgICAgIGlkPSJnOTEiDQogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS4xMDI0Mjc3LDAsMCwxLjEwMjQyNzcsLTEuMTAyNDI3N2UtNCwyNTQuNjY2NTQpIj4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGg3NyINCiAgICAgICAgIHN0eWxlPSJmaWxsOm5vbmUiDQogICAgICAgICBkPSJNIDFlLTQsMWUtNCBWIDM4LjQwMDIgSCAzOC40MDAyIFYgMWUtNCBaIiAvPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDc5Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6IzUyYzc0NTtmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgIGQ9Ik0gMTkuMiwwIEEgMTkuMiwxOS4yIDAgMCAxIDM4LjQwMDEsMTkuMiAxOS4yLDE5LjIgMCAxIDEgMTkuMiwwIFoiIC8+DQogICAgPC9nPg0KICA8L2c+DQo8L3N2Zz4=';

/**
 * Рассмотреть вариант изготовления этого компонента Stateless тк. по мне это вполне реально
 * PRIME4ANIE: kogda my pomewaem v component MadTooltip.. nuzhno obora4ivat' ego toka v odin tag.. naprimer <div>
 *   inache vse posleduuwie tooltipy v forme rabotat' ne budut
 */
var InputStyleOne = function (props) {
    var _a = React.useState({
        enabled: true,
        isVisible: false,
        title: "",
        description: "",
        messageType: "info"
    }), tooltip = _a[0], setTooltip = _a[1];
    var _b = React.useState("info"), status = _b[0], setStatus = _b[1];
    React.useEffect(function () {
        if (!props.tooltip) {
            setTooltip(__assign({}, tooltip, { description: __.t("tooltipDescription", { attribute: props.label }), title: props.label }));
            var value_1 = props.value, rules = props.rules;
            if (value_1 && rules) {
                validateRules(rules, value_1);
            }
        }
    }, []);
    //Вынес в отдельную ф-ю, т.к будет вызызаться в случаях если value уже существует
    var validateRules = function (rules, value) {
        var isValid = true;
        value = value.toString(); // poidee ne dolzhen etogo delat'.. no kod lomaetsya kada v mul'tiforme nazhimaew Back
        _.forEach(rules, function (rule) {
            switch (true) {
                case typeof rule === "string":
                    switch (rule) {
                        case "required":
                            if (validator.isEmpty(value)) {
                                setStatus("error");
                                setTooltip(__assign({}, tooltip, { description: __.t("tooltipDescriptionEmpty", { attribute: tooltip.title }), messageType: "error" }));
                                isValid = false;
                            }
                            break;
                        case "email":
                            if (!validator.isEmail(value) && !validator.isEmpty(value)) {
                                setStatus("error");
                                setTooltip(__assign({}, tooltip, { description: __.t("tooltipDescriptionIncorrect", { attribute: tooltip.title }), messageType: "error" }));
                                isValid = false;
                            }
                            break;
                        case "integer":
                            if (!validator.isInt(value) && !validator.isEmpty(value)) {
                                setStatus("error");
                                setTooltip(__assign({}, tooltip, { description: "Должен быть целым числом", messageType: "error" }));
                                isValid = false;
                            }
                            break;
                    }
                    break;
                case Array.isArray(rule):
                    switch (rule[0]) {
                        case "max":
                            if (!validator.isLength(value, { max: rule[1] })) {
                                setStatus("error");
                                setTooltip(__assign({}, tooltip, { description: "Количество символов превышает максималку", messageType: "error" }));
                                isValid = false;
                            }
                            break;
                        case "compare":
                            if (value != rule[1]) {
                                setStatus("error");
                                setTooltip(__assign({}, tooltip, { description: __.t("tooltipDescriptionPasswordMatch"), messageType: "error" }));
                                isValid = false;
                            }
                            break;
                        case "minAmountValue":
                            if (value < rule[1]) {
                                setStatus("error");
                                setTooltip(__assign({}, tooltip, { description: "Объем товара должен быть не менее 500 тонн", messageType: "error" }));
                                isValid = false;
                            }
                            break;
                        case "minValue":
                            if (parseInt(value) > parseInt(rule[1])) {
                                setStatus("error");
                                setTooltip(__assign({}, tooltip, { description: "значение должно быть меньше или равно " + rule[1], messageType: "error" }));
                                isValid = false;
                            }
                            break;
                        case "gte":
                            if (parseInt(value) < parseInt(rule[1])) {
                                setStatus("error");
                                setTooltip(__assign({}, tooltip, { description: "значение должно быть больше или равно " + rule[1], messageType: "error" }));
                                isValid = false;
                            }
                            break;
                    }
                    break;
            }
        });
        if (isValid) {
            setStatus("success");
            setTooltip(__assign({}, tooltip, { description: __.t("tooltipDescriptionTrue", { attribute: props.label }), messageType: "success" }));
            isValid = false;
        }
        return isValid;
    };
    var handleChange = function (e) {
        e.preventDefault();
        var value = e.target.value;
        var rules = props.rules;
        var isValid = validateRules(rules, value);
        props.handleChange(e, isValid);
    };
    // cb ф-я NurmerFormat, вынес отдельно т.к отличается передаваемые параметры
    var handleValueChange = function (values) {
        var value = values.value;
        var rules = props.rules;
        var isValid = validateRules(rules, value);
        props.numberFormatOptions.onValueChange(value, isValid);
    };
    var handleFocus = function (e) {
        e.preventDefault();
        setTooltip(__assign({}, tooltip, { isVisible: true, messageType: status }));
    };
    var handleBlur = function (e) {
        e.preventDefault();
        setTooltip(__assign({}, tooltip, { isVisible: false, messageType: status }));
    };
    var renderInput = function (layout) {
        if (layout === void 0) { layout = null; }
        var ImgIcon = function (_a) {
            var messageType = _a.messageType;
            if (messageType == "error") {
                return React__default.createElement("img", { src: RedSupCross, alt: "" });
            }
            if (messageType == "success") {
                return React__default.createElement("img", { src: GreenSupGal, alt: "" });
            }
            return React__default.createElement("img", { src: "", alt: "" });
        };
        var Label = function () {
            if (_.indexOf(props.rules, "required") > -1) {
                return React__default.createElement("label", { className: "mad-form-label" }, props.label);
            }
            return (React__default.createElement("div", { className: "mad-form-labels" },
                React__default.createElement("label", { className: "mad-form-label" }, props.label),
                React__default.createElement("span", { className: "mad-form-optional" }, __.t("optional"))));
        };
        if (layout == "one") {
            return (React__default.createElement("div", { className: "input__item" },
                React__default.createElement("div", { className: "input__item-icon icons" }, props.iconUrl && (React__default.createElement(React__default.Fragment, null,
                    React__default.createElement("img", { src: props.iconUrl, alt: "" }),
                    React__default.createElement("span", null)))),
                React__default.createElement(MadTooltip, { data: tooltip },
                    React__default.createElement("input", { name: props.name, type: props.inputType, onChange: function (e) { return handleChange(e); }, onFocus: function (e) { return handleFocus(e); }, onBlur: function (e) { return handleBlur(e); }, className: "input-control-s", placeholder: props.label, value: props.value, autoComplete: props.autoComplete })),
                React__default.createElement("div", { className: "input__item-status" },
                    React__default.createElement(ImgIcon, { messageType: status }))));
        }
        if (props.inputType == "password") {
            return (React__default.createElement("div", { className: "mad-form-group" + (props.disabled ? " disabled" : "") },
                React__default.createElement(Label, null),
                React__default.createElement(MadTooltip, { data: tooltip },
                    React__default.createElement("input", { name: props.name, type: props.inputType, autoComplete: props.autoComplete, className: "mad-form-control", onChange: function (e) { return handleChange(e); }, onFocus: function (e) { return handleFocus(e); }, onBlur: function (e) { return handleBlur(e); }, placeholder: props.label, value: props.value, disabled: props.disabled }),
                    React__default.createElement("div", { className: "mad-form-status" },
                        React__default.createElement(ImgIcon, { messageType: status })))));
        }
        if (props.inputType == "textArea") {
            return (React__default.createElement("div", { className: "mad-form-group" + (props.disabled ? " disabled" : "") },
                React__default.createElement(Label, null),
                React__default.createElement(MadTooltip, { data: tooltip },
                    React__default.createElement(React__default.Fragment, null,
                        React__default.createElement(Textarea, { className: "mad-form-control", name: props.name, value: props.value, autoComplete: props.autoComplete, onChange: function (e) { return handleChange(e); }, onFocus: function (e) { return handleFocus(e); }, onBlur: function (e) { return handleBlur(e); }, placeholder: props.placeholder ? props.placeholder : "Заполните " + props.label, disabled: props.disabled, minRows: props.minRows ? props.minRows : null, maxRows: props.maxRows ? props.maxRows : null }),
                        React__default.createElement("div", { className: "mad-form-status" },
                            React__default.createElement(ImgIcon, { messageType: status }))))));
        }
        if (props.inputType == "datePicker") {
            return (React__default.createElement("div", { className: "mad-form-group" + (props.disabled ? " disabled" : "") },
                React__default.createElement(Label, null),
                React__default.createElement(MadTooltip, { data: tooltip },
                    React__default.createElement("div", { onFocus: function (e) { return handleFocus(e); }, onBlur: function (e) { return handleBlur(e); } },
                        React__default.createElement(DayPickerInput, { onBlur: function (e) { return handleBlur(e); }, placeholder: props.placeholder ? props.placeholder : "Выберите дату", inputProps: { readOnly: true, name: props.name }, onDayChange: function (day) { return props.datePickerOptions.onDayChange(moment(day).unix(), props.name, true); }, value: props.value ? moment(props.value * 1000).format("DD MMMM YYYY") : "", format: "DD MMMM YYYY", dayPickerProps: __assign({ locale: "ru", localeUtils: MomentLocaleUtils, name: name }, props.datePickerOptions) }),
                        React__default.createElement("div", { className: "mad-form-status" },
                            React__default.createElement(ImgIcon, { messageType: status }))))));
        }
        if (props.inputType == "select") {
            var _a = props.selectOptions, options = _a.options, onChange_1 = _a.onChange, value_2 = _a.value, isClearable = _a.isClearable, onInputChange_1 = _a.onInputChange, loading = _a.loading;
            var selectedValue = null;
            if (_.find(options, { value: value_2 })) {
                selectedValue = {
                    value: value_2,
                    label: _.find(options, { value: value_2 }) ? _.find(options, { value: value_2 }).label : ""
                };
            }
            return (React__default.createElement("div", { className: "mad-form-group" + (props.disabled ? " disabled" : "") },
                React__default.createElement(Label, null),
                React__default.createElement(MadTooltip, { data: tooltip },
                    React__default.createElement(MadSelect, { name: props.name, isClearable: isClearable, onFocus: function (e) { return handleFocus(e); }, onBlur: function (e) { return handleBlur(e); }, options: options, 
                        //podumat' nuzhno li suda peredavat' isValid kak vo vseh sobitiyax handleChange
                        onChange: function (value, name) { return onChange_1(value ? value.value : "", name, !!value, value ? value.label : null); }, value: selectedValue, onInputChange: onInputChange_1 ? function (value) { return onInputChange_1(value); } : null, isDisabled: props.disabled, loading: loading }))));
        }
        if (props.inputType == "numberFormat") {
            var _b = props.numberFormatOptions, suffix = _b.suffix, thousandSeparator = _b.thousandSeparator;
            return (React__default.createElement("div", { className: "mad-form-group" + (props.disabled ? " disabled" : "") },
                React__default.createElement(Label, null),
                React__default.createElement(MadTooltip, { data: tooltip },
                    React__default.createElement(NumberFormat, { name: props.name, className: "mad-form-control", onFocus: function (e) { return handleFocus(e); }, onBlur: function (e) { return handleBlur(e); }, placeholder: props.placeholder ? props.placeholder : "Заполните " + props.label, value: props.value, disabled: props.disabled, suffix: suffix, thousandSeparator: thousandSeparator, onValueChange: function (values) { return handleValueChange(values); } }),
                    React__default.createElement("div", { className: "mad-form-status" },
                        React__default.createElement(ImgIcon, { messageType: status })))));
        }
        // если inputType не указан то считать поумолчанию inputType=text
        return (React__default.createElement("div", { className: "mad-form-group" + (props.disabled ? " disabled" : "") },
            React__default.createElement(Label, null),
            React__default.createElement(MadTooltip, { data: tooltip },
                React__default.createElement(React__default.Fragment, null,
                    React__default.createElement("input", { name: props.name, 
                        // type={this.props.inputType}
                        autoComplete: props.autoComplete, className: "mad-form-control", onChange: function (e) { return handleChange(e); }, onFocus: function (e) { return handleFocus(e); }, onBlur: function (e) { return handleBlur(e); }, placeholder: props.placeholder ? props.placeholder : props.label, value: props.value, disabled: props.disabled }),
                    React__default.createElement("div", { className: "mad-form-status" },
                        React__default.createElement(ImgIcon, { messageType: status }))))));
    };
    return React__default.createElement(reactI18next.I18nextProvider, { i18n: __ }, renderInput(props.layout));
};

module.exports = InputStyleOne;
