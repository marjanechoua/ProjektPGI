<script>
import { API_ENDPOINT } from '../constants.js'

export default {
  name: 'ApiUtils',
  methods: {
    isToday(dateString) {
      const today = new Date()
      const givenDate = new Date(dateString)
      return (
        givenDate.getDate() === today.getDate() &&
        givenDate.getMonth() === today.getMonth() &&
        givenDate.getFullYear() === today.getFullYear()
      )
    },
    async cleanupOldEntries() {
      // delete all rows from yesterday or before and records with remainingTime<=0
      const students = await this.fetchStudents()
      if (students) {
        // async for each may cause trouble, hence ordinary for loop
        for (const student of students) {
          if (student.remainingTime <= 0 || !this.isToday(student.startDate)) {
            await this.deleteRecord(student.id)
          }
        }
      }
    },
    async deleteRecord(id) {
      // use /api due to cors problem, see proxy config in vite.config.js
      fetch(`/api/${id}`, {
        method: 'DELETE'
      })
        .then((response) => {
          console.log('delete ' + id + ', status: ' + response.status)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async fetchStudents() {
      const response = await fetch(API_ENDPOINT)
      const students = await response.json()
      return students
    },
    updateRemainingTime(id, remainingTime) {
      const patchData = { remainingTime: remainingTime }
      // use /api due to cors problem, see proxy config in vite.config.js
      fetch(`/api/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchData)
      })
      console.log(`updated id ${id} to ${remainingTime}`)
    },

    filterActiveByLocation(location, students) {
      const today = new Date()
      const hourNow = today.getHours()
      return students.filter(
        (student) =>
          student.location === location &&
          student.startDuration !== 0 &&
          this.isToday(student.startDate) &&
          student.startHour + 1 + student.startDuration / 60 > hourNow
      )
    }
  }
}
</script>

<!-- Leeres <template> um Error: "Component is missing template or render function." zu fixen -->
<template>
  <div></div>
</template>