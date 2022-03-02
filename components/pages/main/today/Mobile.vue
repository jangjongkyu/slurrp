<template>
  <section>
    <div ref="box" class="box" style="width: 100%; height: 100%; overflow: auto;">

      <div class="gotop_wrap">
        <button
          type="button"
          @click.stop="changeDrawingMode()"
        >
          [Mode]
        </button>
      </div>

      <div class="mar_set">
        <!--[Table isDrawing] {{isDrawing}} | [dowingMode]: {{dowingMode}} | [scrollX]: {{scrollLeft}}-->
        <table
          @touchstart="drawActivate()"
          @touchend="drawDeactivate()"
          @touchcancel="drawDeactivate()"
          :style="{'touch-action': dowingMode ? 'none' : ''}"
        >
          <tr v-for="(row, rowIndex) in canvasArr" :key="`row_${rowIndex}`">
            <td v-for="(col, colIndex) in row" :key="`col_${colIndex}`">
              <component :is="component" :ref="`canvas_${rowIndex}_${colIndex}`" :drawEnable="isDrawing" :seq="col.seq" :scrollLeft="scrollLeft" :rowIndex="rowIndex" :colIndex="colIndex">
              </component>
            </td>
          </tr>

        </table>
      </div>

    </div>
  </section>
</template>

<script>
import defaultCanvas from "@/components/commons/canvas/default/Mobile";

export default {
  components: {defaultCanvas},

    data() {
      return {
        isDrawing: false,
        component: "defaultCanvas",
        dowingMode: false,
        canvasArr: [
          [{"seq":"1"},{"seq":"2"},{"seq":"3"},{"seq":"4"}]
          ,[{"seq":"5"},{"seq":"6"},{"seq":"7"},{"seq":"8"}]
          ,[{"seq":"9"},{"seq":"10"},{"seq":"11"},{"seq":"12"}]
          ,[{"seq":"13"},{"seq":"14"},{"seq":"15"},{"seq":"16"}]
        ],
        scrollLeft: 0
      }
    },

    /*
    computed: {
      scrollX() {
        if(typeof this.$refs.box != 'undefined') {
          return this.$refs.box.scrollLeft;
        } else {
          return 0;
        }
      }
    },
    */

    mounted() {
      document.getElementsByTagName('body')[0]
            .addEventListener("touchmove", function(e){
              e.preventDefault();
            });
    },

    methods: {
      drawActivate(){
        if(this.dowingMode) {
          this.scrollLeft = this.$refs.box.scrollLeft;
          this.isDrawing = true;
        }
      },

      drawDeactivate(){
        this.isDrawing = false;
      },

      changeDrawingMode(){
        this.dowingMode = !this.dowingMode;
      },

      changeDrowingCanvas(rowIndex, colIndex){
        if(this.$refs[`canvas_${rowIndex}_${colIndex}`][0]) {
          this.$refs[`canvas_${rowIndex}_${colIndex}`][0].triggerTouchEvent();
          return true;
        } else {
          return false;
        }
      },
    }

};
</script>
