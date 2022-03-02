<template>
  <section class="section">
    <div class="loader">
      <img src="~assets/images/spinner.gif"/>
    </div>
    <h1 class="text">
      연결 중 입니다...
    </h1>
  </section>
</template>

<style lang="scss" scoped>
.section {
  width: 100%;
  margin: auto;
  padding: 10rem 0;
  text-align: center;

  .text {
    color: #ababab;
    font-size: 1.2rem;
  }
}

@media (min-width: 600px) {
  .section {
    width: 600px;

    .text {
      font-size: 1.5rem;
    }
  }
}
</style>
