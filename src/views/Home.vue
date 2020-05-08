<template>
  <div class="home">
    <div class="welcome row between" :class="{slim : active}">
      <h1>Welcome <br> back</h1>
      <div class="current-date column center">
        <h2>Thursday</h2>
        <p>7</p>
        <p>May 2020</p>
      </div>
    </div>
    <div class="row center tabs">
      <p @click="showActive('folders')">Folders</p>
      <p @click="showActive('calendar')">Calendar</p>
      <p @click="showActive('achievements')">Achievements</p>
    </div>
    <div :class="{ active: isActive === 'folders' }" class="tab-content">
      <Folders />
    </div>
    <div :class="{ active: isActive === 'calendar' }" class="tab-content">
      <p>Calendar</p>
    </div>
    <div :class="{ active: isActive === 'achievements' }" class="tab-content">
      <p>Achievements</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Folders from '@/components/Folders.vue'


export default {
  name: 'Home',
  components: {
    Folders,
  },
  data() {  
    return {
      active: null,
      isActive: null
    }

  },
  methods: {
    showActive(item) {
        this.active = item;
        setTimeout(() => {
          this.isActive = item;
        }, 500)
    }
  },
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
  } 100% {
    opacity: 1;
  }
};

.welcome {
  background: linear-gradient(to right, #B100FF, #5800FF);
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
  p {
    padding: 20px 40px;
    &:nth-child(2) {
      border-left: 1px solid purple;
      border-right: 1px solid purple;
    }
  }
}

.tab-content {
  display: none;
}

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