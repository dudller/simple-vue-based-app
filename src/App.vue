<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Pracownicy</router-link>|
      <router-link to="/add">Dodaj pracownika</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #16202b;
  background-color: rgb(40, 145, 110);
  height: auto;
  width: auto;
}

#nav {
  padding: 30px;
  background-color: rgb(210, 235, 226);
}

#nav a {
  font-weight: bold;
  color: #1183e0b7;
}

#nav a.router-link-exact-active {
  color: #304063;
}
</style>
