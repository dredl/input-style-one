import React, { Component, Fragment, FC } from "react"
import Tippy from "@tippy.js/react"
import "tippy.js/dist/tippy.css"
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
  return (
    <Fragment>
      {enabled == undefined ? (
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
      ) : (
        children
      )}
    </Fragment>
  )
}

export default MadTooltip
