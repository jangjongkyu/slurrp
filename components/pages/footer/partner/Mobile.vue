<template>
  <section>
    <form @submit.prevent="onSubmit()" novalidate>
      <div class="box mar_set">
        <ul>
          <li>
            <div class="input_common">
              <label class="tit">업체명</label>
              <!--<input placeholder="한·영문 100자 이내" type="text" />-->
              <input placeholder="한,영문 100자 이내" type="text" v-model="form.ttl" required />
            </div>
          </li>
          <li>
            <div class="input_common">
              <label class="tit">담당자명</label>
              <input placeholder="한,영문 100자 이내" type="text" v-model="form.usrDfn1Val" required />
            </div>
          </li>
          <li>
            <div class="input_common">
              <label class="tit">연락처</label>
              <input placeholder="숫자만 입력 하세요" type="text" v-model="form.usrDfn2Val" required @input="checkNumberInput()" />
            </div>
          </li>
          <li>
            <div class="input_common">
              <label class="tit">E-mail</label>
              <input placeholder="담당자 이메일 주소를 정확히 입력 바랍니다." type="text" v-model="form.usrDfn3Val" required />
            </div>
          </li>
          <li>
            <div class="input_common mgt20">
              <label class="tit">문의내용</label>
              <textarea
                cols="20"
                rows="8"
                maxlength="1000"
                placeholder="한,영문 1,000자 이내 내용을 입력해 주세요."
                class="textarea_common mgt10"
                v-model="form.content"
                required
              ></textarea>
              <div class="txt_count"><span>{{ form.content ? form.content.length : 0 }}</span>/1000</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="box mar_set">
        <h4 class="title_3rd">개인정보 수집 이용에 대한 동의</h4>
        <div class="txt_s">
          개인정보 수집 이용에 대한 동의를 하셔야 제휴문의가 가능합니다.
        </div>
        <label class="checkbox_square_wrap mgt10">
          <input type="checkbox" v-model="form.infoCd" />
          <i class="check_icon"></i>
          동의합니다.
        </label>
        <div class="txt_box_gray partner">
          <pre>
            개인정보처리방침 내용
          </pre>
        </div>
      </div>
      <div class="bt_last">
        <button type="button" class="bt_white" @click.stop="submitCancel()">취소</button>
        <button type="submit" class="bt_black">확인</button>
      </div>
    </form>
  </section>
</template>

<script>
import Desktop from '@/components/pages/footer/partner/Desktop';
import NumberInput from '@/components/commons/input/NumberInput';

export default {
  components: {NumberInput},
  extends: Desktop
};
</script>
