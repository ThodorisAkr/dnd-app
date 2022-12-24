<script setup>
import CONFIG from "@/common/config.js";

const routes = CONFIG.routes;
</script>

<template>
  <nav role="navigation">
    <div id="menuToggle">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <ul id="menu">
        <li v-for="(route, idx) in routes" :key="idx">
          <RouterLink
            :key="route.to.name"
            :to="route.to"
            :data-testid="route.title"
          >
            {{ route.title }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #1e1e23;
  opacity: 1;
  font-size: 1.5em;
  font-weight: 400;
  transition: 200ms;
}
a:hover {
  opacity: 0.5;
}
ul {
  padding: 0;
  list-style-type: none;
}

#menuToggle {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 20;
  -webkit-user-select: none;
  user-select: none;
}

#menuToggle input {
  display: flex;
  width: 40px;
  height: 32px;
  position: absolute;
  top: 1.2rem;
  left: 1.5rem;
  cursor: pointer;
  opacity: 0;
  z-index: 50;
}

#menuToggle span {
  display: flex;
  width: 29px;
  height: 2px;
  margin-bottom: 5px;
  position: relative;
  top: 1.5rem;
  left: 2rem;
  background: #ffffff;
  border-radius: 3px;
  z-index: 40;
  transform-origin: 5px 0px;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
}

#menuToggle span:first-child {
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2) {
  transform-origin: 0% 100%;
}

#menuToggle input:checked ~ span {
  opacity: 1;
  transform: rotate(45deg) translate(-3px, -1px);
  background: #36383f;
}
#menuToggle input:checked ~ span:nth-last-child(3) {
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle input:checked ~ span:nth-last-child(2) {
  transform: rotate(-45deg) translate(0, -1px);
}

#menu {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 20;
  padding-top: 3rem;
  padding-left: 1rem;
  left: 0;
  right: 0;

  transform: translate(-100%, 0);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

#menu li {
  padding: 10px 0;
  transition-delay: 2s;
}

#menuToggle input:checked ~ ul {
  transform: translate(0, 0);
}
</style>
