<template>
  <div>
    <div id="print-frame" class="hidden">
      <div style="font-family: 'monospace';">
        <div style="text-align: center;">
          <h4 style="margin-bottom: 5px;">ARCAMET</h4>
          <div style="margin-bottom: 7px;">Direccion...</div>
          <div style="margin-bottom: 2px;">R.U.C. N° ... </div>
          <strong style="display: block; margin-bottom: 5px; text-transform: uppercase;">Ticket {{ ticket.document_number | fillZerosLeft }}</strong>
        </div>
        <div style="margin-top: 25px;">
          <div v-if="ticket.issue_date" style="font-size: 14px; margin-top: 4px;">
            <span>Fecha de emisión: {{ ticket.issue_date | moment("DD/MM/YYYY") }}</span>
            <span style="float: right;">{{ ticket.issue_date | moment("HH:mm") }}</span>
          </div>
        </div>
        <div style="border-top: 1px solid #000000; font-size: 15px; padding-top: 10px; margin-bottom: 15px;">
          <div>
            Cliente:  <span v-if="ticket.client">{{ ticket.client.name }}</span>
          </div>
          <div>
            DNI/RUC: <span v-if="ticket.client">{{ ticket.client.document_number }}</span>
          </div>
        </div>
        <table role="grid" style="border-collapse: collapse; width: 100%;">
          <thead>
            <hr style="margin-bottom: 0; border-top: 1px solid #000000;">

            <tr role="row" style="font-size: 13px;">
              <th role="columnheader" style="text-align: left">DESCRIPCIÓN</th>
              <th role="columnheader"></th>
              <th role="columnheader"></th>
              <th role="columnheader" style="text-align: right;">TOTAL</th>
            </tr>

          </thead>

          <tbody style="border-bottom: 1px solid #000000; border-top: 1px solid #000000;">
            <tr v-for="(item, index) in ticket.items" :key="index">
              <td>{{ item.description }}</td>
              <td>{{ item.quantity }} Un</td>
              <td style="text-align: right;"> x {{ item.unit_price | currency('') }}</td>
              <td style="text-align: right;">{{ item.unit_price * item.quantity | currency('') }}</td>
            </tr>

            <tr v-if="ticket.items && ticket.items.length < 1">
              <td colspan="4">No hay items agregados.</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-bottom: 2px;">
          <strong>
            <span>TOTAL</span><span style="float: right;">S/ {{ ticket.total | currency('') }}</span>
          </strong>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      ticket: {}
    }
  },

  methods: {
    open(ticket) {
      this.ticket = ticket
      this.$nextTick(() => {
        this.print()
      })
    },

    resetData() {
      Object.assign(this.$data, this.$options.data())
    },

    print() {
      let contentId = 'print-frame'
      let contents = document.getElementById(contentId).innerHTML
      let frame1 = document.createElement('iframe')
      frame1.name = 'frame1'
      frame1.style.position = 'absolute'
      frame1.style.top = '-1000000px'
      frame1.style.left = '0px'
      frame1.style.width = '300px'
      document.body.appendChild(frame1)
      let frameDoc = frame1.contentWindow
      ? frame1.contentWindow
      : frame1.contentDocument.document
      ? frame1.contentDocument.document
      : frame1.contentDocument
      frameDoc.document.open()
      frameDoc.document.write('<html><head><title></title>')
      frameDoc.document.write(this.getStyles())
      frameDoc.document.write('</head><body>')
      frameDoc.document.write(contents)
      frameDoc.document.write('</body></html>')
      frameDoc.document.close()
      window.frames['frame1'].focus()
      window.frames['frame1'].print()
      document.body.removeChild(frame1)
      this.resetData()
      this.$emit('close')
    },

    getStyles() {
      return `
        <style>
        @media print {
          @page {
              size: 3.5in 9.5in;
              page-break-after: avoid;
              border: 1px solid red;
          }

          @page :left {
            margin-left: 5mm;
            margin-right: 5mm;
          }

          @page :right {
            margin-left: 5mm;
            margin-right: 5mm;
          }
        }
        </style>
      `
    }
  }
}
</script>

<style lang="css">
.hidden {
  display: none;
}
</style>