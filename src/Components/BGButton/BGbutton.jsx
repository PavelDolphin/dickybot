import React from 'react'
import "./bgbutton.css"

function BGbutton({BG, handleSelect, handlePurchase}) {

  var disabled = true;

  if (BG.state ==="purchased") {
    disabled=false;
  }
  else if(BG.state ==="locked")
  {
    disabled=true;
  }

  return (
    <>
    <label id = "bgLabel">
      <input type = 'radio' name='bg' onClick={()=> handleSelect(BG.key)} disabled={disabled}></input>
        <div className='lockedBG'>
            <p>{BG.price}</p>
          <div className='buyButton' onClick={()=> handlePurchase(BG.key)}>BUY</div>
        </div>
      <span style={{backgroundImage: `url(${BG.preview_link})`}}></span>
    </label>
    </>
  )
}

export default BGbutton