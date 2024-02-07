<script>
export default {
  data() {
    return {
      cards: [ // Array of cards containing title, content, and image information
        {
          title:
            'Are you studying computer science and do not have a study group yet? Then you have come to the right place!"',
          content:
            'iStudyMaps is a student-built community dedicated to helping h_da computer science students find study groups. Join us to improve your study experience through collaborative learning!',
          image: 'https://design.h-da.de/fileadmin/Photostation/computerlabor_Q7A1543.jpg'
        },

        {
          title: 'Discover Study Spaces and Connect with Peers',
          content:
            'Explore our interactive map to discover study spaces on campus, where you can connect with fellow students',
          image:
            'https://h-da.de/fileadmin/_processed_/3/1/csm_h_da_Lernzentrum_03_141210_0098_e4ce3ead48.jpg'
        },
        {
          title: ' Share your current learning location ',
          content:
            ' Login and be part of the community! Share your areas of expertise and your study schedule so that students can connect with you for support',
          image: 'https://h-da.de/fileadmin/_processed_/8/8/csm_architektur_446e1a561d.jpg '
        },

        {
          title: 'Join Study Groups',
          content:
            ' Join group study sessions and connect with fellow students through our interactive map. Collaborate, discuss, and review course content with peers to boost your understanding and academic performance',
          image: 'https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_1280.jpg'
        },
        {
          title: 'About US',
          image: 'src/assets/Gruppenbild.jpg',
          content:
            'We, a group of five first-semester computer science students at Hochschule Darmstadt, have developed this website to support our fellow students in their computer science studies. Our platform aims to provide resources and assistance tailored to the needs of first-semester computer science students at Hochschule Darmstadt.'
        }
      ],
      currentCard: 0, // Index of the currently displayed card
      // Variables to store touch event coordinates for swipe detection
      touchStartX: 0,
      touchEndX: 0
    }
  },

  methods: {
    // Event handler for touch start
    handleTouchStart(event) {
      this.touchStartX = event.changedTouches[0].clientX
    },
    // Event handler for touch end
    handleTouchEnd(event) {
      this.touchEndX = event.changedTouches[0].clientX
      this.handleSwipe()
    },
    // Detect swipe direction and trigger card navigation
    handleSwipe() {
      const difference = this.touchStartX - this.touchEndX
      if (difference > 0) {
        this.showNextCard()
      } else if (difference < 0) {
        this.showPreviousCard()
      }
    },
     // Show the previous card
    showPreviousCard() {
      this.currentCard = this.currentCard > 0 ? this.currentCard - 1 : this.cards.length - 1
    },
    // Show the next card
    showNextCard() {
      this.currentCard = (this.currentCard + 1) % this.cards.length
    },
    // Navigate to the previous card
    prevSlide() {
      if (this.currentCard > 0) {
        this.currentCard--
      }
    },
    // Navigate to the next card
    nextSlide() {
      if (this.currentCard < this.cards.length - 1) {
        this.currentCard++
      } else {
        this.currentCard = 0
      }
    },
    // Navigate to a specific card by index
    goToCard(index) {
      this.currentCard = index
    }
  }
}
</script>
<template>
  <!--Slideshow made by Marjane Choua-->
  <div class="slideshow-container" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <transition name="slide">
      <div :key="currentCard" class="card">
        <div class="card-body">
          <h5 style="font-weight: bold" class="card-title">{{ cards[currentCard].title }}</h5>
          <p>{{ cards[currentCard].content }}</p>
          <img :src="cards[currentCard].image" class="card-img-top" />
        </div>
      </div>
    </transition>
    <div class="arrow-prev" @click="prevSlide">&#10094;</div>
    <div class="arrow-next" @click="nextSlide" v-if="currentCard < cards.length">&#10095;</div>
  </div>
  <div class="dot-container">
    <span
      class="dot"
      v-for="(card, index) in cards"
      :key="index"
      :class="{ active: index === currentCard }"
      @click="goToCard(index)"
    ></span>
  </div>
  <br />
</template>

<style scoped>
/*style from Figma Prototype*/
* {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.card {
  width: 100%;
  margin: 10px;
  height: 400px;
  margin-bottom: 10px;
  border: none;
}

.card-img-top {
  width: 100%;
  height: 200px;
}

.slideshow-container {
  display: flex;
  width: 100%;
  height: 500px;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-top: 40px;
  overflow: hidden;
}

.arrow-prev,
.arrow-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  /* Update left and right values as per your design */
}

.arrow-prev {
  left: 10px;
  margin-top: 80px;
}

.arrow-next {
  right: 10px;
  margin-top: 80px;
}

.dot-container {
  text-align: center;
  margin-top: 5px;
}

.dot {
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.3s;
}

.active {
  background-color: #333;
  /* Darker color for the active dot */
}
</style>
