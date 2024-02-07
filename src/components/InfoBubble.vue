<script>
export default {
  name: 'InfoBubble',
  props: {
    students: Array,
    location: String
  },
  data() {
    return {
      showAllStudents: false
    }
  },
  computed: {
    numberStudents() {
      return this.students.length
    },
    //only view more / less by JE
    displayedStudents() {
      return this.showAllStudents ? this.students : this.students.slice(0, 5)
    }
  },
  methods: {
    toggleViewMore() {
      this.showAllStudents = !this.showAllStudents
    },
    handleClick(location) {
      //Code by Marjane Choua
      this.$emit('location-selected', location)
    }
  }
}
</script>

<template>
  <div class="content">
    <div class="popover-text">
      <h2>{{ location }}</h2>
      <ol>
        <li v-for="(student, index) in displayedStudents" :key="index">
          {{ student.name }} {{ student.subject }}
        </li>
      </ol>
      <!--only view more / view less by Janis Elfner-->

      <a v-if="numberStudents > 5 && !showAllStudents" @click="toggleViewMore">
        View more &#9660;
      </a>
      <a v-if="showAllStudents" @click="toggleViewMore"> View less &#9650;</a>
      <br />
      <a :href="`/more_details/${location}`">Click for more details!</a>
    </div>
  </div>
</template>

<style scoped>
button {
  border-radius: 6px;
  border: 1px solid #000;
  background: rgba(248, 210, 71, 0.5);
  box-shadow:
    4px 4px 4px 0px rgba(0, 0, 0, 0.5),
    0px 4px 4px 0px rgba(0, 0, 0, 0.5);
  background-image: 'https://h-da.de/fileadmin/h_da/Hochschule/Hochschulprofil/Standorte/Lageplan_Darmstadt_Uebersichtskarte_Legende_web.pdf';
}
.content {
  align-items: flex-start;
  background-color: #fae598f7;
  border: 1px solid;
  border-color: #000000;
  border-radius: 6px;
  display: inline-flex;
  flex-direction: column;
  padding: 16px;
  position: relative;
  right: 125px;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);
  z-index: 1000;
}
.content .popover-text {
  color: #000000;
  font-family: 'Verdana-Regular', Helvetica;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  width: fit-content;
}
a {
  color: #a378ae;
  font-family: 'Verdana-BoldItalic', Helvetica;
  font-size: 13px;
  font-style: italic;
  letter-spacing: 0;
  line-height: normal;
}
</style>
