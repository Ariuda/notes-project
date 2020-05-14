<template>
  <div class="tasks-view">
    <router-link :to="{ name: 'Home' }" class="go-back-btn">&lsaquo; go back</router-link>
    <section class="categories column center">
   <h1>Categories</h1>
    <div class="row">
      <ul class="row">
          <li v-for="(category, i) in categories" :key="i" @click="activeCategory(category, $event)">
              <span>{{ category.folder }}</span>
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
    <section v-if="categories.length === 0">
      <p>It looks empty in here, you can create your first folder by clicking the Add button above</p>
    </section>
    <section class="tasks" v-if="selectedCategory">
      <div class="add-btn row end">
        <span @click="addNewTask = !addNewTask, show = !show">New note</span>
      </div>
      <ul class="row center">
        <li v-for="(task, i) in selectedCategory.tasks" :key="i" class="column center between task">
          <div class="column center" :style="cssColor">
            <span class="note-title">{{ task.title }}</span>
            <span class="small-text">Created on {{ task.created }}</span>
          </div>
          <span>{{ task.comments }}</span>
          <div class="column center">
            <span class="small-text">Due on {{ task.deadline }}</span>
            <div class="row center">
              <span class="small-text">Mark as completed</span>
              <input type="checkbox" @click="completed(task)">
            </div>
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
        newFolder: null,
        id: null,
        cssVars: null,


      }
    },
    computed: {
      categories() {
       return this.$store.state.categories
      },
      selectedCategory() {
        return this.$store.state.selectedCategory
      },
      cssColor() {
        return {
          'border-bottom': '2px solid ' + this.cssVars
        }
      },
      

      ...mapGetters([
 
      ])
    },
    methods: {
      ...mapActions([
        'completed',
        //'activeCategory',
        'activeTask',
        //'deleteTask',
        'saveFolder',

        
      ]),
      closeForm() {
        this.show = null
        this.addNewTask = null
        this.updateTask = null
      },
      deleteTask(task) {
          this.$router.replace({ query: { q1: task.taskID } })
          this.$store.dispatch('deleteTask' , task);
      },
      activeCategory(category, event) {
        let color = event.target;
        this.cssVars = getComputedStyle(color).backgroundColor;
        this.$store.dispatch('activeCategory' , category);
      }
    },
    created() {
      this.id = this.$route.params.id
      //let user = this.$store.state.activeUser.uid
      this.$store.dispatch('getTasks');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$colorTheme: #FF9300, #4E0091, #15A584, #C10077;
$colorThemeLenght: length($colorTheme);

.tasks-view {
  background: #f1f1f1;
  padding: 10px;
}

.categories {
    width: 90%;
    border: none;
    border-radius: 10px;
    padding: 15px;
  h1 {
      text-align: center;
      font-size: 1.7em;
      margin: 30px auto;
      text-transform: uppercase;
      color: #464646;
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
    background: white;
    text-align: center;
  }
}


@for $i from 1 through $colorThemeLenght {
  ul li:nth-child(#{$colorThemeLenght}n + #{$i}):not(.add-new-category) {
      background: nth($colorTheme, $i)
  }
}

.tasks {
  .add-btn{
    span {
      margin-right: 10px;
      padding: 10px 20px;
      border: 1px solid #5800FF;
      color: #5800FF;
      border-radius: 15px;
    }
  }
  ul {
    flex-wrap: wrap;
    li {
      list-style: none;
      width: 250px;
      height: 200px;
      margin: 10px;
      padding: 35px;
      border-radius: 10px;
      background: white !important;
      box-shadow: 5px 5px 6px 0px #e0e0e0; 
      div {
        width: 100%;
        &:first-of-type {
          padding-bottom: 5px;
        }
      }  
      .note-title {
        font-size: 1.2em;
        text-transform: capitalize;
      }    
      .small-text {
        font-size: .8em;
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
