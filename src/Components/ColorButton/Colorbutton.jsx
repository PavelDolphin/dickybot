import React from 'react'
import "./colorbutton.css"

function Colorbutton({color, buttonstate}) {

    var lock;

    if (buttonstate ==="locked") {
        lock = 
    <svg className="lockIcon" width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_37_18363)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 11V8C9 4.732 11.732 2 15 2C18.268 2 21 4.732 21 8V11C23.7614 11 26 13.2386 26 16V22C26 24.7614 23.7614 27 21 27H9C6.23858 27 4 24.7614 4 22V16C4 13.2386 6.23858 11 9 11ZM15 5C16.634 5 18 6.366 18 8V11H12V8C12 6.366 13.366 5 15 5ZM16 19.7324C16.5978 19.3866 17 18.7403 17 18C17 16.8954 16.1046 16 15 16C13.8954 16 13 16.8954 13 18C13 18.7403 13.4022 19.3866 14 19.7324V21C14 21.5523 14.4477 22 15 22C15.5523 22 16 21.5523 16 21V19.7324Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter0_d_37_18363" x="0" y="0" width="30" height="33" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="2"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_18363"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_18363" result="shape"/>
    </filter>
    </defs>
    </svg>
    }

    return (
    <>
    <label id = "colorLabel">
    <input type = 'radio' name='color'></input>
    {lock}
    <span style={{backgroundColor: color}}></span>
    </label>
    </>
  )
}

export default Colorbutton