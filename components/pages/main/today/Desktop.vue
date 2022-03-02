<template>
  <section>
    <div class="box">
      <div class="mar_set">
        <!--[Table isDrawing] {{isDrawing}} -->
        <table
          @mousedown="drawActivate()"
          @mouseup="drawDeactivate()"
          style="cursor: url('/images/cursor/cursor_pen.cur') 0 32, pointer;"
        >
          <tr v-for="(row, rowIndex) in canvasArr" :key="`row_${rowIndex}`">
            <td v-for="(col, colIndex) in row" :key="`col_${colIndex}`">
              <component :is="component" :drawEnable="isDrawing" :seq="col.seq">
              </component>
            </td>
          </tr>

        </table>      

      </div>
    </div>
  </section>
</template>

<script>
  import defaultCanvas from "@/components/commons/canvas/default/Desktop";

  export default {
    components: {defaultCanvas},

    data() {
      return {
        isDrawing: false,
        component: "defaultCanvas",
        canvasArr: [
          [{"seq":"1"},{"seq":"2"},{"seq":"3"},{"seq":"4"}]
          ,[{"seq":"5"},{"seq":"6"},{"seq":"7"},{"seq":"8"}]
          ,[{"seq":"9"},{"seq":"10"},{"seq":"11"},{"seq":"12"}]
          ,[{"seq":"13"},{"seq":"14"},{"seq":"15"},{"seq":"16"}]
        ],
      }
    },

    methods: {
      drawActivate(){
        this.isDrawing = true;
      },

      drawDeactivate(){
        this.isDrawing = false;
      },
    }

  };

</script>