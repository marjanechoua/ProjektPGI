<script>
import InfoCircle from './InfoCircle.vue'
import CountdownTimer from '../components/CountdownTimer.vue'
import ApiUtils from './ApiUtils.vue'
import CookieUtils from './CookieUtils.vue'

export default {
  inheritAttrs: false,
  components: {
    InfoCircle,
    CountdownTimer,
    ApiUtils,
    CookieUtils
  },
  
  data() {
    //RemainingTime Popover script von JE
    return {
      showPopover: false,
      students: [],
      duration: this.$route.params.duration,
      id: this.$route.params.id,
      selectedLocation: '', //Code by Marjane Choua
      mode: this.$route.params.mode
    }
  },
  computed: {
    uniqueLocations() {
      return [...new Set(this.students.map((student) => student.location))]
    }
  },
  created() {
    this.mode = this.$route.params.mode
  },

  methods: {
    login() {
      this.$router.push({ params: { mode: 'login' } })
    },
    handleLogin() {
      this.$router.push({ params: { mode: 'login' } })
      this.$router.push('login')
    },
    logout() {
      this.mode = null
      this.$router.push({ params: { mode: null } })
      this.$router.push('/')
      const studyId = CookieUtils.methods.readCookie('StudyId')
      ApiUtils.methods.deleteRecord(studyId)
      CookieUtils.methods.deleteCookie('StudyId')
    },

    togglePopover() {
      this.showPopover = !this.showPopover
    },
    closePopover() {
      this.showPopover = false
    },
    activeStudentsByLocation(location) {
      return ApiUtils.methods.filterActiveByLocation(location, this.students)
    },
    handleLocationSelected(location) {
      //Code by Marjane Choua
      this.selectedLocation = location
      this.$router.push({ name: 'more_details', params: { location: location } })
    }
  },

  async mounted() {
    this.students = await ApiUtils.methods.fetchStudents()
    console.log('got total number of students:' + this.students.length)
  }
}
</script>

<template>
  <ApiUtils />
  <CookieUtils />
  <div id="help_text">
    <h4>Try clicking on a building to see who is learning what.</h4>
  </div>

  <div class="containerMap">
    <img src="../assets/Purple_HDA_Map.jpg" />
    <!--@info-circle-clicked added by Marjane Choua and modified by Alekssann Bedur to @location-selected-->
    <div v-for="location in uniqueLocations" :key="location">
      <InfoCircle
        :id="location"
        :location="location"
        :students="activeStudentsByLocation(location)"
        @location-selected="handleLocationSelected"
      />
    </div>
  </div>
  <!--Soumaya Alou -->

  <button 
    id="logout" 
    v-if="mode === 'login'" 
    v-bind="$attrs"
    @click="logout">
    Log out
  </button>
  <!-- v-c-popover="{ header: 'Goodbye', content: 'Thanks for using our Website', placement: 'right' }" -->

  <!--Remaining Time Button von Janis Elfner-->
  <div class="button-container">
    <button @click="togglePopover" v-if="mode === 'login'" class="remaining-time-button">
      Remaining Time
    </button>
    <div v-if="showPopover" class="popoverCountdown" @click.self="closePopover">
      <div class="content">
        <span class="close-button" @click="closePopover">X</span>
        <div v-if="showPopover"></div>
      </div>
      <CountdownTimer :duration="duration" :id="id" />
    </div>
  </div>

  <!--Login Button-->
  <div id="login">
    <button v-if="!mode" @click="handleLogin">Share your current learning location!</button>
    <!--Code by Marjane Choua-->
  </div>
</template>

<style scoped>
/* Info Circles und Remaining Time button von Janis Elfner */
.containerMap {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.containerMap img {
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  margin-left: 15px;
  margin-right: 15px;
  right: 15px;
}

#D15 {
  position: absolute;
  left: 361px;
  top: 175px;
}
#D14 {
  position: absolute;
  top: 205px;
  left: 355px;
}
#C10 {
  position: absolute;
  top: 100px;
  left: 153px;
}
#C23 {
  position: absolute;
  top: 60px;
  left: 194px;
}
#D10 {
  position: absolute;
  top: 165px;
  left: 263px;
}
.button-container {
  position: relative;
  right: 12px;
}

#logout {
  position: relative;
  right: 12px;
}

#login {
  position: relative;
  right: 12px;
}

.popoverCountdown {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  z-index: 2;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
img {
  width: 427px;
  height: 400px;
  margin-left: 20px;
}

h4 {
  color: #000;
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Verdana;
  font-size: 18px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px; /* 133.333% */
}

#help_text {
  padding: 10px;
  fill: rgba(164, 121, 174, 0.25);
  stroke-width: 1px;
  stroke: #a479ae;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

/*Soumaya Alou figma*/
button {
  display: flex;
  width: 167px;
  height: 45px;
  padding: 16px 24px;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #f1de9c;
  border: 3px solid #a479ae;
  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  width: 300px;
  height: 80px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;

  text-align: center;
  font-family: Verdana;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;

  /*Soumaya Alou*/
  float: left;
  margin-top: 20px;
  margin-left: 15px;
  margin-left: 60px;
}

#rtime {
  display: flex;
  width: 144.097px;
  height: 34.286px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;

  text-align: center;
  font-family: Verdana;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;

  display: flex;
  width: 170px;
  height: 55px;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 6px;
  background: rgba(248, 210, 71, 0.6);

  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  /*Soumaya Alou*/
  float: left;
  margin-left: 90px;
  padding-left: 50px;
  padding-right: 70px;
  margin-top: 20px;
}
button:hover {
  background-color: #a479ae;
  color: #ffe193;
}
/*Soumaya Alou*/
#logout:hover {
  background-color: #a479ae;
  color: #ffe193;
}
/*Soumaya Alou*/
#rtime:hover {
  background-color: #a479ae;
  color: #ffe193;
}
</style>
