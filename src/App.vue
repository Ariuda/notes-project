<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home'}">Home</router-link>
      <router-link :to="{ name: 'Signin' }">Sign In</router-link>
      <router-link :to=" { name: 'Register' }">Register</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>


export default {
  components: {
   
  },
  data() {
    return {

    }
  },
}
</script>

<style lang="scss">

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #161616;
  /*background: linear-gradient(#6F7DFA, #fff);
  background: linear-gradient(#ffb341,#fff);*/
  height: 100vh;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: flex-end;
  background: linear-gradient(to right, #B100FF, #5800FF);
  a {
    font-weight: bold;
    color: #ffffff;
    margin-right: 20px;
    text-decoration: none;

  }
}

.row {
  display: flex;
  align-items: center;
  &.center {
    justify-content: center;
  }
  &.start {
    justify-content: flex-start;
  }
  &.between {
    justify-content: space-between;
  }
  &.end {
    justify-content: flex-end;
  }
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  &.center {
    align-items: center;
  }
  &.between {
    justify-content: space-between;
  }
}

.go-back-btn {
  margin: 10px;
}

</style>
