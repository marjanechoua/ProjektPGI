<!-- Done by Alekssann Bedur with help by https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav -->
<script>
import ApiUtils from './ApiUtils.vue'
import CookieUtils from './CookieUtils.vue'

export default {
  name: 'SideBar',
  components: {
    ApiUtils,
    CookieUtils
  },

  data() {
    return {
      SidebarWidth: '0',
      mode: this.$route.params
    }
  },

  methods: {
    openNav() {
      this.SidebarWidth = '250px'
    },
    closeNav() {
      this.SidebarWidth = '0px'
    },

    logout() {
      this.$router.push({ params: { mode: null } })
      if (this.isLoggedIn) {
        const studyId = CookieUtils.methods.readCookie('StudyId')
        ApiUtils.methods.deleteRecord(studyId)
        CookieUtils.methods.deleteCookie('StudyId')
      }
    }
  },
  computed: {
    isLoggedIn() {
      return CookieUtils.methods.readCookie('StudyId') !== null
    }
  }
}
</script>

<template>
  <ApiUtils />
  <CookieUtils />
  <div id="Sidebar" class="sidebar" :style="{ width: SidebarWidth }">
    <!-- Logo hinzufügen?-->
    <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
    <a href="/#motivation">
      <span class="material-symbols-outlined">home</span>
      Our Motivation</a
    >
    <a href="/#StudyMapSection">
      <span class="material-symbols-outlined">map</span>
      Map</a
    >
    <a href="/#ChatSection">
      <span class="material-symbols-outlined">local_cafe</span>
      Chat</a
    >
    <a href="/Login" class="SidebarLogin" v-if="!isLoggedIn">
      <!-- Mode added by  Shade (Alma) Bauer -->
      <span class="material-symbols-outlined"> person</span>
      Login</a
    >

    <!-- Mode and Logout added by Shade (Alma) Bauer -->
    <a href="/" class="SidebarLogout" v-if="isLoggedIn" @click="logout">
      <span class="material-symbols-outlined">logout</span>Logout</a>
  </div>

  <!-- Logo added by Shade (Alma) Bauer -->
  <div class="navbar-container">
    <span style="font-size: 30px; cursor: pointer" @click="openNav" class="nav-icon">&#9776;</span>
    <img src="../assets/logo.png" class="navbar-logo" />
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 600;
  top: 0;
  left: 0;
  background: #a479ae;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #f1f1f1;
  display: block;
  transition: 0.3s;
  font-weight: 800;
}

.sidebar a:hover {
  color: black;
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}

.SidebarLogin {
  position: absolute;
  bottom: 10px;
}

.sidebar .material-symbols-outlined {
  position: relative;
  top: 3px;
}

/* Navbar and SidebarLogout style by Shade (Alma) Bauer */
.navbar-container {
  /* background: #a479ae; */
  z-index: 500;
  position: fixed;
  width: 100%;
  height: 45px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: rgba(164, 121, 174, 0.25);
}

.navbar-logo {
  float: right;
  height: 50px;
  width: 90px;
  margin-right: 10px;
}

.nav-icon {
  margin-left: 3px;
}

.SidebarLogout {
  position: absolute;
  bottom: 10px;
}
</style>
