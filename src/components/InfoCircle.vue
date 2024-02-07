<script>
import InfoBubble from './InfoBubble.vue'
export default {
  name: 'InfoCircle',
  components: {
    InfoBubble
  },
  props: {
    students: Array,
    location: String
  },
  data() {
    return {
      infoBubbleIsVisible: false
    }
  },
  computed: {
    circleSize() {
      return (Number(this.numberStudents) + 3) * 5
    },
    numberStudents() {
      return this.students.length
    }
  },
  methods: {
    toggleInfoBubbleVisibility() {
      this.infoBubbleIsVisible = !this.infoBubbleIsVisible // Toggles the visibility.
    },
    handleLocationSelected(location) {
      //Code by Marjane Choua
      this.$router.push({ name: 'more-details', query: { location: location } })
    },
    handleInfoCircleClick() {
      //Code by Marjane Choua and modified by Alekssann Bedur
      this.$emit('location-selected', this.location)
    }
  }
}
</script>

<template>
  <div>
    <!-- jedes template darf nur einen Knoten enthalten, daher braucht es dieses div drumherum -->
    <!--muss auf StudyMap eingebunden werden (Container des Lageplans)-->
    <!--location und numberStudents muss eingebunden werden-->

    <button
      v-if="numberStudents <= 15 && numberStudents > 0"
      class="circle-button"
      :style="{
        width: circleSize + 'px',
        height: circleSize + 'px'
      }"
      @click="toggleInfoBubbleVisibility"
    >
      {{ numberStudents }}
    </button>

    <button
      v-else-if="numberStudents > 15 && numberStudents != 0"
      class="circle-button"
      :style="{
        width: '90px',
        height: '90px'
      }"
      @click="toggleInfoBubbleVisibility"
    >
      {{ numberStudents }}
    </button>

    <div v-if="infoBubbleIsVisible">
      <!--location-selected added by Marjane Choua-->
      <InfoBubble
        :students="students"
        :location="location"
        @location-selected="handleLocationSelected"
      />
    </div>
  </div>
</template>

<style>
/* größe der Kreise muss proportional zu numberStudens sein */
.circle-button {
  background-color: #f8d24780;
  border: 2px solid #ffffff;
  border-radius: 50%;
  color: #000000;
  font-size: 100%;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  display: inline;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.circle-button:hover {
  background-color: #8a6e0780;
  color: #ffffff;
}
</style>
