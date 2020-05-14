<template>
  <div class="home">
    <div class="welcome row between" :class="{slim : active}">
      <h1>Hello {{ userName.name }} </h1>
      <div class="current-date column center">
        <h2>{{ day }}</h2>
        <h2>{{ today }}</h2>
        <h3>{{ time }}</h3>
        
      </div>
    </div>
    <div class="row center tabs">
     <!-- <p @click="showActive('folders')" :class="{ selected : active === 'folders'}">Folders</p> 
          <p @click="showActive('calendar')" :class="{ selected : active === 'calendar'}">Calendar</p>
          <p @click="showActive('achievements')" :class="{ selected : active === 'achievements'}">Achievements</p>
     -->
      <router-link :to="{ name: 'Categories', params: { id: userName.uid }}">Categories</router-link>
      <router-link :to="{ name: 'Calendar', params: { id: userName.uid }}">Calendar</router-link>
      <router-link to="">Achievements</router-link>
      
    </div>
 <!--    <div v-if="!active">
      <p>Please select one option</p>
    </div>
   <div v-if="isActive === 'folders'">
      <Folders />
    </div>
    <div v-if="isActive === 'calendar'">
      <Calendar />
    </div>
    <div v-if="isActive === 'achievements'">
      <p>Achievements</p>
    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    //Folders: () => import('@/components/Folders.vue'),
    //Calendar
  },
  data() {  
    return {
      active: null,
      isActive: null,
      today: null,
      day: null,
      time: null
    }

  },
  computed: {
      userName() {
       return this.$store.getters.activeUser
      },
  },
  methods: {
    showActive(item) {
        this.active = item;
        this.isActive = null;
        setTimeout(() => {
          this.isActive = item;
        }, 500)
    },

  },
  created() {
    let date = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.today = date.toLocaleDateString()
    this.time = date.toLocaleTimeString()
    this.day = days[date.getDay()];
  }
}
</script>

<style lang="scss">

@mixin animation-mixin($name) {
  @-webkit-keyframes #{$name} {
      @content;
  }
  @-moz-keyframes #{$name} {
    @content;
  }

  @-ms-keyframes #{$name} {
    @content;
  }
    
  @keyframes #{$name} {
    @content;
  }
}

@include animation-mixin(decrease-height) {
  0% {
    height: 200px;
  } 100% {
    height: 40px;
  }
};

@include animation-mixin(fade-in) {
  0% {
    opacity: 0;
    padding: 60px 10px;
  } 100% {
    opacity: 1;
    padding: 80px 20px;
  }
};

.home {
  height: 90vh;
  background: linear-gradient(to right, #B100FF, #5800FF);
}

.welcome {
  
  color: white;
  padding: 20px 40px;
  height: 200px;
  h1 {
    font-size: 3em;
  }
  h2 {
    margin: 0px;
    font-size: 2em;
  }
  p {
    margin: 0px;
    font-size: 1.5em;
    &:first-of-type {
      font-size: 3em;
    }
  }
}

.tabs {
  background: linear-gradient(to right, #B100FF, #5800FF);
  a {
    width: 20%;
    padding: 80px 20px;
    text-align: center;
    background: #ffffffc2;
    margin: 10px;
    border-radius: 10px;
    text-decoration: none;
    font-size: 1.3em;
    color: #5800ff;
    animation: fade-in 1s;
  }

}

.selected {
  background: #ffffff;
  color: #000 !important;
}

/*

.tab-content {
  display: none;
}*/

.active {
  display: block;
  animation: fade-in 1s;
}

.slim {
  animation: decrease-height .25s ease-in;
  height: 40px;
  h1 {
    font-size: 2em;
  }
  div {
    flex-direction: row;
    h2 {
      font-size: 1em;
    }
    p {
      font-size: 1em;
    }
  }
}

</style>