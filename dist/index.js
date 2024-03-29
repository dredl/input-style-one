'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Tippy = _interopDefault(require('@tippy.js/react'));
require('tippy.js/index.css');
var _ = _interopDefault(require('lodash'));
var __ = _interopDefault(require('i18next'));
var Textarea = _interopDefault(require('react-textarea-autosize'));
var moment = _interopDefault(require('moment'));
var DayPickerInput = _interopDefault(require('react-day-picker/DayPickerInput'));
var MomentLocaleUtils = _interopDefault(require('react-day-picker/moment'));
require('react-day-picker/lib/style.css');
var Select = require('react-select');
var Select__default = _interopDefault(Select);
var reactWindow = require('react-window');
var NumberFormat = _interopDefault(require('react-number-format'));
var reactI18next = require('react-i18next');
var validator = _interopDefault(require('validator'));

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

var css = ".tippy-popper[x-placement^=bottom] .tippy-arrow{border-top-color:#191919}.tippy-tooltip{padding:0!important;border-radius:5px;background-color:#191919}.tippy-arrow{border-top-color:#191919}.tippy-tooltip .tippy-arrow{border-bottom-color:#191919}.tippy-popper[x-placement^=left] .tippy-arrow{border-left-color:#191919}.tippy-popper[x-placement^=right] .tippy-arrow{border-right-color:#191919}.mad-tooltip{padding:10px;width:300px;border-radius:5px}.mad-tooltip.success{border-bottom:5px solid #52c745}.mad-tooltip.error{border-bottom:5px solid red}.mad-tooltip.info{border-bottom:5px solid #ffd012}.mad-tooltip__content{display:flex;flex-direction:column}.mad-tooltip__title{line-height:1;font-size:13px;font-family:dinpro-bold;text-align:left}.mad-tooltip__description{margin-top:5px;font-size:13px;font-family:dinpro-med;text-align:left}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy90b29sdGlwL2luZGV4LnNjc3MiLCJzcmMvc3R5bGVzL19mb250cy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLGdEQUVDLHdCQUhjLENBTWYsZUFDRSxtQkFBcUIsQ0FDckIsaUJBQWtCLENBQ2xCLHdCQUF5QixDQUszQixhQUNFLHdCQWZhLENBaUJkLDRCQUNDLDJCQWxCYSxDQW9CZiw4Q0FDRSx5QkFyQmEsQ0F1QmYsK0NBQ0UsMEJBeEJhLENBMkJmLGFBQ0UsWUFBYSxDQUNiLFdBQVksQ0FVWixpQkFBa0IsQ0FacEIscUJBSUksK0JBQWdDLENBSnBDLG1CQU9JLDJCQUFnQyxDQVBwQyxrQkFVSSwrQkFBZ0MsQ0FHbEMsc0JBQ0UsWUFBYSxDQUNiLHFCQUFzQixDQUV4QixvQkFDRSxhQUFjLENBQ2QsY0FBZSxDQUNmLHVCQ2hEbUIsQ0RpRG5CLGVBQWdCLENBRWxCLDBCQUNFLGNBQWUsQ0FDZixjQUFlLENBQ2Ysc0JDdkRpQixDRHdEakIsZUFBZ0IiLCJmaWxlIjoiaW5kZXguc2NzcyJ9 */";
styleInject(css);

//nuzhno otrefactorit'
var MadTooltip = function (_a) {
    var children = _a.children, data = _a.data, enabled = _a.enabled;
    var title = data.title, description = data.description, isVisible = data.isVisible, messageType = data.messageType;
    var Content = (React__default.createElement(React.Fragment, null,
        React__default.createElement("div", { className: "mad-tooltip " + messageType },
            React__default.createElement("div", { className: "mad-tooltip__content" },
                React__default.createElement("span", { className: "mad-tooltip__title" }, title),
                React__default.createElement("span", { className: "mad-tooltip__description" }, description)))));
    if (enabled) {
        return (React__default.createElement(Tippy, { content: Content, animation: "fade", placement: "right", trigger: "manual", isVisible: isVisible, hideOnClick: false, arrow: true }, children));
    }
    return children;
};

var css$1 = ".mad-form{display:flex;flex-direction:column;line-height:1;margin-bottom:10px}.mad-form--disabled .mad-form__input{background:#f2f2f2}.mad-form--disabled .mad-form__input:focus-within{border-color:#b3b3b3}.mad-form__input{box-sizing:content-box;display:flex;align-items:center;border:2px solid #b3b3b3;border-radius:4px;padding:0 8px;height:36px}.mad-form__input-textarea{height:100%;padding-bottom:5px}.mad-form__input-textarea textarea{resize:none;height:-webkit-fill-available;line-height:1.3;overflow:hidden;margin-top:1px}.mad-form__input .DayPickerInput-Overlay--top{bottom:40px;left:-8px}.mad-form__input .DayPickerInput,.mad-form__input .DayPickerInput.mad-form__input{width:100%}.mad-form__input .DayPickerInput input{width:100%;height:26px;border:none;outline:none}.mad-form__input:focus-within{border-color:grey;outline-color:transparent}.mad-form__label{display:flex;justify-content:space-between;align-items:center;color:#4b4b4d;margin-bottom:5px}.mad-form__label label{font-size:15px;margin-bottom:0;font-family:dinpro-med}.mad-form__label span{font-size:13px;font-family:dinpro-med;color:#ccc}.mad-form__icon{width:18px;padding:7px 0}.mad-form__delimeter{margin:0 6px;border-left:1px solid #b3b3b3;padding-top:25px}.mad-form__status{width:7px;height:7px;border-radius:100px;margin-left:8px}.mad-form__status-error{background:red}.mad-form__status-success{background:#5fbb56}.mad-form__status-info{background:transparent}.mad-form__control{width:100%;text-overflow:ellipsis;padding:7px 0;font-size:16px;color:#000;font-family:dinpro-bold;background-color:#fff;border:none;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.mad-form__control::-webkit-input-placeholder{color:#b3b3b3;font-family:dinpro-med}.mad-form__control:-moz-placeholder,.mad-form__control::-moz-placeholder{color:#b3b3b3;font-family:dinpro-med}.mad-form__control:-ms-input-placeholder{color:#b3b3b3;font-family:dinpro-med}.mad-form__control:focus{outline:0;border-color:grey}.mad-form__control:disabled{background-color:#f2f2f2;color:#999}.mad-form-labels{display:flex;justify-content:space-between;align-items:flex-end}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5zY3NzIiwic3JjL3N0eWxlcy9fZm9udHMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkEsVUFDQyxZQUFhLENBQ2IscUJBQXNCLENBQ3RCLGFBQWMsQ0FDZCxrQkFBbUIsQ0FDbEIscUNBR0Msa0JBQW1CLENBSHBCLGtEQUtFLG9CQUFxQixDQUl4QixpQkFDQyxzQkFBdUIsQ0FDdkIsWUFBYSxDQUNiLGtCQUFtQixDQUNuQix3QkFBeUIsQ0FDekIsaUJBQWtCLENBQ2xCLGFBdEJpQixDQXVCakIsV0FBWSxDQUNaLDBCQUNDLFdBQVksQ0FDWixrQkFBbUIsQ0FGbkIsbUNBSUMsV0FBWSxDQUNaLDZCQUE4QixDQUM5QixlQUFnQixDQUNoQixlQUFnQixDQUNoQixjQUFlLENBaEJqQiw4Q0FxQkMsV0FBWSxDQUNaLFNBdENnQixDQWdCakIsa0ZBMkJFLFVBQVcsQ0EzQmIsdUNBOEJFLFVBQVcsQ0FDWCxXQUFZLENBQ1osV0FBWSxDQUNaLFlBQWEsQ0FqQ2YsOEJBcUNDLGlCQUFxQixDQUNyQix5QkFBMEIsQ0FHNUIsaUJBQ0MsWUFBYSxDQUNiLDZCQUE4QixDQUM5QixrQkFBbUIsQ0FDbEIsYUFBYyxDQUNmLGlCQUFrQixDQUxsQix1QkFRQyxjQUFlLENBQ2YsZUFBZ0IsQ0FDaEIsc0JDbEZrQixDRHdFbkIsc0JBYUMsY0FBZSxDQUNmLHNCQ3RGa0IsQ0R1RmxCLFVBQWMsQ0FHaEIsZ0JBQ0MsVUFBVyxDQUNYLGFBQWMsQ0FFZixxQkFDQyxZQUFhLENBQ1gsNkJBQThCLENBQzlCLGdCQUFpQixDQUVwQixrQkFDQyxTQUFVLENBQ1YsVUFBVyxDQUNYLG1CQUFvQixDQUNwQixlQUFnQixDQUNoQix3QkFDQyxjQUFlLENBRWhCLDBCQUNDLGtCQUFtQixDQUVwQix1QkFDQyxzQkFDRCxDQUVELG1CQUNDLFVBQVcsQ0FDWCxzQkFBdUIsQ0FDdkIsYUFBYyxDQUNkLGNBQWUsQ0FDZixVQUFZLENBQ1osdUJDdkhxQixDRHdIckIscUJBQXNCLENBQ3RCLFdBQVksQ0FLWixvRUFBd0UsQ0E3SHhFLDhDQTBIQyxhQUFjLENBQ2Qsc0JDN0hrQixDRFFuQix5RUFvSEMsYUFBYyxDQUNkLHNCQzdIa0IsQ0RXbkIseUNBaUhDLGFBQWMsQ0FDZCxzQkM3SGtCLENEa0huQix5QkFlQyxTQUFVLENBQ1YsaUJBQXFCLENBaEJ0Qiw0QkFtQkMsd0JBQW9DLENBQ3BDLFVBQWMsQ0FHZixpQkFDQSxZQUFhLENBQ2IsNkJBQThCLENBQzlCLG9CQUFxQiIsImZpbGUiOiJpbmRleC5zY3NzIn0= */";
styleInject(css$1);

var css$2 = ".mad-select{font-size:16px}.mad-select--isMulti .mad-select__control{min-height:40px;height:100%}.mad-select__menu{font-family:dinpro-med;margin-top:5px!important;text-align:left}.mad-select__menu ::-webkit-scrollbar{width:10px}.mad-select__menu ::-webkit-scrollbar-track{margin-top:0;background-color:#fcfcfc;border:1px solid #e6e6e6}.mad-select__menu ::-webkit-scrollbar-thumb{border-radius:10px;background:#ccc}.mad-select__control{height:40px}.mad-select__single-value{color:#333;font-family:dinpro-bold}.mad-select__dropdown-indicator{padding:8px 10px 8px 8px!important}.mad-select__indicators{padding-right:10px}.mad-select__indicators div{padding:0!important}.mad-select__indicators div div{padding:0!important;display:flex}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zZWxlY3QvaW5kZXguc2NzcyIsInNyYy9zdHlsZXMvX2ZvbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsWUFDRSxjQUFlLENBQ2QsMENBRUcsZUFBZ0IsQ0FDaEIsV0FBWSxDQUlsQixrQkFDRSxzQkNabUIsQ0RhbkIsd0JBQTBCLENBQzFCLGVBQWdCLENBSGxCLHNDQU1JLFVBQVcsQ0FOZiw0Q0FTSSxZQUFhLENBQ2Isd0JBQXlCLENBQ3pCLHdCQUF5QixDQVg3Qiw0Q0FjSSxrQkFBbUIsQ0FDbkIsZUFBbUIsQ0FHdkIscUJBQ0UsV0FBWSxDQUVkLDBCQUNFLFVBQWMsQ0FDZCx1QkNqQ3FCLENEbUN2QixnQ0FDRSxrQ0FBb0MsQ0FHdEMsd0JBQ0Usa0JBQW1CLENBRHJCLDRCQUdJLG1CQUFxQixDQUh6QixnQ0FLTSxtQkFBcUIsQ0FDckIsWUFBYSIsImZpbGUiOiJpbmRleC5zY3NzIn0= */";
styleInject(css$2);

var ShivU = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iU2hpdlUuc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMyIiAvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjAuMzUiDQogICAgIGlua3NjYXBlOmN4PSI0MDAiDQogICAgIGlua3NjYXBlOmN5PSI3ODguNTcxNDMiDQogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSINCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIg0KICAgICBzaG93Z3JpZD0iZmFsc2UiDQogICAgIHVuaXRzPSJweCINCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNjAwIg0KICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4MzciDQogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIiAvPg0KICA8bWV0YWRhdGENCiAgICAgaWQ9Im1ldGFkYXRhNSI+DQogICAgPHJkZjpSREY+DQogICAgICA8Y2M6V29yaw0KICAgICAgICAgcmRmOmFib3V0PSIiPg0KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgPGRjOnR5cGUNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4NCiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+DQogICAgICA8L2NjOldvcms+DQogICAgPC9yZGY6UkRGPg0KICA8L21ldGFkYXRhPg0KICA8Zw0KICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSINCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciINCiAgICAgaWQ9ImxheWVyMSINCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMjU0LjY2NjY1KSI+DQogICAgPGcNCiAgICAgICBpZD0iZzQwIg0KICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuMTAyNDMwNiwwLDAsMS4xMDI0MzA2LDIuMjA0ODYxMmUtNCwyNTQuNjY2ODcpIj4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGgyNiINCiAgICAgICAgIHN0eWxlPSJmaWxsOm5vbmUiDQogICAgICAgICBkPSJNIDAsMzguMzk5OCBWIDAgaCAzOC4zOTk4IHYgMzguMzk5OCB6IiAvPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDI4Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6IzU2NTc1NztmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgIGQ9Im0gNi4yMzAyLDI5LjM0NjQgMTIuOTY4MiwtMTIuOTY4MyAxMi45NzExLDEyLjk2ODMgMC4wNTU4LDAuMDYxMyBjIDAuNjQ5OCwwLjcxNCAxLjU4NjgsMS4xNjMgMi42MjcxLDEuMTYzIDEuOTYwNiwwIDMuNTQ3NCwtMS41ODY5IDMuNTQ3NCwtMy41NDc1IDAsLTEuMDQwMiAtMC40NDksLTEuOTc3MyAtMS4xNjI5LC0yLjYyNzEgTCAzNy4xNzU1LDI0LjM0MDMgMjEuNzAyOCw4Ljg2NDkgYyAtMS4zODA1LC0xLjM4MDUgLTMuNjI4MywtMS4zODA1IC01LjAwODgsMCBMIDEuMTYyOCwyNC4zOTYxIGMgLTAuNzE0LDAuNjQ5OCAtMS4xNjMsMS41ODY5IC0xLjE2MywyLjYyNzEgMCwxLjk2MDYgMS41ODY5LDMuNTQ3NSAzLjU0NzUsMy41NDc1IDEuMDcwOSwwIDIuMDMzLC0wLjQ3NDEgMi42ODI5LC0xLjIyNDMgeiIgLz4NCiAgICA8L2c+DQogIDwvZz4NCjwvc3ZnPg==';

var ShivD = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iU2hpdkQuc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMyIiAvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjAuMzUiDQogICAgIGlua3NjYXBlOmN4PSItMzk4LjU3MTQzIg0KICAgICBpbmtzY2FwZTpjeT0iNzg4LjU3MTQzIg0KICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICB1bml0cz0icHgiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTYwMCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODM3Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgLz4NCiAgPG1ldGFkYXRhDQogICAgIGlkPSJtZXRhZGF0YTUiPg0KICAgIDxyZGY6UkRGPg0KICAgICAgPGNjOldvcmsNCiAgICAgICAgIHJkZjphYm91dD0iIj4NCiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+DQogICAgICAgIDxkYzp0eXBlDQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+DQogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPg0KICAgICAgPC9jYzpXb3JrPg0KICAgIDwvcmRmOlJERj4NCiAgPC9tZXRhZGF0YT4NCiAgPGcNCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiDQogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiDQogICAgIGlkPSJsYXllcjEiDQogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTI1NC42NjY2NSkiPg0KICAgIDxnDQogICAgICAgaWQ9ImcyNCINCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLjEwMjQzNjMsMCwwLDEuMTAyNDM2MywyLjIwNDg3MjZlLTQsMjU0LjY2NjY1KSI+DQogICAgICA8cGF0aA0KICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgICAgIGlkPSJwYXRoMTAiDQogICAgICAgICBzdHlsZT0iZmlsbDpub25lIg0KICAgICAgICAgZD0iTSAwLDAgViAzOC4zOTk4IEggMzguMzk5OCBWIDAgWiIgLz4NCiAgICAgIDxwYXRoDQogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICAgICAgaWQ9InBhdGgxMiINCiAgICAgICAgIHN0eWxlPSJmaWxsOiM1NjU3NTc7ZmlsbC1ydWxlOmV2ZW5vZGQiDQogICAgICAgICBkPSJNIDYuMjMwMiw5LjA1MzUgMTkuMTk4NCwyMi4wMjE3IDMyLjE2OTUsOS4wNTM1IDMyLjIyNTMsOC45OTIxIGMgMC42NDk4LC0wLjcxNCAxLjU4NjgsLTEuMTYzIDIuNjI3MSwtMS4xNjMgMS45NjA2LDAgMy41NDc0LDEuNTg2OSAzLjU0NzQsMy41NDc1IDAsMS4wNDAyIC0wLjQ0OSwxLjk3NzMgLTEuMTYyOSwyLjYyNzEgTCAzNy4xNzU1LDE0LjA1OTUgMjEuNzAyOCwyOS41MzUgYyAtMS4zODA1LDEuMzgwNCAtMy42MjgzLDEuMzgwNCAtNS4wMDg4LDAgTCAxLjE2MjgsMTQuMDAzNyBjIC0wLjcxNCwtMC42NDk4IC0xLjE2MywtMS41ODY5IC0xLjE2MywtMi42MjcxIDAsLTEuOTYwNiAxLjU4NjksLTMuNTQ3NSAzLjU0NzUsLTMuNTQ3NSAxLjA3MDksMCAyLjAzMywwLjQ3NDEgMi42ODI5LDEuMjI0NCB6IiAvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+';

var CrossInput = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCg0KPHN2Zw0KICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIg0KICAgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyINCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHdpZHRoPSIxNjAiDQogICBoZWlnaHQ9IjE2MCINCiAgIHZpZXdCb3g9IjAgMCA0Mi4zMzMzMzIgNDIuMzMzMzM1Ig0KICAgdmVyc2lvbj0iMS4xIg0KICAgaWQ9InN2ZzgiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0iY3Jvc3MtaW5wdXQuc3ZnIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMyIiAvPg0KICA8c29kaXBvZGk6bmFtZWR2aWV3DQogICAgIGlkPSJiYXNlIg0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxLjAiDQogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOnpvb209IjEuOTc5ODk5Ig0KICAgICBpbmtzY2FwZTpjeD0iMjA3LjQ3ODQxIg0KICAgICBpbmtzY2FwZTpjeT0iMTYwLjQxNjA1Ig0KICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICB1bml0cz0icHgiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAwMSINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii05Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTkiDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIC8+DQogIDxtZXRhZGF0YQ0KICAgICBpZD0ibWV0YWRhdGE1Ij4NCiAgICA8cmRmOlJERj4NCiAgICAgIDxjYzpXb3JrDQogICAgICAgICByZGY6YWJvdXQ9IiI+DQogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0Pg0KICAgICAgICA8ZGM6dHlwZQ0KICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPg0KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4NCiAgICAgIDwvY2M6V29yaz4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxnDQogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIg0KICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIg0KICAgICBpZD0ibGF5ZXIxIg0KICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yNTQuNjY2NjUpIj4NCiAgICA8Zw0KICAgICAgIGlkPSJnNzEiDQogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC4zMzgwODIzMywwLDAsMC4zMzgwODIzMywtNzkuNTEyMDQyLDEzMy44Mzg5MykiPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDU3Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZSINCiAgICAgICAgIGQ9Ik0gMjM3LjYzODYsMzYwLjk0NDggViA0ODAuOTQ1IEggMzU3LjYzODUgViAzNjAuOTQ0OCBaIiAvPg0KICAgICAgPHBhdGgNCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgICAgICBpZD0icGF0aDU5Ig0KICAgICAgICAgc3R5bGU9ImZpbGw6IzU2NTc1NztmaWxsLXJ1bGU6ZXZlbm9kZCINCiAgICAgICAgIGQ9Im0gMzMwLjM0ODUsNDY5LjMxMTMgLTMyLjcxMTYsLTMyLjcxMTggLTMyLjcwMjcsMzIuNzAyNyBjIC0yLjAzMDcsMi4zNDQ2IC01LjAzNzIsMy44MjYyIC04LjM4MzcsMy44MjYyIC02LjEyNzEsMCAtMTEuMDg2MywtNC45NTkyIC0xMS4wODYzLC0xMS4wODYzIDAsLTMuMjUwMiAxLjQwMzEsLTYuMTc4NiAzLjYzNDUsLTguMjA5NCBsIDMyLjg4NTYsLTMyLjg4NjQgLTMyLjg3OTYsLTMyLjg4MDIgYyAtMi4yMzE0LC0yLjAzMDcgLTMuNjM0NiwtNC45NTkyIC0zLjYzNDYsLTguMjA5NCAwLC02LjEyNzEgNC45NTkyLC0xMS4wODYzIDExLjA4NjMsLTExLjA4NjMgMy4zNDY2LDAgNi4zNTMsMS40ODE3IDguMzgzOCwzLjgyNjIgbCAzMi42OTY3LDMyLjY5NjggMzIuNzA1NiwtMzIuNzA1OSBjIDIuMDMwOCwtMi4zNDQ1IDUuMDM3MiwtMy44MjYyIDguMzgzOCwtMy44MjYyIDYuMTI3MSwwIDExLjA4NjMsNC45NTkyIDExLjA4NjMsMTEuMDg2MyAwLDMuMjUwMiAtMS40MDMyLDYuMTc4NyAtMy42MzQ2LDguMjA5NCBsIC0zMi44ODg3LDMyLjg4OTMgMzIuODk0NiwzMi44OTU1IGMgMi4yMzE1LDIuMDMwNyAzLjYzNDYsNC45NTkyIDMuNjM0Niw4LjIwOTQgMCw2LjEyNzEgLTQuOTU5MiwxMS4wODYzIC0xMS4wODYzLDExLjA4NjMgLTMuMzQ2NiwwIC02LjM1MywtMS40ODE3IC04LjM4MzcsLTMuODI2MiB6IiAvPg0KICAgIDwvZz4NCiAgPC9nPg0KPC9zdmc+';

var StdSpinner = function () {
    return (React__default.createElement("div", { className: "mad-uploader-spinner" },
        React__default.createElement("div", { className: "sk-three-bounce" },
            React__default.createElement("div", { className: "sk-bounce-1 sk-child" }),
            React__default.createElement("div", { className: "sk-bounce-2 sk-child" }),
            React__default.createElement("div", { className: "sk-bounce-3 sk-child" }))));
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
    var _b = _a.isRequired, isRequired = _b === void 0 ? false : _b, _c = _a.label, label = _c === void 0 ? null : _c, name = _a.name, options = _a.options, _d = _a.value, value = _d === void 0 ? null : _d, _e = _a.isDisabled, isDisabled = _e === void 0 ? false : _e, onChange = _a.onChange, _f = _a.onMultiChange, onMultiChange = _f === void 0 ? null : _f, _g = _a.onFocus, onFocus = _g === void 0 ? null : _g, _h = _a.onBlur, onBlur = _h === void 0 ? null : _h, _j = _a.isClearable, isClearable = _j === void 0 ? true : _j, _k = _a.placeholder, placeholder = _k === void 0 ? "Выберите" : _k, _l = _a.onInputChange, onInputChange = _l === void 0 ? null : _l, _m = _a.loading, loading = _m === void 0 ? null : _m, _o = _a.noOptionsMessage, noOptionsMessage = _o === void 0 ? null : _o, _p = _a.isMulti, isMulti = _p === void 0 ? false : _p;
    var GROUP_HEADER_HEIGHT = 10;
    var ITEM_HEIGHT = 35;
    /** Дефолтный MenuList очень медленно работает с большим массивом данных поэтому используем react-window*/
    var MenuList = function (props) {
        var options = props.options, getValue = props.getValue;
        var value = getValue()[0];
        var initialOffset = options.indexOf(value) * ITEM_HEIGHT;
        var children = React__default.Children.toArray(props.children);
        function getOptionSize(option) {
            if (option && option.options) {
                return option.options.length * ITEM_HEIGHT + GROUP_HEADER_HEIGHT;
            }
            return ITEM_HEIGHT;
        }
        function getItemSize(i) {
            return getOptionSize(options[i]);
        }
        var totalHeight = options.reduce(function (height, option) {
            return height + getOptionSize(option);
        }, 0);
        var estimatedItemSize = totalHeight / options.length;
        return (React__default.createElement(reactWindow.VariableSizeList, { height: Math.min(totalHeight != 0 ? totalHeight : ITEM_HEIGHT, 140), itemCount: children.length, itemSize: getItemSize, estimatedItemSize: estimatedItemSize, initialScrollOffset: initialOffset }, function (_a) {
            var index = _a.index, style = _a.style;
            return React__default.createElement("div", { style: style }, children[index]);
        }));
    };
    return (React__default.createElement(React__default.Fragment, null,
        label && (React__default.createElement("label", { className: "mad-form__label" },
            label,
            isRequired && !isDisabled && React__default.createElement("span", { style: { color: "red" } }, " *"))),
        React__default.createElement(Select__default, { isLoading: loading, options: options, name: name, className: "mad-select" + (isMulti ? " mad-select--isMulti" : undefined), classNamePrefix: "mad-select", isDisabled: isDisabled, menuPlacement: "auto", 
            // menuPosition="fixed"
            // menuIsOpen={true}
            isMulti: isMulti, isClearable: isClearable, onChange: function (e) { return (!isMulti ? onChange(e, name) : onMultiChange(e, name)); }, styles: styles, noOptionsMessage: function () { return (noOptionsMessage ? noOptionsMessage : __.t("noOptions")); }, onFocus: onFocus ? function (e) { return onFocus(e); } : null, onBlur: onBlur ? function (e) { return onBlur(e); } : null, onInputChange: onInputChange ? function (value) { return onInputChange(value); } : null, components: { DropdownIndicator: DropdownIndicator, ClearIndicator: ClearIndicator, LoadingMessage: LoadingMessage, MenuList: MenuList }, defaultValue: value, value: !isMulti ? value : undefined, placeholder: placeholder })));
};
var styles = {
    control: function (provided, state) { return (__assign({}, provided, { "&:hover": {
            borderColor: !state.isFocused ? "#B3B3B3" : "#808080"
        }, "border": !state.isFocused ? "2px solid #B3B3B3" : "2px solid #808080", "borderRadius": "0.25rem", "boxShadow": "none" })); },
    placeholder: function (provided, state) { return (__assign({}, provided, { color: "#B3B3B3", fontFamily: "dinpro-med" })); },
    indicatorSeparator: function (provided, state) { return (__assign({}, provided, { display: "none" })); },
    indicatorsContainer: function (provided, state) { return (__assign({}, provided
    // padding: "8px 10px 8px 8px"
    )); },
    option: function (provided, state) { return (__assign({}, provided, { ":active": {
            backgroundColor: state.isSelected ? "#F2F2F2" : "#transparent"
        }, ":hover": {
            backgroundColor: "#e6e6e6"
        }, "backgroundColor": state.isSelected ? "#F2F2F2" : "transparent", "color": state.isDisabled ? "black" : state.isSelected ? "black" : "inherit" })); },
    multiValueLabel: function (styles, _a) {
        var data = _a.data;
        return (__assign({}, styles, { color: data.color, fontFamily: "dinpro-med" }));
    }
};

var commonRU = {
    tooltipDescription: 'Пожалуйста, введите "{{attribute}}".',
    tooltipDescriptionEmpty: "Данное поле обязательно для заполнения.",
    tooltipDescriptionTrue: 'Поле "{{attribute}}" заполнено верно.',
    tooltipDescriptionIncorrect: "Bведитe действующий адрес электронной почты. Например: ivanov@mail.ru",
    tooltipDescriptionPasswordMatch: "Введенные пароли не совпадают.",
    optional: "не обязательно",
    noOptions: "Нет записей"
};

var commonEn = {
    tooltipDescription: 'Please enter "{{attribute}}".',
    tooltipDescriptionEmpty: "This field is required.",
    tooltipDescriptionTrue: 'The "{{attribute}}" field is correct.',
    tooltipDescriptionIncorrect: "Enter valid email address. Example: ivanov@mail.ru",
    tooltipDescriptionPasswordMatch: "Those passwords didn't match. Try again.",
    optional: "optional",
    noOptions: "No Options"
};

var commonKK = {
    tooltipDescription: '"{{attribute}}" енгізіңіз.',
    tooltipDescriptionEmpty: "Бұл жолды толтыру қажет.",
    tooltipDescriptionTrue: 'The "{{attribute}}" field is correct.',
    tooltipDescriptionIncorrect: "Нақты электрондық поштаны енгізіңіз. Мысалы: ivanov@mail.ru",
    tooltipDescriptionPasswordMatch: "Еңгізілген құпиясөздер сәйкес келмейді. Қайтадан еңгізіп көріңіз.",
    optional: "міндетті емес",
    noOptions: "Жазбалар жоқ"
};

__
    // .use(reactI18nextModule)
    // .use(LanguageDetector)
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

var validateInput = function (rules, value, tooltip, label, validateAfter) {
    if (rules === void 0) { rules = []; }
    if (validateAfter === void 0) { validateAfter = 0; }
    /** Если поле не required и он пустой, то по умолчанию должно быть messageType и description = info, а потом уже срабатывают другие rules */
    var description = __.t("tooltipDescription", { attribute: label });
    var messageType = "info";
    var isValid = true;
    value = value.toString();
    /** Можно указать с какого момента надо  */
    if (value.length >= validateAfter) {
        rules.forEach(function (rule) {
            switch (true) {
                case typeof rule === "string":
                    switch (rule) {
                        case "required":
                            if (validator.isEmpty(value)) {
                                description = __.t("tooltipDescriptionEmpty", { attribute: tooltip.title });
                                isValid = false;
                            }
                            break;
                        case "email":
                            if (!validator.isEmail(value) && !validator.isEmpty(value)) {
                                description = __.t("tooltipDescriptionIncorrect", { attribute: tooltip.title });
                                isValid = false;
                            }
                            break;
                        case "card":
                            if (!validator.isCreditCard(value) && !validator.isEmpty(value)) {
                                description = "Credit card is not valid"; //TODO: perevesty //__.t("tooltipDescriptionIncorrect", { attribute: tooltip.title }),
                                isValid = false;
                            }
                            break;
                        case "integer":
                            if (!validator.isInt(value) && !validator.isEmpty(value)) {
                                description = "Должен быть целым числом";
                                isValid = false;
                            }
                            // if (value < 0) {
                            //   description = "Поле не может иметь отрицательное значение"
                            //   isValid = false
                            // }
                            break;
                        case "float":
                            if (!validator.isFloat(value) && !validator.isEmpty(value)) {
                                description = "Не является число с плавающей точкой";
                                isValid = false;
                            }
                            // if (value < 0) {
                            //   description = "Поле не может иметь отрицательное значение"
                            //   isValid = false
                            // }
                            break;
                        case "url":
                            if (!validator.isEmpty(value) && !validator.isURL(value)) {
                                description = "Поле не является правильным сайтом";
                                isValid = false;
                            }
                            break;
                        default:
                    }
                    break;
                case Array.isArray(rule):
                    switch (rule[0]) {
                        case "custom":
                            var result = rule[1](value);
                            if (!result.isValid) {
                                description = result.description;
                                isValid = false;
                            }
                            break;
                        case "maxString":
                            if (!validator.isLength(value, { max: rule[1] })) {
                                description = "Превышено максимальное количество символов - " + rule[1];
                                isValid = false;
                            }
                            break;
                        case "compare":
                            if (value != rule[1]) {
                                description = __.t("tooltipDescriptionPasswordMatch");
                                isValid = false;
                            }
                            break;
                        case "minAmountValue":
                            if (value < rule[1]) {
                                description = "\u041E\u0431\u044A\u0435\u043C \u0442\u043E\u0432\u0430\u0440\u0430 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 " + rule[1] + " \u0442\u043E\u043D\u043D";
                                isValid = false;
                            }
                            break;
                        case "lte":
                            if (parseFloat(value) > parseFloat(rule[1])) {
                                description = "значение должно быть меньше или равно " + rule[1];
                                isValid = false;
                            }
                            break;
                        case "gte":
                            if (parseFloat(value) < parseFloat(rule[1])) {
                                description = "значение должно быть больше или равно " + rule[1];
                                isValid = false;
                            }
                            break;
                    }
                    break;
            }
        });
    }
    else {
        return {
            tooltipValidated: __assign({}, tooltip, { messageType: "info" }),
            isValid: isValid
        };
    }
    if (isValid) {
        /** Если он прошел все правила и длина строки = 0 - значит поле optional, соответственно messageType = info*/
        if (value.length != 0) {
            description = __.t("tooltipDescriptionTrue", { attribute: label });
            messageType = "success";
        }
    }
    else {
        /** error description формируется в рулах */
        messageType = "error";
    }
    return {
        tooltipValidated: __assign({}, tooltip, { description: description,
            messageType: messageType }),
        isValid: isValid
    };
};

var InputStyleOne = function (props) {
    var _a = props.showLabel, showLabel = _a === void 0 ? true : _a, _b = props.showOptionalLabel, showOptionalLabel = _b === void 0 ? true : _b, inputType = props.inputType, label = props.label, name = props.name, value = props.value, _c = props.infoDescription, infoDescription = _c === void 0 ? null : _c, disabled = props.disabled, placeholder = props.placeholder, _d = props.enableTooltip, enableTooltip = _d === void 0 ? true : _d, validateAfter = props.validateAfter, _e = props.selectOptions, selectOptions = _e === void 0 ? null : _e, _f = props.datePickerOptions, datePickerOptions = _f === void 0 ? null : _f, _g = props.numberFormatOptions, numberFormatOptions = _g === void 0 ? null : _g, _h = props.autoComplete, autoComplete = _h === void 0 ? "off" : _h;
    var _j = React.useState({
        isVisible: false,
        title: "",
        description: "",
        descriptions: {
            info: null,
            error: null,
            success: null
        },
        messageType: "info"
    }), tooltip = _j[0], setTooltip = _j[1];
    React.useEffect(function () {
        /** Rewrite from default custom infoDescription if needed */
        setTooltip(__assign({}, tooltip, { description: infoDescription ? infoDescription : __.t("tooltipDescription", { attribute: label }), title: label }));
        var value = props.value, rules = props.rules;
        // для управления событиями в select-е
        if (selectOptions && selectOptions.value) {
            setTooltip(__assign({}, tooltip, { description: infoDescription ? infoDescription : __.t("tooltipDescription", { attribute: label }), title: label, messageType: "success" }));
        }
        /** Если изначално есть какое нибудь значение и правила сразу провести валидацию */
        if (value && rules) {
            validateRules(rules, value);
        }
    }, []);
    //Вынес в отдельную ф-ю, т.к будет вызызаться в случаях если value уже существует
    var validateRules = function (rules, value, validateAfter) {
        if (validateAfter === void 0) { validateAfter = 0; }
        var _a = validateInput(rules, value, tooltip, label, validateAfter), tooltipValidated = _a.tooltipValidated, isValid = _a.isValid;
        setTooltip(tooltipValidated);
        return isValid;
    };
    var handleChange = function (e, validateAfter) {
        if (validateAfter === void 0) { validateAfter = 0; }
        e.preventDefault();
        var _a = e.target, value = _a.value, name = _a.name;
        var isValid = validateRules(props.rules, value, validateAfter);
        props.handleChange({ value: value, name: name, label: null, isValid: isValid });
    };
    // cb ф-я NurmerFormat, вынес отдельно т.к отличается передаваемые параметры
    var handleValueChange = function (values, name, validateAfter) {
        if (validateAfter === void 0) { validateAfter = 0; }
        var value = values.value;
        var isValid = validateRules(props.rules, value, validateAfter);
        props.handleChange({ value: value, name: name, label: null, isValid: isValid });
    };
    var handleFocus = function (e) {
        e.preventDefault();
        setTooltip(__assign({}, tooltip, { isVisible: true, messageType: tooltip.messageType }));
    };
    var handleBlur = function (e) {
        e.preventDefault();
        setTooltip(__assign({}, tooltip, { isVisible: false, messageType: tooltip.messageType }));
    };
    var renderInput = function () {
        var Status = function (_a) {
            var messageType = _a.messageType;
            if (messageType == "error")
                return React__default.createElement("span", { className: "mad-form__status mad-form__status-error" });
            if (messageType == "success")
                return React__default.createElement("span", { className: "mad-form__status mad-form__status-success" });
            return React__default.createElement("span", { className: "mad-form__status mad-form__status-info" });
        };
        var Icon = function () {
            if (!props.iconUrl) {
                return React__default.createElement(React__default.Fragment, null);
            }
            return (React__default.createElement(React__default.Fragment, null,
                React__default.createElement("img", { className: "mad-form__icon", src: props.iconUrl, alt: "" }),
                React__default.createElement("span", { className: "mad-form__delimeter" })));
        };
        switch (inputType) {
            case "password": {
                return (React__default.createElement(MadTooltip, { data: tooltip, enabled: enableTooltip },
                    React__default.createElement("div", { className: "mad-form__input", tabIndex: -1 },
                        React__default.createElement(Icon, null),
                        React__default.createElement("input", { name: name, type: inputType, autoComplete: autoComplete, className: "mad-form__control", onChange: function (e) { return handleChange(e, validateAfter); }, onFocus: handleFocus, onBlur: handleBlur, placeholder: label, value: value, disabled: disabled }),
                        React__default.createElement(Status, { messageType: tooltip.messageType }))));
            }
            case "textArea": {
                return (React__default.createElement(MadTooltip, { data: tooltip, enabled: enableTooltip },
                    React__default.createElement("div", { className: "mad-form__input mad-form__input-textarea", tabIndex: -1 },
                        React__default.createElement(Textarea, { className: "mad-form__control", name: name, value: value, autoComplete: props.autoComplete, onChange: function (e) { return handleChange(e); }, onFocus: function (e) { return handleFocus(e); }, onBlur: function (e) { return handleBlur(e); }, placeholder: placeholder ? placeholder : "Заполните " + label, disabled: disabled, minRows: props.minRows ? props.minRows : 3, maxRows: props.maxRows ? props.maxRows : 10 }),
                        React__default.createElement(Status, { messageType: tooltip.messageType }))));
            }
            case "datePicker": {
                var overlayPosition = datePickerOptions
                    ? datePickerOptions.overlayPosition
                        ? datePickerOptions.overlayPosition
                        : "bottom"
                    : "bottom";
                var handleChange_1 = function (day) {
                    setTooltip(__assign({}, tooltip, { messageType: day != "" ? "success" : "info" }));
                    props.handleChange({
                        value: day != "" ? moment(day).unix() - 12 * 3600 : "",
                        name: name,
                        isValid: true,
                        label: null
                    });
                };
                return (React__default.createElement(MadTooltip, { data: tooltip, enabled: enableTooltip },
                    React__default.createElement("div", { onFocus: handleFocus, onBlur: handleBlur, tabIndex: -1, 
                        // style={{ outline: "none", borderColor: "transparent" }}
                        className: "mad-form__input" },
                        React__default.createElement(DayPickerInput, { classNames: {
                                container: "DayPickerInput",
                                overlayWrapper: "DayPickerInput-OverlayWrapper",
                                overlay: "DayPickerInput-Overlay" + (overlayPosition == "top" ? " DayPickerInput-Overlay--top" : "") // The overlay's container
                            }, onBlur: function (e) { return handleBlur(e); }, placeholder: placeholder ? placeholder : "Выберите дату", inputProps: { readOnly: true, name: name, disabled: disabled }, onDayChange: function (day) { return handleChange_1(day); }, value: value != "" ? moment(value * 1000).format("DD MMMM YYYY") : value, format: "DD MMMM YYYY", 
                            // showOverlay={true}
                            dayPickerProps: __assign({ locale: "ru", localeUtils: MomentLocaleUtils, name: name }, datePickerOptions) }),
                        value != "" && (React__default.createElement("img", { src: CrossInput, alt: "", style: { width: "18px", height: "18px", cursor: "pointer" }, onClick: function (e) { return handleChange_1(""); } })))));
            }
            case "select": {
                var options = selectOptions.options, value_1 = selectOptions.value, isClearable = selectOptions.isClearable, onInputChange_1 = selectOptions.onInputChange, loading = selectOptions.loading, noOptionsMessage = selectOptions.noOptionsMessage, _a = selectOptions.isMulti;
                var handleChange_2 = function (_a) {
                    var value = _a.value, name = _a.name;
                    setTooltip(__assign({}, tooltip, { messageType: value && value.value ? "success" : "info" }));
                    props.handleChange({
                        value: value ? value.value : "",
                        name: name,
                        label: value ? value.label : null,
                        isValid: !!value
                    });
                };
                return (React__default.createElement(MadTooltip, { data: tooltip, enabled: enableTooltip },
                    React__default.createElement("div", { tabIndex: -1 },
                        React__default.createElement(MadSelect, { name: name, isClearable: isClearable, onFocus: handleFocus, onBlur: handleBlur, options: options, placeholder: placeholder, noOptionsMessage: noOptionsMessage, onChange: function (value, name) { return handleChange_2({ value: value, name: name }); }, value: options.find(function (option) { return option.value == value_1; }), onInputChange: onInputChange_1 ? function (value) { return onInputChange_1(value); } : null, isDisabled: disabled, loading: loading }))));
            }
            case "multi-select": {
                var options = selectOptions.options, value_2 = selectOptions.value, isClearable = selectOptions.isClearable, onInputChange_2 = selectOptions.onInputChange, loading = selectOptions.loading, noOptionsMessage = selectOptions.noOptionsMessage;
                var handleChange_3 = function (e, name) {
                    setTooltip(__assign({}, tooltip, { messageType: e ? "success" : "info" }));
                    props.handleChange({
                        selectValues: e,
                        name: name,
                        isValid: !!value_2
                    });
                };
                return (React__default.createElement(MadTooltip, { data: tooltip, enabled: enableTooltip },
                    React__default.createElement("div", { tabIndex: -1 },
                        React__default.createElement(MadSelect, { name: name, isClearable: isClearable, onFocus: handleFocus, onBlur: handleBlur, options: options, placeholder: placeholder, noOptionsMessage: noOptionsMessage, onChange: null, onMultiChange: function (e, name) { return handleChange_3(e, name); }, value: value_2, isMulti: true, onInputChange: onInputChange_2 ? function (value) { return onInputChange_2(value); } : null, isDisabled: disabled, loading: loading }))));
            }
            case "numberFormat": {
                var suffix = numberFormatOptions.suffix, thousandSeparator = numberFormatOptions.thousandSeparator, format = numberFormatOptions.format, mask = numberFormatOptions.mask, type = numberFormatOptions.type, _b = numberFormatOptions.allowNegative, allowNegative = _b === void 0 ? false : _b, _c = numberFormatOptions.allowZeroStart, allowZeroStart_1 = _c === void 0 ? false : _c, _d = numberFormatOptions.decimalScale, decimalScale = _d === void 0 ? 0 : _d;
                return (React__default.createElement(MadTooltip, { data: tooltip, enabled: enableTooltip },
                    React__default.createElement("div", { className: "mad-form__input", tabIndex: -1 },
                        React__default.createElement(Icon, null),
                        React__default.createElement(NumberFormat, { name: name, className: "mad-form__control", onFocus: handleFocus, onBlur: handleBlur, placeholder: placeholder ? placeholder : "Заполните " + label, value: value, disabled: disabled, suffix: suffix, mask: mask, allowNegative: allowNegative, 
                            //todo: nado dovesty etu temu do uma tk esy ya napiwu "-0" ona ego propustit nu i drugie vozmohznie problemy
                            isAllowed: function (values) { return allowZeroStart_1 || !values.value.startsWith("0"); }, format: format, type: type, thousandSeparator: thousandSeparator, onValueChange: function (values) { return handleValueChange(values, name, validateAfter); }, decimalScale: decimalScale }),
                        React__default.createElement(Status, { messageType: tooltip.messageType }))));
            }
            default: {
                /**
                 * если inputType не указан то считать поумолчанию inputType=text
                 * tabIndex = -1 нужно чтобы при нажатии Tab он делал фокус не не mad-form__input
                 * (ему tabIndex = 0 присваивает TippyJS) а на следующий input
                 */
                return (React__default.createElement(MadTooltip, { data: tooltip, enabled: enableTooltip },
                    React__default.createElement("div", { className: "mad-form__input", tabIndex: -1 },
                        React__default.createElement(Icon, null),
                        React__default.createElement("input", { tabIndex: 0, name: name, autoComplete: props.autoComplete, className: "mad-form__control", onChange: function (e) { return handleChange(e, validateAfter); }, onFocus: handleFocus, onBlur: handleBlur, placeholder: placeholder ? placeholder : label, value: value, disabled: disabled }),
                        React__default.createElement(Status, { messageType: tooltip.messageType }))));
            }
        }
    };
    var Label = function () {
        if (!showLabel) {
            return React__default.createElement(React__default.Fragment, null);
        }
        /** Если поле обязательно. Надпись "необязательно" не добавляем */
        if (_.indexOf(props.rules, "required") > -1) {
            return (React__default.createElement("div", { className: "mad-form__label" },
                React__default.createElement("label", null, label)));
        }
        return (React__default.createElement("div", { className: "mad-form__label" },
            React__default.createElement("label", null, label),
            showOptionalLabel && React__default.createElement("span", { className: "mad-form-optional" }, __.t("optional"))));
    };
    /** NOTE: не пытайтесь вытащить MadTootip сюда т.к. у это компонента должен быть только один child. в нашем случае mad-form__input */
    return (React__default.createElement(reactI18next.I18nextProvider, { i18n: __ },
        React__default.createElement("div", { className: "mad-form" + (disabled ? " mad-form--disabled" : "") },
            React__default.createElement(Label, null),
            renderInput())));
};

module.exports = InputStyleOne;
