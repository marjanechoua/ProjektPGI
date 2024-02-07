<!-- Done by Alekssann Bedur -->
<script>
export default {
  name: 'AppFooter'
}
</script>

<template>
  <div id="AppFooter">
    <div class="footer-links">
      <a href="https://h-da.de/"
        ><span class="material-symbols-outlined">school</span> Offiziele Website der H_da </a
      ><br />
      <a href="https://www2.h-da.de/imap/index.html#coord=16/49.867352/8.637242"
        ><span class="material-symbols-outlined">map</span> Interaktiver Lageplan der H_da</a
      ><br />
      <a href="/#MotivationSection"><span class="material-symbols-outlined">group</span> About Us</a
      ><br />
    </div>
  </div>
</template>

<style scoped>
#AppFooter {
  border-top: 0.5px solid grey;
  margin-top: 50px;
  padding: 25px 25px 0px 25px;
  background-color: rgba(164, 121, 174, 0.25);
}
.studymaps-logo {
  height: 80px;
  width: 100px;
  margin-right: 10px;
  padding-bottom: 0px;
  position: relative;
  bottom: 20px;
  left: 120px;
}

.footer-links {
  width: 100%;
}

.footer-links a {
  padding: 1px 1px 0px 32px;
  text-decoration: none;
  font-size: 15px;
  color: #a479ae;
  display: block;
}

.footer-links a:hover {
  color: black;
  font-weight: bold;
}

.material-symbols-outlined {
  position: relative;
  top: 5px;
}
</style>
