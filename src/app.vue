<template>
  <div class="App">
    <button @click="demo">click</button>
  </div>
</template>
<script>
import "./app.less";
export default {
  data: function () {
    return {
     
    };
  },
  methods: {
    demo() {
      document.getElementsByTagName('body')[0].remove();
    },
  },
};
</script>
<style scoped></style>
