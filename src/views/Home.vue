<template>
  <div class="home">
    <Workers />
  </div>
</template>

<script>
// @ is an alias to /src
import Workers from "@/components/Workers.vue";

export default {
  name: "Home",
  components: {
    Workers,
  },
};
</script>
