<template>
  <div class="edit-task column center">
      <form class="column center" @submit.prevent="editTask(update)">
          <div class="column">
              <label for="title">Title:</label>
              <input type="text" name="title" v-model="update.title">
          </div>
          <div class="column">
              <label for="comments">Comments:</label>
              <input type="text" name="comments" v-model="update.comments">
          </div>
          <div class="column">
              <label for="deadline">Deadline:</label>
              <input type="datetime-local" name="deadline" v-model="update.deadline">
          </div>
          <button>Save</button>
      </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'edit-task',
    data() {
      return {
        update: {
          title: null,
          comments: null,
          deadline: null,

        }

      }
    },
    computed: {
      ...mapGetters([
        'selectedTask'
      ])
    },
    methods: {
      ...mapActions([
        //'editTask'
      ]),
      editTask(update) {
        this.$router.replace({ query: { q1: update.taskID } })
        this.$store.dispatch('editTask', update)
        console.log(update);
      }
    },
    created() {
      this.update = {
        title: this.selectedTask.title,
        comments: this.selectedTask.comments,
        deadline: this.selectedTask.deadline,
        taskID: this.selectedTask.taskID
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.edit-task {
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
