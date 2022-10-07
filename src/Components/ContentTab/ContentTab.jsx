import React from 'react'
import "./contenttab.css"

function ColorTab(props, {identifier}) {
  return (
    <>
    <div id={identifier} className="tabcontent">
        <form >
            {props.children}
        </form>
    </div>
    </>
  )
}

export default ColorTab