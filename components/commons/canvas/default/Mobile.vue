<template>
    <div>
        <!--div><span>[SEQ: {{seq}}] | [Desktop] position : ( {{ position.x }} , {{ position.y }} )  |  lastPosition : ( {{ lastPosition.x }} , {{ lastPosition.y }} ) </span></div>
        <div><span>[drawEnable]: {{drawEnable}} | [windowPosition]: (left:{{canvasWindowPosition.left}} , top:{{canvasWindowPosition.top}} )</span></div-->
        <div>
          <canvas ref="canvas" id="canvas" width="1000px" height="1000px" style="background: #fafafa;"
            @touchstart="activateCanvas()"
            @touchend="deactivateCanvas()"
            @touchcancel="deactivateCanvas()"
            @touchmove="getCurrentPosition($event)"
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
        },
        scrollLeft: {
          type: Number,
        },
        rowIndex: {
          type: Number,
        },
        colIndex: {
          type: Number,
        },
    },
    data() {
      return {
        //drawEnable: true,
        ctx: {},
        color: "black",
        position: {
          x : 0,
          y : 0
        },
        lastPosition: {
          x : 0,
          y : 0
        },
        canvasWindowPosition: {
          top: 0,
          left: 0,
        },
      }
    },

    mounted(){
      //$("body").bind('touchmove', function(e){e.preventDefault()});
      //document.getElementaddEventListener("touchmove", this.draw);
      //document.getElementsByTagName('body')
      //      .addEventListener("touchmove", function(e){e.preventDefault()});
      const canvas = this.$refs.canvas;
      this.canvasWindowPosition.top = canvas.getBoundingClientRect().top;
      this.canvasWindowPosition.left = canvas.getBoundingClientRect().left;
      //console.log("mountde top : ", canvas.getBoundingClientRect().top);
      //console.log("mountde top : ", canvas.getBoundingClientRect().left);
      //console.log("mounted Canvas: ", JSON.stringify(canvas));
      const ctx = canvas.getContext('2d');
      this.ctx = ctx;
    },

    methods :{

      activateCanvas(){
        console.log("touchstart seq : " + this.seq );
        document.removeEventListener("touchmove", this.draw);
        document.addEventListener("touchmove", this.draw);
      },

      deactivateCanvas(){
        document.removeEventListener("touchmove", this.draw);
        this.lastDrawX = null;
        this.lastDrawY = null;
      },

      getCurrentPosition(event){
        var scrollLeft = this.scrollLeft;
        //console.log("scrollX : " + scrollX);
        var newx = event.touches[0].pageX - this.canvasWindowPosition.left + scrollLeft; 
        var newy = event.touches[0].pageY - this.canvasWindowPosition.top;
        this.currentX = newx;
        this.currentY = newy;
      },

      draw() {
        if(this.drawEnable){

          if(this.currentX < 0){
            this.changeTouchEvent("W");
          } else if(this.currentX > 1000){
            this.changeTouchEvent("E");
          } else if(this.currentY < 0){
            this.changeTouchEvent("N");
          } else if(this.currentY > 1000){
            this.changeTouchEvent("S");
          }

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

      //타canvas에서 touch이벤트를 전파받을 function
      triggerTouchEvent(){
        //alert(this.$refs.canvas.$el); //.touchstart();
        //console.log(this.$refs.canvas);
        //this.activateCanvas();

        var event = new MouseEvent('touchstart', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        
        this.$refs.canvas.dispatchEvent(event);
        //alert("touchTrigger! [SEQ] : " + this.seq);
      },

      //타canvas로 touch Event를 전파할때 호출
      changeTouchEvent(azimuthCode){
        var targetRowIndex = null;
        var targetColIndex = null;
        switch(azimuthCode){
          case "E": //동 
            targetRowIndex = 0;
            targetColIndex = this.colIndex + 1;
            break;
          case "W": //서
            targetRowIndex = 0;
            targetColIndex = this.colIndex - 1;
            break;
          case "S": //남
            targetRowIndex = this.rowIndex + 1;
            targetColIndex = 0;
            break;
          case "N": //북
            targetRowIndex = this.rowIndex - 1;
            targetColIndex = 0;
            break;
          default :
        }
        let isSuccess = this.$parent.changeDrowingCanvas(targetRowIndex, targetColIndex);
        if(isSuccess){
          this.deactivateCanvas();
        }
      },

    },

    destroyed(){
      document.removeEventListener("mousemove", this.draw);
    },

  };
</script>
