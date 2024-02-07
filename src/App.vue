<!-- ".containerLogo" von Janis Elfner, Rest von Alekssann Bedur mit Hilfe von Bootstrap und Figma für Navbar l.39-57 -->
<script>
import SideBar from './components/SideBar.vue'
import AppUtils from './components/ApiUtils.vue'
export default {
  components: {
    SideBar,
    AppUtils
  },
  created() {
    AppUtils.methods.cleanupOldEntries()
  }
}
</script>

<template>
  <AppUtils />
  <header>
    <!-- Alte Navigation
      <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <RouterLink id="navbar_home" class="navbar-brand" to="/"
            ><img src="@/assets/house-door-fill.png" />Home</RouterLink
          >
          <RouterLink id="navbar_chat" class="navbar-brand" to="/chat"
            ><img src="@/assets/Vector.png" />Chat</RouterLink
          >
          <RouterLink id="navbar_map" class="navbar-brand" to="/map"
            ><img src="@/assets/geo-alt-fill.png" />Map</RouterLink
          >
        </div>
      </nav>
    </div> -->
    <div id="SidebarSection">
      <SideBar />
    </div>
    <br />
    <div class="logo">
      <div class="containerLogo">
        <img alt="iStudyMaps logo" src="@/assets/logo.png" width="200" height="150" />
      </div>
      <div class="undertitle_purple">
        <h4><b>Your Website</b></h4>
      </div>
      <div class="undertitle_black">
        <h4>For finally finding a learning group</h4>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.logo {
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
.containerLogo {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 10px;
  background: #a479ae;
}

.undertitle_purple {
  color: #a479ae;
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Verdana;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  margin-top: 10px;
}
.undertitle_black {
  color: #000;
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Verdana;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
</style>
<style>
template {
  background-color: aqua;
}
</style>
