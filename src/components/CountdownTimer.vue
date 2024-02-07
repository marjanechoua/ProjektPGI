<!-- Code by Alekssann Bedur / <template> partly with Bootstrap, -->
<script>
export default {
  name: 'CountdownTimer',

  props: {
    duration: Number,
    id: Number
  },

  data: () => ({
    displayHours: 0,
    displayMinutes: 0,
    remainingDuration: 0
  }),

  computed: {
    _minutes() {
      return this._seconds * 60
    },
    _hours() {
      return this._minutes * 60
    }
  },
  async mounted() {
    this.RemainingTime()
  },

  methods: {
    RemainingTime() {
      this.remainingDuration = this.duration
      const hours = Math.floor(this.remainingDuration / 60)
      const minutes = this.remainingDuration - hours * 60
      this.displayHours = hours < 10 ? '0' + hours : hours
      this.displayMinutes = minutes < 10 ? '0' + minutes : minutes

      const timer = setInterval(() => {
        if (this.remainingDuration < 0) {
          clearInterval(timer)
          return
        }
        this.remainingDuration--

        const hours = Math.floor(this.remainingDuration / 60)
        const minutes = this.remainingDuration - hours * 60
        this.displayHours = hours < 10 ? '0' + hours : hours
        this.displayMinutes = minutes < 10 ? '0' + minutes : minutes
      }, 60000)
    }
  }
}
</script>

<template>
  <section id="countdown" class="text-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="countdown-timer">
            <h2>
              Your learning time: <br />
              {{ duration }} minutes
            </h2>
            <div id="timer" class="timer">
              <div class="timer-item">
                <span id="timer-hours" class="timer-value">{{ displayHours }}</span>
                <span class="timer-label"> Hours </span>
              </div>
              <div class="timer-item">
                <span id="timer-minutes" class="timer-value"> {{ displayMinutes }}</span>
                <span class="timer-label"> Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
#countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 30px;
}

.timer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-value {
  font-size: 18px;
  font-weight: bold;
}

.timer-label {
  font-size: 18px;
  font-weight: bold;
}

#timer-hour {
  position: relative;
  right: 10px;
}
</style>
