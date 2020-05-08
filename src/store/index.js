import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    categories: [
      {name: 'work', tasks: [
        {title: 'Meeting', comments: 'prepare notes', deadline: '2020-05-31T09:00', created: '02-05-2020, 17:00', complete: false},
        {title: 'Project', comments: 'prepare schedule', deadline: '2020-05-31T09:00', created: '01-05-2020, 17:00', complete: false},
      ]},
      {name: 'exercise', tasks: [
        {title: 'Yoga class', comments: 'take mat', deadline: '2020-05-31T09:00', created: '02-05-2020, 17:00', complete: false},
        {title: 'Pilates class', comments: '', deadline: '2020-05-31T09:00', created: '01-05-2020, 17:00', complete: false},
      ]},
      
    ],
    selectedCategory: null,
    selectedTask: null,
    data: [],
    signedIn: null
  },
  getters: {
    selectedTask: state => state.selectedTask,
    signedIn: state => state.signedIn
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
            completed: payload.completed
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
      loadData: (state, data) => {
        state.data = data;
        console.log('server :)');
      },
      signIn: (state, result) => {
        state.signedIn = result
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
      context.commit('addTask', payload)
    },
    editTask: (context, payload) => {
      context.commit('editTask', payload)
    },
    deleteTask: (context, payload) => {
      context.commit('deleteTask', payload)
    },
    saveFolder: (context, payload) => {
      context.commit('saveFolder', payload)
    },
    completed: (context, payload) => {
      context.commit('completed', payload)
    },
    loadData: (context) => {
      fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => {
        context.commit('loadData', data)
      }).catch(err => {
        console.log(err);
      })
    },
    signIn: (context, payload) => {
      if (payload.email && payload.password) {
        fetch('http://localhost:3000/signin', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: payload.email,
            password: payload.password
          })
        })
        .then((response) => response.json())
        .then(data => {
          if(data === 'success') {
            context.commit('signIn', 1)
          } else {
            context.commit('signIn', -2)
          }
        }) 
      } else {
        context.commit('signIn', -1)
      }
    },
    register: (context, payload) => {
      if (payload.name && payload.email && payload.password) {
        fetch('http://localhost:3000/register', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            password: payload.password
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          context.commit('signIn', 1)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  },
  modules: {
  }
})
