<template>
  <div id="paint">
    <canvas ref="myCanvas"
      @mousemove="doPaint"
      @mousedown="doMouseDown"
      @mouseup="stopPaint"
      @mouseenter="stopPaint">
    </canvas>
  </div>
</template>

<script>
export default {
  data: () => ({
      isPaint: false,
      canvas: null,
      ctx: null
  }),
  methods: {
    doMouseDown(e) {
      this.ctx.moveTo(e.pageX, e.pageY);
      this.ctx.beginPath();
      this.isPaint = true;
    },
    doPaint(e) {
      if(this.isPaint) {
        this.ctx.lineTo(e.pageX, e.pageY);
        this.ctx.stroke();
      }
    },
    stopPaint(e) {
      this.isPaint = false;
    }
  },
  mounted() {
    this.canvas          = this.$refs.myCanvas;
    this.canvas.width    = window.innerWidth;
    this.canvas.height   = window.innerHeight - 4;

    this.ctx             = this.canvas.getContext('2d');
    this.ctx.lineWidth   = 3;
    this.ctx.lineJoin    = 'round';
    this.ctx.lineCap     = 'round';
    this.ctx.strokeStyle = '#000';
  }
}
</script>


<style>
html, body, div {
  margin: 0;
  padding: 0;
}
canvas {
  background-color: yellow;
  cursor: cell;
}
</style>