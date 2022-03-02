export default {

  mounted() {
    if(typeof window != 'undefined' && this.onMaxScrollCallback && !this.initScrollEvent) {
      window.addEventListener("scroll", this.onMaxScrollListener, { passive: true });
      this.initScrollEvent = true;
    }
  },

  activated () {
    //keep-alive _ component 활성화시 호출되는lifecycle
    if(this.savedScrollY && typeof window != 'undefined') {
      window.scrollTo(0, this.savedScrollY);
    }

    if(typeof window != 'undefined' && this.onMaxScrollCallback && !this.initScrollEvent) {
      window.addEventListener("scroll", this.onMaxScrollListener, { passive: true });
      this.initScrollEvent = true;
    }
  },

  deactivated () {
    //keep-alive _ component 비활성화시 호출되는lifecycle
    
    if(typeof window != 'undefined'){
      this.savedScrollY = window.scrollY;
    }

    if(typeof window != 'undefined' && this.onMaxScrollCallback) {
      window.removeEventListener("scroll", this.onMaxScrollListener);
      this.initScrollEvent = false;
    }
  },

  methods: {
    initOnMaxScrollCallback : function(onMaxScrollCallback) {
      // 스크롤이 제일 아래로 내려갔을때 작동할 callback함수
      // 필요시 본mixin객체를 사용할 page의 created함수에서 init해줄것
      this.onMaxScrollCallback = onMaxScrollCallback;
    },

    onMaxScrollListener() {
      let cp = document.body.clientHeight - window.innerHeight - window.scrollY;
      if (cp < 100) {
        this.onMaxScrollCallback();
      }
    },
    
  },

};
