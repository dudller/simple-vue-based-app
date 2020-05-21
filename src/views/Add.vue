<template>
  <div class="home">
    <AddWorker />
  </div>
</template>

<script>
// @ is an alias to /src
import AddWorker from "@/components/AddWorker.vue";

export default {
  name: "Add",
  components: {
    AddWorker,
  },
};
</script>
<style scoped>
div {
  background-color: rgb(123, 243, 203);
}
</style>
