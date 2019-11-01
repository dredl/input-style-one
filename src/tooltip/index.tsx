import React, { Component, Fragment, FC } from "react"
import Tippy from "@tippy.js/react"
import "tippy.js/index.css"
import "./index.scss"
import __ from "i18next"
//nuzhno otrefactorit'
const MadTooltip: FC<any> = ({ children, data, enabled }) => {
  let { title, description, isVisible, messageType } = data
  const Content = (
    <Fragment>
      <div className={"mad-tooltip " + messageType}>
        <div className="mad-tooltip__content">
          <span className="mad-tooltip__title">{title}</span>
          <span className="mad-tooltip__description">{description}</span>
        </div>
      </div>
    </Fragment>
  )
  if (enabled) {
    return (
      <Tippy
        content={Content}
        animation="fade"
        placement="right"
        trigger="manual"
        isVisible={isVisible}
        hideOnClick={false}
        arrow={true}
      >
        {children}
      </Tippy>
    )
  }
  return children
}

export default MadTooltip
