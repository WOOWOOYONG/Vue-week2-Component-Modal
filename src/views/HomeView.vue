<template>
  <div class="nav-buttons">
    <button @click="this.showMeetings = false" :class="this.showMeetings ? '' : 'active'">
      Calendar
    </button>
    <button @click="this.showMeetings = true" :class="this.showMeetings ? 'active' : ''">
      Meetings
    </button>
  </div>
  <MySchedule :meetings="meetings" :revealModal="revealModal" v-if="showMeetings" />
  <MyCalendar
    v-else
    :revealModal="revealModal"
    @addMeeting="passMeeting"
    :calendarEvents="calendarEvents"
    @addEvent="passEvent"
  />
</template>

<script>
import MyCalendar from '../components/MyCalendar.vue'
import MySchedule from '../components/MySchedule.vue'

export default {
  components: {
    MyCalendar,
    MySchedule
  },
  data() {
    return {
      revealModal: false,
      showMeetings: false,
      calendarEvents: [
        {
          date: '2023-05-02',
          title: '專題討論'
        },
        {
          date: '2023-05-04',
          title: '晚餐討論'
        }
      ],
      meetings: [
        {
          day: '2023-05-01',
          title: '專題討論',
          detail: '專題題目初步討論，每個人想2~3個主題'
        },
        {
          day: '2023-05-04',
          title: '晚餐討論',
          detail: '世界上最難的問題之一，禁止回答隨便都可以'
        }
      ]
    }
  },
  methods: {
    passMeeting(val) {
      this.meetings.push(val)
    },
    passEvent(val) {
      this.calendarEvents.push(val)
    }
  }
}
</script>

<style>
.nav-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2rem 0;
}

.nav-buttons button {
  font-size: 16px;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.nav-buttons button.active {
  background-color: #3fb883;
  color: #fff;
}

.nav-buttons button:not(.active) {
  background-color: #fff;
  color: #3fb883;
  border: 1px solid #3fb883;
  margin-left: -1px;
}

.btn {
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  margin-right: 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  border: 1px solid lightgray;
}

.btn-cancel {
  background-color: rgb(155, 153, 153);
  color: #fff;
}

.btn-confirm {
  background-color: #39ae7b;
  color: #fff;
}

.btn-cancel:hover {
  background-color: rgb(126, 126, 126);
  transition: all 0.2s;
}

.btn-confirm:hover {
  background-color: #2b875f;
  transition: all 0.2s;
}

.titleInput {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 4px 0;
  font-size: 1.2rem;
}

.detailInput {
  font-size: 1.2rem;
}
</style>
