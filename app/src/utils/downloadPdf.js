import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

export default async function downloadPdf(fileName, elementId) {
  await toPng(document.getElementById(elementId), { quality: 0.95 }).then(
    function (dataUrl) {
      const pdf = new jsPDF({
        format: 'letter',
        unit: 'in',
      })

      const margin = 0
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin

      const imgProps = pdf.getImageProperties(dataUrl)
      const imgWidth = pdfWidth
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width

      pdf.addImage(dataUrl, 'PNG', margin, margin, imgWidth, imgHeight)
      pdf.save(`${fileName}.pdf`)
    },
  )
}
