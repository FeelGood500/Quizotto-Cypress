<template>
    <div>
    <button @click="reloadPage">Reset</button>
    </div>
  </template>
  
  
  <script>
  export default {

    methods: {
      reloadPage() {
        window.location.reload();
      }
    }
  }
  </script>