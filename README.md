# iStudyMaps

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### CORS

Delete and Patch request to the api may not be called due to cors problem (see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS ). Hence we use vite server proxy and redirect everything with /api to https://retoolapi.dev/gaNPMO/istudymap -- this is used in SideBar.vue, CountdownTimer.vue
