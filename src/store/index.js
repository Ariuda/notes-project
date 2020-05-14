import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    categories: [],
    selectedCategory: null,
    selectedTask: null,
    data: [],
  },
  getters: {
    categories: state => state.categories,
    selectedTask: state => state.selectedTask,
  },
  mutations: {
    activeCategory: (state, payload) => {
      state.selectedCategory = payload
    },
    activeTask: (state, payload) => {
      state.selectedTask = payload
    },
    addTask: (state, payload) => {
      state.categories.forEach(category => {
        if (category.name === state.selectedCategory.name) {
          category.tasks.push({
            title: payload.title,
            comments: payload.comments,
            deadline: payload.deadline,
            created: payload.created,
            completed: payload.completed,
            taskID: payload.taskID
          })
        }
      })
    },
    editTask: (state, payload) => {
      state.categories.forEach(category => {
        if (category.name === state.selectedCategory.name) {
          category.tasks.forEach(task => {
            if (task.title === state.selectedTask.title) {
                task.title = payload.title
                task.comments = payload.comments
                task.deadline = payload.deadline
            }
          })
        }
      })
    },
    deleteTask: (state, payload) => {
      state.categories.forEach(category => {
        if (category.name === state.selectedCategory.name) {
          category.tasks.forEach((task, i) => {
            if(task.title === payload.title) {
              category.tasks.splice(i, 1)
            }
          })
        }
      })
    },
    completed: (state, payload) => {
        state.categories.forEach(category => {
          category.tasks.forEach(entry => {
            if(entry.title === payload.title) {
              payload.complete = !payload.complete;
            }
          })
        })
      },
      saveFolder: (state, data) => {
        state.categories.push({
          name: data,
          tasks: []
        })
      },
      getTasks: (state, payload) => {
        state.categories = payload
      }
  },
  actions: {
    activeCategory: (context, payload) => {
      context.commit('activeCategory', payload)
    },
    activeTask: (context, payload) => {
      context.commit('activeTask', payload)
    },
    addTask: (context, payload) => {

      let query = router.currentRoute.params.id
      let url = `http://localhost:3000/categories/${query}`
      fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          task: payload,
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'success') {
          payload.taskID = data.id
          console.log(payload);
          context.commit('addTask', payload)
        } else {
          console.log('something went wrong');
        }
        
      })
      .catch(err => {
        console.log(err);
      })

    },
    editTask: (context, payload) => {      

      let p = router.currentRoute.params.id;
      let q = router.currentRoute.query;
      let url = `http://localhost:3000/categories/${p}?q1=${q.q1}`

      fetch(url, {
        headers: {'Content-Type': 'application/json'},
        method: 'put',
        body: JSON.stringify({
          com: payload.comments,
          deadline: payload.deadline,
          title: payload.title
          })
        })
        .then(response => response.json())
        .then((data) => {
          if (data === 'success') {
            context.commit('editTask', payload)
          }
        })
        .catch(err => {
          console.log(err);
        })

    },
    deleteTask: (context, payload) => {

      let p = router.currentRoute.params.id;
      let q = router.currentRoute.query;
      let url = `http://localhost:3000/categories/${p}?q1=${q.q1}`

      fetch(url, {
        method: 'delete',
      })
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          context.commit('deleteTask', payload)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    saveFolder: (context, payload) => {
      context.commit('saveFolder', payload)
    },
    completed: (context, payload) => {
      context.commit('completed', payload)
    },
    getTasks: (context) => {
      let query = router.currentRoute.params.id
      let url = `http://localhost:3000/categories/${query}`
        fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.message === 'success') {
            context.commit('getTasks', data.result)
          } else {
            console.log('no tasks available');
          }
        }).catch(err => {
          console.log(err);
          
        })
    }
  },
  modules: {
    auth
  }
})
