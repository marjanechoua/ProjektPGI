<!-- Filter-Feature made by Alekssann Bedur and Marjane Choua -->
<script>
/* Dropdown by Shade (Alma) Bauer */
import TimeLimit from './TimeLimit.vue'
export default {
  inheritAttrs: false,
  name: 'DropDownMoreDetails',
  components: {
    TimeLimit
  },
  data() {
    return {
      name: 'DropdownMoreDetails',
      localSelectedLocation: this.selectedLocation //Code by Marjane Choua
    }
  },
  props: {
    selectedLocation: String
  },
  methods: {
    //methods and mounted by Marjane Choua
    handleLocationChange(event) {
      console.log('location-selected: ' + event.target.value)
      this.$emit('location-selected', event.target.value)
    }
  },
  mounted() {
    this.localSelectedLocation = this.selectedLocation
  }
}
</script>

<template>
  <!--v-bind added and @change modified by Marjane Choua, v-bind="$attrs" to fix console Error (Alekssann Bedur) -->
  <select
    @change="handleLocationChange"
    class="form-select"
    aria-label="Default select example"
    id="Building"
    v-bind:value="selectedLocation"
    v-bind="$attrs"
  >
    <option value="C10">C10</option>
    <option value="C23">C23</option>
    <option value="D10">D10</option>
    <option value="D14">D14</option>
    <option value="D15">D15</option>
  </select>
  <TimeLimit :selectedLocation="selectedLocation" />
</template>

<style scoped>
#Building {
  /*Figma*/
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;
  float: center;
  border-radius: 8px;
  border: 1px solid var(--Stroke, rgba(0, 0, 0, 0.1));
  background: var(--Hover, #f5f4fb);
  color: #a479ae;
  font-family: Verdana;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
}
</style>
