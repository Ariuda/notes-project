<template>
  <section class="calendar-view">
      <router-link :to="{ name: 'Home' }" class="go-back-btn">&lsaquo; go back</router-link>
      <h1>My Calendar</h1>
    <div class="month row between"><span @click="counter--, calcCalendar(counter)">&lsaquo;</span>{{ today.month }}<span @click="counter++, calcCalendar(counter)">&rsaquo;</span></div>
    <ul class="days row">
        <li v-for="(day, i) in daysOfWeek" :key="i">{{ day }}</li>
    </ul>
    <ul class="numbers row">
        <li v-for="(num,i) in today.monthDays" :key="i">
            {{ num.day}}
            <div v-for="(task, i) in num.tasks" :key="i" class="task-wrapper">
                <span>{{ task.title}}</span>
            </div>
        </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'calendar',
    data() {
      return {
          daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          daysOfMonth: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          today: {
              weekDay: null,
              day: null,
              month: null,
              monthDays: [],
              year: null
          },
          counter: 0,
          tasks: [],

      }
    },
    computed: {
      

      ...mapGetters({
          categories: 'categories'
      })
    },
    watch: {
      categories: {
        handler(val) {
            console.log(val);
        }
      }
    },
    methods: {
      calcCalendar(num) {

        let date = new Date();
        let month = date.getMonth() + num;
        let year = date.getFullYear();
        let maxDays = this.daysOfMonth[month];
        let dayOfWeek = new Date(year, month, 1).getDay();

        this.today.monthDays = [];
           for (let j = 0; j <= dayOfWeek; j++) {
               if (j < dayOfWeek) {
                   this.today.monthDays.push('');
               } else if (j === dayOfWeek || dayOfWeek === 0 && j === 0) {
                   for(let i = 1; i < maxDays + 1; i++) {
                       this.today.monthDays.push({
                           day: i,
                           tasks: []
                       });
                   }
               }
           }

            this.tasks.forEach(task => {
                task.tasks.forEach(t => {
                    let deadline = t.deadline;
                    let split = deadline.split('T');
                    let dateSplit = split[0].split('-');

                    for(let i = 0; i < this.today.monthDays.length; i++) {
                        if (this.today.monthDays[i].day === parseInt(dateSplit[2], 10) && month + 1 === parseInt(dateSplit[1], 10) && year === parseInt(dateSplit[0], 10)) {
                            this.today.monthDays[i].tasks.push(t);
                        }
                    }
                })
            })

           //console.log(this.today.monthDays);

        this.today.month = this.months[month];
      }
    },
    created() {

        this.tasks = this.categories;
        //console.log(this.tasks);
        this.calcCalendar(0);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$colorTheme: #FF9300, #4E0091, #15A584, #C10077;
$colorThemeLenght: length($colorTheme);

@for $i from 1 through $colorThemeLenght {
  .task-wrapper:nth-child(#{$colorThemeLenght}n + #{$i}) {
      background: nth($colorTheme, $i);
      border-radius: 10px;
      margin: 5px 0px;
      padding: 5px;
      color: #ffffff;
      font-size: .8em;
  }
}

.calendar-view {
    background: #80808017;
    h1 {
        text-align: center;
        font-size: 1.7em;
        margin: 30px auto;
        text-transform: uppercase;
        color: #464646;
    }
    .month {
        text-align: center;
        padding: 20px;
        margin: 10px;
        background: #5800FF;
        color: white;
        text-transform: uppercase;
        font-size: 1.4em;
        border-radius: 50px;
    }
    .days {
    width: 100%;
    padding-left: 0px;
        li {
            width: 15%;
            list-style: none;
            text-align: center;
        }
    }

    .numbers {
        width: 100%;
        flex-wrap: wrap;
        padding-left: 0px;
        margin: 10px;
        li {
            width: 14.2%;
            list-style: none;
            text-align: center;
            height: 90px;
        }
    }
}




</style>
