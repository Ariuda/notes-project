<template>
  <div class="new-task column center">
      <form class="column center" @submit.prevent="addTask(newTask)">
          <div class="column">
              <label for="title">Title:</label>
              <input type="text" name="title" v-model="newTask.title">
          </div>
          <div class="column">
              <label for="comments">Comments:</label>
              <input type="text" name="comments" v-model="newTask.comments">
          </div>
          <div class="column">
              <label for="deadline">Deadline:</label>
              <input type="datetime-local" name="deadline" v-model="newTask.deadline">
          </div>
          <button>Save</button>
      </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'add-task',
    data() {
      return {
        newTask: {
          title: null,
          comments: null,
          deadline: null,
          created: new Date().toLocaleString(),
          completed: false
        }
      }
    },
    computed: {
      categories() {
       return this.$store.state.categories
      },

      ...mapGetters([
      ])
    },
    methods: {
      ...mapActions([
        'addTask'
      ]),
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.new-task {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    background: white;
    height: 300px;
    border-radius: 10px;
    width: 60%;
    form {
      width: 100%;
        & div {
        margin: 10px 0px;
        width: 80%;
        & input {
          border: none;
          border-bottom: 1px solid purple;
          margin-top: 10px;
        }
      }
    }
}


</style>
