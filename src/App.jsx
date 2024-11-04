import { useState } from "react"
import { targets } from "./targets"
import { createPdf, range, scrPaper, grid } from "./utils"

import './App.css'

const IMG_DIR = '/us-target-editor/img'

export default function App() {
  const [target, setTarget] = useState(6)
  const [cols, setCols] = useState(4)
  const [rows, setRows] = useState(6)
  const [size, setSize] = useState(1)
  const [title, setTitle] = useState("30 Yard, H&N Sniper Magnum .177 14.97gr")
  const [gridOn, setGridOn] = useState(true)

  return (
    <div className="">
      <div className="bg-slate-300 text-center text-5xl font-bold p-4 h-20">US Targets editor</div>
      <div className="leftPanel inline-block align-top  p-4 bg-slate-300 text-xl">
        <span className="px-2">Title</span>
        <br />
        <input
          className="border border-slate-400 rounded-md p-1 w-full"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <br />
        <span className="px-2">Shapes</span>
        <div className="grid grid-cols-4 h-72 overflow-y-auto overflow-x-clip">
          {targets.map((t, ix) => (
            <div
              onClick={() => {
                setTarget(ix)
              }}
              className={"w-16 h-16 m-1 p-3 rounded-md hover:bg-slate-100 " + (target === ix ? "bg-slate-100" : "bg-slate-300")}
              key={ix}
            >
              <img alt="" className="w-10 h-10" src={`${IMG_DIR}/${t}`} />
            </div>
          ))}
        </div>
        <div className="">
          Rows ({rows})<br />
          <input
            type="range"
            className="w-full"
            value={rows}
            onChange={(e) => {
              setRows(parseInt(e.target.value))
            }}
            min={1}
            max={16}
          />
          <br />
          Columns ({cols})<br />
          <input
            type="range"
            className="w-full"
            value={cols}
            onChange={(e) => {
              setCols(parseInt(e.target.value))
            }}
            min={1}
            max={10}
          />
          <br />
          Size ({size}")
          <br />
          <input
            type="range"
            className="w-full"
            value={size}
            onChange={(e) => {
              setSize(parseFloat(e.target.value))
            }}
            min={0.1}
            max={5}
            step={0.1}
          />
          <br />
          <input
            type="checkbox"
            checked={gridOn}
            onChange={(e) => {
              setGridOn(e.target.checked)
            }}
          />
          &nbsp;Grid
          <br />
          <hr />
          <button className="m-4 p-2 rounded-2xl bg-sky-800 text-white shadow-xl float-right" onClick={createPdf}>
            Download
          </button>
        </div>
      </div>

      <div className="pageWrapper inline-block  py-6 text-center bg-slate-200 overflow-auto">
        <div id="mypage" className={`myPage relative bg-white my-0 mx-auto`}>
          {gridOn && (
            <div className="absolute top-0 right-0 bottom-0 left-0 z-0 opacity-30">
              <img className="w-full h-full" alt="" src="${IMG_DIR}/inch.png" />
            </div>
          )}
          <div className="pageTitle z-1 absolute text-3xl font-bold bg-white p-2">
            {title}
          </div>
          {range(cols, rows).map(({ x, y }, i) => {
            return (
              <div style={grid(rows, cols, x, y, size)} className="absolute z-1" key={y + ":" + x}>
                <img alt="" className="opacity-90 w-full h-full" src={`${IMG_DIR}/${targets[target]}`} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
