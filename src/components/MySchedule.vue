<template>
  <div>
    <h2 v-if="meetings.length === 0">目前沒有會議</h2>
    <div v-else>
      <h2>會議安排清單</h2>
      <ul class="meetingList">
        <li v-for="(meeting, index) in meetings" :key="index">
          <p>日期：{{ meeting.day }}</p>
          <p>會議主旨：{{ meeting.title }}</p>
          <button :data-id="index" @click="getDetail">詳細內容</button>
        </li>
      </ul>
    </div>

    <div v-if="showModal">
      <ModalItem @close="closeModal">
        <template v-slot:header>會議內容</template>
        <template v-slot:date
          ><p>日期：{{ selectMeeting.day }}</p>
        </template>
        <template v-slot:content>
          <p>主旨：{{ selectMeeting.title }}</p>
          <p>事項：{{ selectMeeting.detail }}</p>
        </template>
        <template v-slot:footer>
          <button @click="closeModal" class="btn btn-confirm">確定</button>
        </template>
      </ModalItem>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meetings: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      meetingData: [],
      showModal: false,
      selectMeeting: {}
    }
  },
  methods: {
    getDetail(e) {
      const id = e.target.dataset.id
      this.showModal = true
      this.selectMeeting = this.meetings[id]
    },
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
}

.meetingList {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
  width: 50%;
}

.meetingList li {
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.meetingList li p {
  margin: 0;
  line-height: 1.5;
}

.meetingList li button {
  background-color: #5d6163;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
}

.meetingList li button:hover {
  background-color: #858585;
}

.btn-confirm {
  background-color: #39ae7b;
  color: #fff;
}

.btn-confirm:hover {
  background-color: #2b875f;
  transition: all 0.2s;
}
</style>
