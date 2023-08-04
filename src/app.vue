<template>
  <div class="App" id="TamAppScriptDialog">
    <div class="dialogWrapBtn" @click="clickdialog" v-show="dialogWrap == false"><svg xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-align-box-right-middle-filled" width="24" height="24" viewBox="0 0 24 24"
        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-.333 12h-2l-.117 .007a1 1 0 0 0 0 1.986l.117 .007h2l.117 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm0 -3h-6l-.117 .007a1 1 0 0 0 0 1.986l.117 .007h6l.117 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm0 -3h-4l-.117 .007a1 1 0 0 0 0 1.986l.117 .007h4l.117 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
          stroke-width="0" fill="currentColor"></path>
      </svg></div>

    <transition name="slide-fade">
      <div v-show="dialogWrap" class="dialogWrap">
        <div class="dialogWrap_header">
          <div class="dialogWrap_close" @click="close">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </div>
        </div>
        <div class="dialogWrap_body">
          <div contenteditable class="dialogWrap_textarea"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import "./app.less";
export default {
  data: function () {
    return {
      dialogWrap: false,
    };
  },
  methods: {
    clickdialog() {
      this.dialogWrap = true;
      setTimeout(() => {
        $('.dialogWrap_textarea').focus();
      }, 100);
    },
    close() {
      this.dialogWrap = !this.dialogWrap;
    },
    saveTextarea() {
      const textarea = document.getElementsByClassName('dialogWrap_textarea')[0].innerHTML;
      localStorage.setItem("dialogWrap_textarea", textarea);
    }
  },
  mounted() {
    const textarea = localStorage.getItem("dialogWrap_textarea");
    if (textarea) {
      document.getElementsByClassName('dialogWrap_textarea')[0].innerHTML = textarea;
    } else {
      this.saveTextarea();
    }
    setInterval(() => {
      this.saveTextarea();
    }, 1000);
  }
};
</script>
