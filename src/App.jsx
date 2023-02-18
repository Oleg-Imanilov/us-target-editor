import { useState } from "react";
import { createPdf, inch2px, range, scrPaper } from "./utils";

const targets = [
  't01.png',
  't02.png',
  't03.png',
  't04.png',
  't05.png',
  't06.png',
  't07.png',
  't08.png',
  't09.png',
  't10.png', 
  't11.png',
  't12.png',
  't13.png',
  't14.png',
  't15.png',
  't16.png',
  't17.png',
  't18.png',
  't19.png',
  't20.png', 
  't21.png',
  't22.png',
  't23.png',
  't24.png',
  't25.png',
  't26.png',
  't27.png',
  't28.png',
  't29.png',
  't30.png', 
  't31.png',
  't32.png',
  't33.png',
  't34.png',
  't35.png',
  't36.png',
  't37.png',
  't38.png',
  't39.png',
  't40.png'
]

function grid(rows, cols, x, y, size) {
  const sz = inch2px(size)
  const w = (scrPaper.w*0.8)/(cols)
  const h = (scrPaper.h*0.9)/(rows)
  const w0 = scrPaper.w*0.1
  const h0 = scrPaper.h*0.1
  return {left:Math.round(w0+x*w+w/2-sz/2)+'px', top:Math.round(h0+y*h+h/2-sz/2)+'px', width:sz+'px', height:sz+'px'}
}

export default function App() {
  const [target, setTarget] = useState(6)
  const [cols, setCols] = useState(4)
  const [rows, setRows] = useState(6)
  const [size, setSize] = useState(1)
  const [title, setTitle] = useState('30 Yard, H&N Sniper Magnum .177 14.97gr')
  const [gridOn, setGridOn] = useState(true)

  return (
    <div className="">
      <div className="bg-slate-300 text-center text-5xl font-bold p-4 h-20">US Targets editor</div>
      <div className="inline-block align-top w-[350px] p-4  bg-slate-300 h-[calc(100vh-5rem)] text-xl">
        <span className="px-2">Title</span><br/>
        <input className="border border-slate-400 rounded-md p-1 w-full" type="text" value={title} onChange={(e)=>{ setTitle(e.target.value) }} />
        <br/>
        <span className="px-2">Shapes</span>
        <div className="grid grid-cols-4 h-72 overflow-y-auto overflow-x-clip">
          {targets.map((t, ix) => <div onClick={()=>{ setTarget(ix) }} className={"w-16 h-16 m-1 p-3 rounded-md hover:bg-slate-100 " + (target===ix?"bg-slate-100":"bg-slate-300")} key={ix}>
          <img alt="" className="w-10 h-10" src={`/img/${t}`} />
          </div>)}
        </div>
        <div className="">
            Rows ({rows})<br/>
            <input type="range" className="w-full" value={rows} onChange={(e)=>{setRows(parseInt(e.target.value))}} min={1} max={16} /><br/>
            Columns ({cols})<br/>
            <input type="range"  className="w-full" value={cols}  onChange={(e)=>{setCols(parseInt(e.target.value))}} min={1} max={10} /><br/>
            Size ({size}")<br/>
            <input type="range"  className="w-full" value={size}  onChange={(e)=>{setSize(parseFloat(e.target.value))}} min={0.1} max={5} step={0.1} /><br/>
            <input type="checkbox" checked={gridOn}  onChange={(e)=>{setGridOn(e.target.checked)}} />&nbsp;Grid<br/>
            <hr/>
            <button className="m-4 p-2 rounded-2xl bg-sky-800 text-white shadow-xl float-right" onClick={createPdf}>Download</button>
        </div>
      </div>

      <div className="inline-block w-[calc(100%-350px)] py-6 text-center bg-slate-200 h-[calc(100vh-5rem)] overflow-auto">
        <div id="mypage" className={`relative bg-white my-0 mx-auto w-[${scrPaper.w}px] h-[${scrPaper.h}px]`}>
            {gridOn && <div className="absolute top-0 right-0 bottom-0 left-0 z-0 opacity-30">
              <img className="w-full h-full" alt="" src="/img/inch.png"/>
            </div>}
            <div style={{ left: '50%', top: '30px', transform: 'translate(-50%, 0)'}} className="z-1 absolute text-3xl font-bold bg-white p-2">{title}</div>
            {range(cols, rows).map(({x,y}, i)=> { 
              return <div style={grid(rows, cols, x, y, size)} className="absolute z-1" key={y+':'+x}>
              <img alt="" className="opacity-90 w-full h-full" src={`/img/${targets[target]}`} />
              </div> 
            })}
        </div>
      </div>
    </div>
  );
}
