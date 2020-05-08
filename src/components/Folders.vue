<template>
  <div class="tasks-view">
    <section class="categories column center">
    <h1>Categories</h1>
    <div class="row">
      <ul class="row">
          <li v-for="(category, i) in categories" :key="i" @click="activeCategory(category)">
              <span>{{ category.name }}</span>
          </li>
      </ul>
      <div v-if="!createFolder" @click="createFolder = !createFolder" class="new-folder">Add</div>
      <div v-if="createFolder" class="row center new-folder">
        <label for="addFolder"></label>
        <input name="addFolder" placeholder="Your new folder name" class="new-folder-field" v-model="newFolder" v-on:keydown.enter="saveFolder(newFolder)">
        <div @click="createFolder = !createFolder">X</div> 
      </div>
    </div>
    </section>
    <section class="tasks" v-if="selectedCategory">
      <div class="add-btn" @click="addNewTask = !addNewTask, show = !show">Add new note</div>
      <ul class="row center">
        <li v-for="(task, i) in selectedCategory.tasks" :key="i" class="column center between task">
          <div class="column center">
            <span>{{ task.title }}</span>
            <span class="small-text">Created on {{ task.created }}</span>
          </div>
          <span>{{ task.comments }}</span>
          <div class="row between">
            <span class="small-text">Due on {{ task.deadline }}</span>
            <input type="checkbox" @click="completed(task)">
          </div>
          <div class="row between task-btns">
            <span @click="updateTask = !updateTask, show = !show, activeTask(task)">Edit</span>
            <span @click="deleteTask(task)">Delete</span>
          </div>

        </li>
      </ul>
    </section>
    <section v-if="addNewTask || updateTask">
      <div class="white-background" v-if="show" @click="closeForm"></div>
      <div v-if="addNewTask">
        <AddTask />
      </div>
      <div v-if="updateTask">
        <EditTask />
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddTask from '@/components/AddTask'
import EditTask from '@/components/EditTask'

export default {
  name: 'folders',
  components: {
    AddTask,
    EditTask
  },
    data() {
      return {
        addNewTask: null,
        updateTask: null,
        show: null,
        createFolder: null,
        newFolder: null

      }
    },
    computed: {
      categories() {
       return this.$store.state.categories
      },
      selectedCategory() {
        return this.$store.state.selectedCategory
      },
      

      ...mapGetters([
 
      ])
    },
    methods: {
      ...mapActions([
        'completed',
        'activeCategory',
        'activeTask',
        'deleteTask',
        'saveFolder'
        
      ]),
      closeForm() {
        this.show = null
        this.addNewTask = null
        this.updateTask = null
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$first-option: #FF9300;
$second-option: #4E0091;
$third-option: #15A584;
$fourth-option: #C10077;

$colorTheme: #FF9300, #4E0091, #15A584, #C10077;
$colorThemeLenght: length($colorTheme);

.categories {
    width: 90%;
    margin: 0 auto;
    background: #ffffffad;
    border: none;
    border-radius: 10px;
    padding: 15px;
  h1 {
    margin: 0px auto 10px auto;
  }  
  ul {
    margin: 0px;
    li {
      margin-right: 20px;
      list-style: none;
      padding: 20px 30px;
      width: 90px;
      text-align: center;
      border-radius: 10px;
      text-transform: capitalize;
      color: #ffffff;
      &.add-new-category {
        color: grey;
      }
    }
  }
  .new-folder {
    width: 90px;
    padding: 20px 40px;
    border-radius: 10px;
    border: 1px solid rgb(119, 119, 119);
    text-align: center;
  }
}


@for $i from 1 through $colorThemeLenght {
  ul li:nth-child(#{$colorThemeLenght}n + #{$i}):not(.add-new-category) {
      background: nth($colorTheme, $i)
  }
}

.tasks {
  ul {
    li {
      list-style: none;
      width: 250px;
      height: 200px;
      border: 1px solid rgb(204, 204, 204);
      margin: 10px;
      padding: 15px;
      border: 1px solid grey;
      border-radius: 10px;
      background: none !important;
      & div:first-of-type {
        font-size: 1.2em;
      }
      .task-btns {
        span {
          margin: 0px 20px;
        }
      }
    }
  }
}

.white-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #a0a0a0;
  opacity: .7;
}



</style>
