import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

export function createPdf() {
  html2canvas(document.querySelector("#mypage")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png")
    // const pdf = new jsPDF({orientation: 'p', unit: "mm", format: [216, 279]})
    const pdf = new jsPDF("p", "mm", [216, 279])
    pdf.addImage(imgData, "PNG", 0, 0, 216, 279)
    pdf.save("targets.pdf")
  })
}

const paper = { h: 11, w: 8.5 }
export const scrPaper = { w: 842.0, h: 1089.0 }

export function inch2px(inch) {
  return Math.round((scrPaper.w / paper.w) * inch)
}

export function range(w, h) {
  const ret = []
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      ret.push({ x, y })
    }
  }
  return ret
}

export function grid(rows, cols, x, y, size) {
  const sz = inch2px(size)
  const w = (scrPaper.w * 0.8) / cols
  const h = (scrPaper.h * 0.9) / rows
  const w0 = scrPaper.w * 0.1
  const h0 = scrPaper.h * 0.1
  return { left: Math.round(w0 + x * w + w / 2 - sz / 2) + "px", top: Math.round(h0 + y * h + h / 2 - sz / 2) + "px", width: sz + "px", height: sz + "px" }
}
