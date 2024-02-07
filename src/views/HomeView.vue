<script>
import StudyMap from '../components/StudyMap.vue'
import SlideShow from '../components/SlideShow.vue' //Slideshow added by Marjane Choua
import ChatSection from '../components/ChatSection.vue' //ChatSection added by Alekssan Bedur
import AppFooter from '../components/AppFooter.vue' // AppFooter added by Alekssann Bedur
export default {
  components: {
    StudyMap,
    ChatSection,
    SlideShow,
    AppFooter
  },

  props: {
    mode: null,
    id: null,
    duration: null,
  },

  data() {
    return {
      elementToScroll: null,
      showScrollText: false, //initalize showscrolltext to false, so that it is not visible (Marjane Choua)
      isIconVisible: true // Initialize isIconVisible to true (Marjane Choua)
    }
  },

  methods: {
    scrollToElement() {
      // Code to scroll to the next section (Marjane Choua)
      const nextSection = document.getElementById('StudyMapSection').nextElementSibling
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    },

    handleScroll() {
      //Code by Marjane Choua
      // Method to handle scroll events and toggle the visibility of an icon
      const footersection = document.getElementById('FooterSection')
      if (footersection) {
        const FooterSectionBottom = footersection.offsetTop + footersection.offsetHeight
        const isFooterSectionVisible =
          window.scrollY + window.innerHeight > footersection.offsetTop &&
          window.scrollY < FooterSectionBottom
        this.isIconVisible = !isFooterSectionVisible
      }
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll) // Add scroll event listener (Marjane Choua)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll) //Code by Marjane Choua
    // Remove scroll event listener when the component is unmounted
  }
}
</script>
<template>
  <div id="MotivationSection">
    <SlideShow />
    <!--Slideshow by Marjane Choua and with help of perplexity.ai -->

    <!--Scroll Down animation made by Marjane Choua-->
    <div
      v-show="isIconVisible"
      class="scroll-icon"
      @click="scrollToElement"
      @mouseover="showScrollText = true"
      @mouseleave="showScrollText = false"
    >
      <span></span>
      <p v-if="showScrollText">Scroll down</p>
    </div>

    <br />
    <br />
    <br />
  </div>
  <div id="StudyMapSection">
    <br />

    <StudyMap />
    <br />
    <br />
    <br />
    <br />

    <br />
  </div>
  <div id="ChatSection">
    <ChatSection />
  </div>
  <div id="FooterSection">
    <AppFooter />
  </div>
</template>

<style scoped>
/*style from Figma Prototype*/
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
/*StudyMap Section*/
#StudyMapSection {
  animation: slide-in-from-top 1s ease forwards;
}
@keyframes slide-in-from-top {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/*Scroll Icon*/

.scroll-icon {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
}

.scroll-icon span {
  width: 10px;
  height: 10px;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: rotate(-45deg);
}
.scroll-icon p {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  margin: 5px;
  padding: 5px;
  background: #a479ae;
  color: #000000;
  border-radius: 5px;
  display: none;
  white-space: nowrap;
}

.scroll-icon:hover p {
  display: block;
}
.scroll-icon:hover span {
  border-color: #000;
}
/* Chat Section */

#ChatSection {
  margin-top: 85px;
  padding-top: 100px;
}
</style>
