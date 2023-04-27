<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import MySchedule from '../components/MySchedule.vue'

export default {
  components: {
    FullCalendar,
    MySchedule
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        dateClick: this.handleDateClick,
        events: [
          {
            date: '2023-05-02',
            title: '專題討論'
          },
          {
            date: '2023-05-04',
            title: '晚餐討論'
          }
        ]
      },
      date: '',
      showModal: false,
      showMeetings: false,
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
      ],
      meeting: {
        day: '',
        title: '',
        detail: ''
      }
    }
  },
  methods: {
    handleDateClick(e) {
      let calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.unselect() // clear date selection
      this.date = e.dateStr
      this.meeting.day = e.dateStr
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    addToMeetings() {
      if (this.meeting.title && this.meeting.detail) {
        const event = {}
        event.title = this.meeting.title
        event.date = this.date
        this.calendarOptions.events.push(event)
        this.meetings.push({ ...this.meeting })
        this.meeting.title = ''
        this.meeting.detail = ''
        this.showModal = false
      } else {
        alert('請先輸入資料')
      }
    }
  }
}
</script>
<template>
  <div class="nav-buttons">
    <button @click="this.showMeetings = false" :class="this.showMeetings ? '' : 'active'">
      Calendar
    </button>
    <button @click="this.showMeetings = true" :class="this.showMeetings ? 'active' : ''">
      Meetings
    </button>
  </div>
  <div>
    <MySchedule :meetings="meetings" v-if="showMeetings" />
    <FullCalendar :options="calendarOptions" ref="fullCalendar" v-else />
  </div>
  <div v-if="showModal">
    <ModalItem @close="closeModal">
      <template v-slot:header>新增會議</template>
      <template v-slot:date
        ><p>日期：{{ date }}</p>
      </template>
      <template v-slot:content>
        <div>
          <input type="text" placeholder="會議主旨" v-model="meeting.title" class="titleInput" />
        </div>
        <textarea
          cols="30"
          rows="10"
          placeholder="詳細事項"
          v-model="meeting.detail"
          class="detailInput"
        ></textarea>
      </template>
      <template v-slot:footer>
        <button class="btn btn-cancel" @click="closeModal">取消</button>
        <button class="btn btn-confirm" @click="addToMeetings">確定</button>
      </template>
    </ModalItem>
  </div>
</template>

<style>
.fc-view-harness {
  cursor: pointer;
}

.nav-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2rem 0;
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
