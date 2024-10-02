<script setup>
import menuIcon from "@/assets/Icons/bars-regular.svg";
import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped></style>

<template>
  <nav>
    <div>
      <RouterLink>Fire Blogs</RouterLink>
    </div>
    <div>
      <ul>
        <RouterLink>Home</RouterLink>
        <RouterLink>Blogs</RouterLink>
        <RouterLink>Create Post</RouterLink>
        <RouterLink>Login/Register</RouterLink>
      </ul>
    </div>
  </nav>
  <Transition name="mobile-nav">
    <ul>
      <RouterLink class="link" to="#">Home</RouterLink>
      <RouterLink class="link" to="#">Blogs</RouterLink>
      <RouterLink class="link" to="#">Create Post</RouterLink>
      <RouterLink class="link" to="#">Login/Register</RouterLink>
    </ul>
  </Transition>
</template>
