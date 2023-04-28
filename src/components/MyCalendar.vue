<template>
  <div>
    <FullCalendar :options="calendarOptions" ref="fullCalendar" />
  </div>
  <template v-if="showModal">
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
  </template>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar
  },
  props: {
    revealModal: {
      type: Boolean,
      default: false
    },
    calendarEvents: {
      type: Array
    }
  },
  emits: ['addMeeting', 'addEvent'],
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        dateClick: this.handleDateClick,
        aspectRatio: 2,
        events: this.calendarEvents
      },
      date: '',
      showModal: this.revealModal,
      event: {
        title: '',
        date: ''
      },
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
        this.event.title = this.meeting.title
        this.event.date = this.date
        this.$emit('addEvent', { ...this.event })
        this.$emit('addMeeting', { ...this.meeting })
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

<style>
.fc {
  font-size: 1.1rem;
}

.fc-view-harness {
  cursor: pointer;
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
