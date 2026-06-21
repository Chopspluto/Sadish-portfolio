import React from 'react'

const Hud = () => {
  return (
    <>
    <div className="hud">
      <div className="hud-ring ring-1"></div>
      <div className="hud-ring ring-2"></div>
      <div className="hud-ring ring-3"></div>
      <div className="radar-sweep"></div>
      <div className="crosshair horizontal"></div>
      <div className="crosshair vertical"></div>
      <div className="ticks"></div>
      <div className="hud-label top">000</div>
      <div className="hud-label right">090</div>
      <div className="hud-label bottom">180</div>
      <div className="hud-label left">270</div>
    </div>
    </>
  )
}

export default Hud