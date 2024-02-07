<!-- Made by Shade (Alma) Bauer-->
<template>
  <div>
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: remainingPercentage + '%' }">
        {{ remainingPercentage.toFixed(2) }}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    remainingPercentage: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
/* Your existing styles here */
.progress-container {
  width: 70%;
  /* Set the width of the progress container */
  height: 20px;
  /* Set the height of the progress container */
  background-color: #f2f2f2;
  /* Set the background color of the progress container */
}

.progress-bar {
  height: 100%;
  /* Set the height of the progress bar */
  background-color: #a479ae;
  transition: width 0.3s;
  /* Add transition for the width change */
  width: 0;
}

@keyframes remainingTime {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}

.progressList {
  list-style-type: none;
}
</style>
