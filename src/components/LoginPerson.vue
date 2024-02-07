<script>
import { API_ENDPOINT } from '../constants.js'
import ApiUtils from './ApiUtils.vue'

export default {
  name: 'LoginPerson',
  components: {
    ApiUtils
  },
  data() {
    return {
      id: -1,
      numberStudents: '',
      location: '',
      name: '',
      subject: '',
      startDuration: '',
      strength: '',
      startHour: new Date().getHours(),
      startDate: new Date().toJSON().slice(0, 10), // Get the current date in the format "YYYY-MM-DD"
      isPopoverVisible: false,
      // confirmationVisible by Shade (Alma) Bauer
      confirmationVisible: false,
      propertyToExport: 'startDuration',
      mode: this.$route.params.mode //mode added by Marjane Choua
    }
  },
  methods: {
    async sendData() {
      this.mode = 'login' //Code by Marjane Choua
      this.$emit('login') //Code by Marjane Choua
      console.log(this.location)
      //if else für tooltip bei submit JE
      if (
        this.name &&
        this.subject !== 'Pick a subject' &&
        this.location !== 'Pick a building' &&
        this.strength &&
        this.startDuration
      ) {
        try {
          const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.name,
              startDate: this.startDate,
              location: this.location,
              subject: this.subject,
              startHour: this.startHour,
              startDuration: this.startDuration,
              strength: this.strength,
              remainingTime: this.startDuration
            })
          })
          const data = await response.json()
          this.id = data.id
          console.log(data)
          this.updateRemainingTimeEachMinute()
          var date = new Date()
          date.setTime(date.getTime() + this.startDuration * 60 * 1000)
          var expires = 'expires=' + date.toUTCString()
          document.cookie = 'StudyId=' + data.id + ';' + expires + ';path=/'

          // confirmationPopover & setTimeout made by Shade (Alma) Bauer
          this.confirmationVisible = true
          setTimeout(() => {
            this.confirmationPopover = false
          }, 3000)

          setTimeout(() => {
            this.$router.push({
              name: 'home_login_true',

              params: { duration: this.startDuration, id: data.id, mode: this.mode } // mode added by Marjane Choua
            })
          }, 1500) // Handle the response as per your requirement
        } catch (error) {
          console.error(error) // Handle the error
        }
      } else {
        this.isPopoverVisible = true

        setTimeout(() => {
          this.isPopoverVisible = false
        }, 3000)
      }
    },
    // redirectToHome added by Shade (Alma) Bauer
    redirectToHome() {
      this.$router.push('/#StudyMapSection')
    },
    updateRemainingTimeEachMinute() {
      this.remainingTime = this.startDuration
      // Set up the interval to call the API every minute (60000 milliseconds)
      const intervalId = setInterval(this.updateRemainingTimeInApi, 60000)
      // Clear the interval after the specified duration
      setTimeout(() => {
        clearInterval(intervalId)
      }, this.startDuration * 60000)
    },
    updateRemainingTimeInApi() {
      ApiUtils.methods.updateRemainingTime(this.id, this.remainingTime)
      this.remainingTime--
    }
  }
}
</script>

<template>
  <ApiUtils />
  <!-- icon-container & icon added by Shade (Alma) Bauer -->
  <div class="icon-container">
    <div @click="redirectToHome" fill="currentColor" class="X-icon" viewBox="0 0 16 16">
      &times;
    </div>
  </div>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    class="bi bi-file-person-fill"
    viewBox="0 0 16 16"
    id="icon1"
  >
    <path
      d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11"
    />
  </svg>

  <!--Soumaya Alou-->
  <h2>Please enter your name:</h2>
  <input class="nameinput" type="text" placeholder="name" v-model="name" />
  <br /><br />

  <!--Soumaya Alou: nur class, aria-label sowie option selected sind von bootstrap übernommen-->
  <p>Pick a Building &emsp; &emsp; Pick a Subject</p>
  <select v-model="subject" id="subject" class="form-select" aria-label="Default select example">
    <option value="Math1">Math1</option>

    <option value="Pg1">Pg1</option>

    <option value="AuD">A&D</option>
  </select>

  <!--Soumaya Alou: nur class, aria-label sowie option selected sind von bootstrap übernommen-->

  <select v-model="location" id="building" class="form-select" aria-label="Default select example">
    <option value="C10">C10</option>

    <option vlaue="C23">C23</option>

    <option value="D10">D10</option>

    <option value="D14">D14</option>

    <option value="D15">D15</option>
  </select>
  <br />
  <!--Soumaya Alou-->
  <h2>
    How strong are you in your subject?<br />
    <i>(Rate from 1 weakest to 5 strongest)</i>
  </h2>
  <div id="radio">
    <input type="radio" name="group1" id="btn1" v-model="strength" value="1" />
    <label for="id1">1</label>

    <input type="radio" name="group1" id="btn2" v-model="strength" value="2" />
    <label for="id2">2</label>

    <input type="radio" name="group1" id="btn3" v-model="strength" value="3" />
    <label for="id3">3</label>

    <input type="radio" name="group1" id="btn4" v-model="strength" value="4" />
    <label for="id4">4</label>

    <input type="radio" name="group1" id="btn5" v-model="strength" value="5" />
    <label for="id5">5</label>
  </div>
  <br />
  <!--Soumaya Alou-->
  <h2>
    Please select your estimated study time:<br />
    <i>(The limit is 5h)</i>
  </h2>

  <!--Bootstrap, aber Größe wurde geändert und id gegeben-->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    class="bi bi-stopwatch"
    viewBox="0 0 16 16"
    id="icon2"
  >
    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
    <path
      d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3"
    />
  </svg>

  <!--Soumaya Alou: nur class, aria-label sowie option selected sind von bootstrap übernommen-->

  <select v-model="startDuration" id="time" class="form-select" aria-label="Default select example">
    <option value="30">0:30h</option>
    <option value="60">1h</option>
    <option value="90">1:30h</option>
    <option value="120">2h</option>
    <option value="150">2:30h</option>
    <option value="180">3h</option>
    <option value="210">3:30h</option>
    <option value="240">4h</option>
    <option value="270">4:30h</option>
    <option value="300">5h</option>
  </select>

  <br /><br />
  <button @click="sendData" id="submit">Submit</button>
  <!--tooltip by JE-->
  <div v-show="isPopoverVisible" class="custom-popover" @transitionend="hidePopover">
    Please fill in all fields before you continue.
  </div>

  <!-- confirmation popover by Janis except v show Shade (Alma) Bauer -->
  <div v-show="confirmationVisible" class="confirmation-popover" @transitionend="hidePopover">
    Information sucessfully transmitted.
  </div>
</template>

<style scoped>
/*Figma*/
h2 {
  color: #000;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Verdana;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;

  /*Soumaya Alou*/
  text-align: center;
}

/*Soumaya Alou*/
p {
  font-family: Verdana;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  padding-left: 10px;
}
/*Figma*/
input[type='text'] {
  display: flex;
  width: 320px;
  height: 44px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  flex-shrink: 0;

  /*Soumaya Alou*/
  border: 2px solid #a479ae;
  margin-left: 50px;
}

/*Figma*/
#submit {
  width: 157px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #a479ae;
  background: #ffe193;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #000;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Verdana;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  /*Soumaya Alou*/
  margin-left: 130px;
}

/*Soumaya Alou*/
#icon1 {
  margin-top: 450px;
  position: absolute;
}

/*Soumaya Alou*/
#btn1 {
  margin: 10px;
  width: 25px;
  height: 25px;
}
#btn2 {
  margin: 10px;
  width: 25px;
  height: 25px;
}
#btn3 {
  margin: 10px;
  width: 25px;
  height: 25px;
}
#btn4 {
  margin: 10px;
  width: 25px;
  height: 25px;
}
#btn5 {
  margin: 10px;
  width: 25px;
  height: 25px;
}
#radio {
  margin-left: 60px;
}

#subject {
  /*Figma*/
  display: flex;
  align-items: center;
  gap: 8px;
  float: right;
  border-radius: 8px;
  border: 1px solid var(--Stroke, rgba(0, 0, 0, 0.1));
  background: var(--Hover, #f5f4fb);
  color: #a479ae;
  font-family: Verdana;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  width: 150px;
  height: 50px;
  margin-right: 30px;
  margin-left: 30px;

  /*Soumaya Alou*/
}
#building {
  /*Figma*/
  color: #a479ae;
  font-family: Verdana;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--Stroke, rgba(0, 0, 0, 0.1));
  background: var(--Hover, #f5f4fb);
  width: 150px;
  height: 50px;
  /*Soumaya Alou*/
  margin-left: 30px;
}

#time {
  /*Figma*/
  color: #a479ae;
  font-family: Verdana;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid var(--Stroke, rgba(0, 0, 0, 0.1));
  background: var(--Hover, #f5f4fb);

  /*Soumaya Alou*/
  margin-left: 130px;
  width: 150px;
  height: 40px;
}

#subject:hover {
  /*Soumaya Alou*/
  background-color: #a479ae;
  color: #ffe193;
}

#building:hover {
  /*Soumaya Alou*/
  background-color: #a479ae;
  color: #ffe193;
}
#time:hover {
  /*Soumaya Alou*/
  background-color: #a479ae;
  color: #ffe193;
}
#submit:hover {
  /*Soumaya Alou*/
  background-color: #a479ae;
  color: #ffe193;
}

#icon1 {
  /*Soumaya Alou*/
  margin-top: 40px;
  margin-left: 10px;
}
#icon2 {
  /*Soumaya Alou*/
  margin-left: 10px;
  position: absolute;
}
/*JE*/
.custom-popover {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  animation: slideDown 0.5s ease-in-out;
  z-index: 700;
}
.confirmation-popover {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  animation: slideDown 0.5s ease-in-out;
  z-index: 600;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
.nameinput {
  border-radius: 10px;
}

/* added by Shade (Alma) Bauer */
.icon-container {
  position: absolute;
  top: 50px;
  right: 10px;
  cursor: pointer;
  font-size: 36px;
}
</style>
