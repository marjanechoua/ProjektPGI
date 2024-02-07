<!-- Code written by Marjane Choua with help of Perplexity.ai and vuejs3 schools -->
<!-- Filter-Feature made by Alekssann Bedur and Marjane Choua -->
<!--Student Subject and Strength, and view more view less buttons added by Janis Elfner-->
<!--ProgressBar added by Shade (Alma) Bauer-->
<template>
  <ApiUtils />
  <div>
    <ul class="student-list">
      <!--Timelimit and array for students list and student.name added by Marjane Choua-->
      <li v-for="(student, index) in displayedStudents" :key="index">
        <h3>
          <!--StarRating written by Janis Elfner-->
          <div class="StarRating">
            <img class="star" src="../assets/star.png" />
            <div class="StarText">{{ student.strength }}</div>
          </div>
          {{ student.name }}
          {{ student.subject }}
        </h3>

        <!-- Adding of ProgressBar made by Shade (Alma) Bauer -->
        <ProgressBar :remainingPercentage="student.remainingPercentage" />
        <h6><b>Limit:</b>{{ student.startDuration / 60 }} hours</h6>
        <!--Limit added by Marjane Choua-->
      </li>
    </ul>
    <!--View More/Less by JE (also logic/style)-->
    <div class="ViewStudents-Button" v-if="displayedStudents > 10">
      <button v-if="!showAll" @click="showAll = true">View More &#9660;</button>
      <button v-if="showAll" @click="showAll = false">View Less &#9650;</button>
    </div>
  </div>
</template>

<script>
// Import made by Shade (Alma) Bauer
import ProgressBar from '../components/ProgressBar.vue'
import ApiUtils from '../components/ApiUtils.vue'
export default {
  name: 'TimeLimit',
  components: {
    ApiUtils,
    ProgressBar
  },
  data() {
    return {
      students: [],
      showAll: false,
      intervallId: -1
    }
  },
  props: {
    selectedLocation: String //Added by Marjane Choua
  },
  watch: {
    // whenever selectedLocation changes, this function will run
    // see https://vuejs.org/guide/essentials/watchers.html
    selectedLocation(newLocation, oldLocation) {
      if (newLocation != oldLocation) {
        this.fetchStudentData()
      }
    }
  },
  created() {
    this.fetchStudentData()
    // update every minute, no fetch from server needed!
    this.intervalId = setInterval(this.updateRemainingTime, 60000)
  },
  beforeUnmount() {
    // Clear the interval before the component is destroyed
    clearInterval(this.intervalId)
  },

  computed: {
    displayedStudents() {
      return this.showAll ? this.students : this.students.slice(0, 10)
    }
  },

  methods: {
    async fetchStudentData() {
      try {
        const data = await ApiUtils.methods.fetchStudents()
        console.log('fetch students for ' + this.selectedLocation)
        this.students = ApiUtils.methods
          .filterActiveByLocation(this.selectedLocation, data)
          .map((student) => ({
            ...student,
            remainingPercentage: (student.remainingTime / student.startDuration) * 100
          }))
      } catch (error) {
        console.error('Error fetching student data: ', error)
      }
    },
    handleLocationSelected(location) {
      // Code by Marjane Choua
      this.$router.push({ path: '/more_details', query: { location: location } })
    },
    updateRemainingTime() {
      this.students.forEach((student) => {
        student.remainingTime--
        student.remainingPercentage = (student.remainingTime / student.startDuration) * 100
      }),
        60000
    }
  }
}
</script>

<style scoped>
/* style is with help of Figma and Perplexity.ai*/
#timelimit .text-wrapper-3 {
  color: #000;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 16px;
  font-weight: 700;
  left: 278px;
  letter-spacing: 0;
  line-height: 20px;
  position: absolute;
  top: 53px;
  white-space: nowrap;
}
.student-list {
  list-style-type: none;
  margin-bottom: 10px;
}

b {
  float: left;
  margin-left: 5px;
  margin-right: auto;
}

h6 {
  float: right;
  margin-right: 8px;
  margin-left: auto;
  position: relative;
  display: flex;
}
ul li {
  margin-bottom: 10px;
  display: list-item;
}

.StarRating {
  position: relative;
  display: inline-block;
}

.star {
  position: relative;
  height: 36px;
  width: 38px;
}

.StarText {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black; /* Textfarbe anpassen */
  font-weight: bold;
  font-size: 16px; /* Schriftgröße anpassen */
  text-align: center;
}

@media (max-width: 980px) {
  .limit {
    margin-bottom: 5px;
    margin-left: 250px;
  }
}
.ViewStudents-Button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
button {
  display: flex;
  width: 180px;
  height: 45px;
  margin-top: 20px;
  padding: 16px 24px;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 6px;
  background: rgba(248, 210, 71, 0.6);
  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  font-family: Verdana;
  font-style: normal;
  font-weight: 700;
  line-height: 10px;
}
</style>
