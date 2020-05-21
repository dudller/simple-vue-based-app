<template>
  <div>
    <p>Imie</p>
    <input type="text" placeholder="Imie" v-model="worker.imie" />
    <p>Nazwisko</p>
    <input type="text" placeholder="Nazwisko" v-model="worker.nazwisko" />
    <p>Dział</p>
    <input type="text" placeholder="Dział" v-model="worker.dzial" />
    <p>Wynagrodzenie</p>
    <input type="number" v-model="worker.wynagrodzenieKwota" />
    <span>PLN</span>
    <br />
    <input id="add" type="button" @click="add" value="Dodaj pracownika" />
    <div class="allert">{{ allert }}</div>
  </div>
</template>

<script>
import WorkersService from "@/services/WorkersService.js";
export default {
  data() {
    return {
      worker: {
        imie: "",
        nazwisko: "",
        dzial: "",
        wynagrodzenieKwota: "",
        wynagrodzenieWaluta: "PLN",
      },
      allert: "",
    };
  },
  methods: {
    add() {
      if (
        this.worker.imie != "" &&
        this.worker.nazwisko != "" &&
        this.worker.dzial != "" &&
        this.worker.wynagrodzenieKwota != ""
      ) {
        WorkersService.postWorker(this.worker);
        this.allert = "Dodano pracownika";
        this.clearData();
      } else this.allert = "Wypełnij wszystkie pola";
    },
    clearData() {
      this.worker.imie = "";
      this.worker.nazwisko = "";
      this.worker.dzial = "";
      this.worker.wynagrodzenieKwota = "";
      this.worker.wynagrodzenieWaluta = "PLN";
    },
  },
};
</script>

<style scoped>
#add {
  margin-top: 10px;
}
</style>
