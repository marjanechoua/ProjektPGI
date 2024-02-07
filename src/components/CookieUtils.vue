<script>
export default {
  name: 'CookieUtils',
  methods: {
    createCookie: (name, value, minutes) => {
      let expires = ''
      const date = new Date()
      date.setTime(date.getTime() + minutes * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
      document.cookie = name + '=' + value + expires + '; path=/'
    },
    readCookie: (name) => {
      name += '='
      const decodedCookie = decodeURIComponent(document.cookie)
      const cookieArray = decodedCookie.split(';')
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i]
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1)
        }
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length)
        }
      }
      return null
    },
    updateCookie: (name, value, minutes) => {
      this.createCookie(name, value, minutes)
    },
    deleteCookie: (name) => {
      this.createCookie(name, '', -1)
    }
  }
}
</script>

<!-- Empty <template> to fix console Error: "Component is missing template or render function."-->
<template>
  <div></div>
</template>
