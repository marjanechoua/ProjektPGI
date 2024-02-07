<!-- Filter-Feature made by Alekssann Bedur -->
<script>
/* code done by Shade (Alma) Bauer */
import DropdownMoreDetail from '../components/DropdownMoreDetail.vue'

export default {
  name: 'MoreDetailsView',
  components: {
    DropdownMoreDetail
  },

  props: {
    locationSelected: null
  },
  data() {
    return {
      showPopover: false, // Initialize the popover with not being visible (Marjane Choua)
      selectedOption: '',
      selectedLocation: '' // Currently selected location
    }
  },
  methods: {
    // Close the popover (Code by Marjane Choua)
    closePopover() {
      this.showPopover = false
    },
    // Open the popover (Code by Marjane Choua)
    openPopover() {
      this.showPopover = true
    },
    // Handle the selection of an option
    handleOptionSelected(option) {
      this.selectedOption = option
    },
    // redirectToHome added by Shade (Alma) Bauer
    redirectToHome() {
      this.$router.push('/#StudyMapSection')
    },
    // Update the selected location (Marjane Choua)
    updateSelectedLocation(location) {
      this.selectedLocation = location
    }
  },

  mounted() {
    // Initialize the popover when the component is mounted (Marjane Choua)
    this.openPopover()
    // Update the selected location based on the route parameters (Marjane Choua)
    this.updateSelectedLocation(this.$route.params.location)
  }
}
</script>

<template>
  <main>
    <br />
    <!-- icon-container & icon added by Shade (Alma) Bauer -->
    <div class="icon-container">
      <div @click="redirectToHome" fill="currentColor" class="X-icon" viewBox="0 0 16 16">
        &times;
      </div>
    </div>

    <div>
      <div>
        <!--Code by Marjane Choua-->
        <h1 class="building">Building:</h1>
        <div v-if="showPopover" class="custom-popover">
          <h3>Welcome to the MoreDetails Page!</h3>
          <p>
            Here, you can view various students, sorted by their location and their remaining time
            for their studies, which is represented visually with a progress bar
          </p>
          <button class="button" v-if="showPopover" v-on:click="showPopover = false">
            Got it!
          </button>
        </div>
      </div>
    </div>
    <!--Code :selectedLocation added by Marjane Choua-->
    <DropdownMoreDetail
      @location-selected="updateSelectedLocation"
      :selectedLocation="selectedLocation"
      class="dropdown"
    />
    <br /><br />
    <br /><br />
  </main>
</template>

<style scoped>
h1 {
  color: #a479ae;
  text-align: center;
}
h3 {
  text-align: center;
  color: black;
}

.building {
  color: #000;
  font-family: Verdana;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  text-align: left;

  margin-right: 30px;
}

/*Soumaya Alou*/
.star {
  float: left;
}

.dropdown {
  /*Code from Marjane Choua*/
  width: 50px;
  float: right;
  display: flex;
  align-items: center;
  margin-right: 20px;
}
/*popover guide, (Marjane Choua)*/
.custom-popover button {
  text-align: center;
  margin: 10px;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid #a479ae;
  background: rgba(248, 210, 71, 0.2);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 200px;
  height: 42px;
  flex-shrink: 0;
} /* https://www.w3schools.com/howto/howto_css_animate_buttons.asp (Marjane Choua)*/

.custom-popover button:hover {
  background-color: #7d5a84;
  color: #f7dc7e;
}

.button:active {
  background-color: #f9df81;
  box-shadow: 0 2px #f1de9c;
  transform: translateY(4px);
}
.custom-popover {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  max-height: 300px; /* Set a maximum height */
  overflow-y: auto;
  position: absolute;
  top: 300px;
  left: 45px;
  padding: 20px;
  max-width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}
.custom-popover h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

/*  Close Icon added by Shade (Alma) Bauer */
.icon-container {
  position: absolute;
  top: 50px;
  right: 10px;
  cursor: pointer;
  font-size: 36px;
}
</style>
