export default {
    state: {
        signedIn: null,
        activeUser: {
          name: null,
          uid: null
        }
    },
    getters: {
        signedIn: state => state.signedIn,
        activeUser: state => state.activeUser
    },
    mutations: {
        signIn: (state, result) => {
            state.signedIn = result
          },
          getUserData: (state, payload) => {
            state.activeUser.name = payload.user
            state.activeUser.uid = payload.uid
          },
    },
    actions: {
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
                if(data.message === 'success') {
                  context.commit('signIn', 1)
                  context.commit('getUserData', data)
                } else {
                  context.commit('signIn', -2)
                }
              }) 
              .catch(err => {
                  console.log(err);
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
                if (data.message === 'success') {
                  let user = {
                    user: data.user.name,
                    uid: data.user.id
                  }
                  context.commit('signIn', 1)
                  context.commit('getUserData', user)
                }

              })
              .catch(err => {
                console.log(err)
              })
            }
          },

    }
}