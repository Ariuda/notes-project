<template>
  <div class="register column center">
      <form class="column center" @submit.prevent="register(details)">
          <div class="column">
              <label for="name">User name:</label>
              <input type="name" name="text" v-model="details.name">
          </div>
          <div class="column">
              <label for="email">Email:</label>
              <input type="email" name="email" v-model="details.email">
          </div>
          <div class="column">
              <label for="password">Password:</label>
              <input type="password" name="password" v-model="details.password">
          </div>
          <p v-if="feedback" class="warning">{{ feedback }}</p>
          <button>Submit</button>
      </form>
      <p>If you already have an account, please sign in</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'register',
    data() {
      return {
          details: {
            name: null,
            email: null,
            password: null
          },
          feedback: null
      }
    },
    computed: {
      ...mapGetters({
        signedIn: 'signedIn'
      //  'saleProducts',
      })
    },
    methods: {
      ...mapActions([
        'register'
      ]),  
    },
    watch: {
      signedIn: {
        handler(value) {
          if (value === 1) {
            this.$router.push({name: 'Home'})
          } else if (value === -1) {
            this.feedback = 'You must fill both fields'
          } else if (value === -2) {
            this.feedback = 'This combination doesnt exist'
          }
        }
      }
    },
    
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.register {
  margin-top: 30px;
  form {
    width: 100%;
    div {
      width: 50%;
      margin: 20px auto;
      input {
        margin: 10px auto;
        width: 100%;
        padding: 20px;
        border: none;
        border-bottom: 2px solid #B100FF;
        outline: none;
        font-size: 1.1em;
      }
    }
    .warning {
      margin: 0px auto 20px auto;
      color: #79052c;
    }
  }
  button {
    padding: 10px 20px;
    border-radius: 15px;
    font-size: 1.2em;
    background: #5800FF;
    color: white;
    border: none;
    outline: none;
  }
  p {
    margin-top: 40px;
    font-size: .9em;
  }
}

</style>
