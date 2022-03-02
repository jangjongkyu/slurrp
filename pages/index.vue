<template>
  <div></div>
</template>

<script>
export default {
  middleware: [
    ({ route, redirect }) => {
      if (route.path === "/") {
        return redirect("/main");
      }
    }
  ],
};
</script>