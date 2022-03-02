<template>
    <div>
        <!--span>[SEQ: {{seq}}] [Desktop] position : ( {{ position.x }} , {{ position.y }} )  _  lastPosition : ( {{ lastPosition.x }} , {{ lastPosition.y }} )  _  drawEnable: {{drawEnable}} </span-->
        <div>
          <canvas ref="canvas" id="canvas" width="1000px" height="1000px" style="background: #fafafa;"
            @mouseover="activateCanvas()"
            @mouseout="deactivateCanvas()"

            @mousedown="activateCanvas()"
            @mouseup="deactivateCanvas()"

            @mousemove="getCurrentPosition($event)"
          ></canvas>
        </div>
    </div>    
</template>

<script>

export default {
    props: {
        drawEnable: {
            type: Boolean,
            default: false,
        },
        seq: {
            type: String,
        }
    },
    data() {
      return {
        //drawEnable: true,
        ctx: {},
        color: "black",
        position : {
          x : 0,
          y : 0
        },
        lastPosition : {
          x : 0,
          y : 0
        }
      }
    },

    mounted(){
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      this.ctx = ctx;
    },

    methods :{

      activateCanvas(){
        document.removeEventListener("mousemove", this.draw);
        document.addEventListener("mousemove", this.draw);
      },

      deactivateCanvas(){
        document.removeEventListener("mousemove", this.draw);
        this.lastDrawX = null;
        this.lastDrawY = null;
      },

      getCurrentPosition(event){
        var newx = event.offsetX;
        var newy = event.offsetY;
        this.currentX = newx;
        this.currentY = newy;
      },

      draw() {
        if(this.drawEnable){
          if(this.lastDrawX == null || this.lastDrawY == null){
            this.lastDrawX = this.currentX;
            this.lastDrawY = this.currentY;
          }else{
            this.drawCore(this.lastDrawX, this.lastDrawY,this.currentX,this.currentY);
            this.lastDrawX = this.currentX;
            this.lastDrawY = this.currentY;
          }
        }
      },

      drawCore(x,y,nx,ny) {
        this.lastPosition.x = x;
        this.lastPosition.y = y;
        this.position.x = nx;
        this.position.y = ny;

        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(nx, ny);
        this.ctx.stroke();
      },

    },

    destroyed() {
        document.removeEventListener("mousemove", this.draw);
    }

  };
</script>
