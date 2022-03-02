<template>
  <section>
    <!-- 타이틀 -->
    <div class="box">
      <div class="mar_set">
        <h4 class="title_1st">개인정보처리방침</h4>
        <div class="foot_line_title">
          <div class="fl mgt20">공고일자 : {{ selectedPolicy.sysRegDtm | dateFormat}} 시행일자 {{ selectedPolicy.sysRegDtm | dateFormat}}</div>
          <div class="fr">
            <div class="fl mgt20">이전 개인정보처리방침 보기</div>
            <select required class="input_common bd_1 w300 mgl15" v-model="selectedPolicy">
              <option v-for="policy in policies" :value="policy">
                v{{ policy.versionInfo }} (개정일자 : {{ policy.sysRegDtm | dateFormat}})
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!--// 타이틀 -->


    <div class="box">
      <div class="mar_set">
        <!-- 콘텐츠박스 -->
        <div class="terms_con" v-html-custom="selectedPolicy.content">

        </div>
        <!-- //콘텐츠박스 -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async fetch() {
    this.policies = await this.$axios.$get('/api/policy/privacy');
    this.selectedPolicy = this.policies[0];
  },

  data() {
    return {
      policies: [],
      selectedPolicy: {},
    }
  },
};
</script>
