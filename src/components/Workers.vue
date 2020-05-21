<template>
  <div>
    <div id="contSearch">
      <div class="search">
        <h4>Szukaj pracownika:</h4>

        <input
          type="text"
          v-model="wantedString"
          placeholder="Szukaj pracowników"
        />
      </div>
      <div class="search">
        <h4>Pokaż wybrane działy:</h4>
        <ul>
          <li v-for="dzial in dzialy" :key="dzial">
            <p>{{ dzial }}</p>
            <input type="checkbox" :value="dzial" v-model="wantedDzial" />
          </li>
        </ul>
      </div>
      <div class="search">
        <h4>Wybierz przedział wynagrodzeń:</h4>

        <span>Min.</span>
        <input
          type="number"
          v-model="wantedWynagrodzenieMin"
          placeholder="Minimalne wynagrodzenie"
        />
        <span>Max.</span>
        <input
          type="number"
          v-model="wantedWynagrodzenieMax"
          placeholder="Maksymalne wynagrodzenie"
        />
      </div>
    </div>
    <div id="contTable">
      <br />
      <table>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Dział</th>
          <th>Wynagrodzenie</th>
        </tr>
        <tr
          v-for="worker in filteredWorkers"
          :key="worker.imie + worker.nazwisko"
        >
          <td>{{ worker.imie }}</td>
          <td>{{ worker.nazwisko }}</td>
          <td>{{ worker.dzial }}</td>
          <td>
            {{ worker.wynagrodzenieKwota }} {{ worker.wynagrodzenieWaluta }}
          </td>
        </tr>
      </table>
    </div>
    <div id="contSummary">
      <h4 v-for="dzial in dzialy" :key="dzial">
        Suma wynagrodzeń w dziale {{ dzial }}:
        {{ sumaWynagrodzenDzial(dzial) }} PLN
      </h4>
      <h4>Suma wynagrodzeń: {{ sumaWynagrodzen() }} PLN</h4>
    </div>
  </div>
</template>

<script>
import WorkersService from "@/services/WorkersService.js";
export default {
  data() {
    return {
      workers: [],
      wantedString: "",
      wantedDzial: [],
      wantedWynagrodzenieMin: 0,
      wantedWynagrodzenieMax: 9000,
    };
  },
  computed: {
    dzialy() {
      var s = [];
      for (var w in this.workers) {
        if (!s.includes(this.workers[w].dzial)) {
          s.push(this.workers[w].dzial);
        }
      }
      return s;
    },
    filteredWorkers() {
      return this.workers.filter((worker) => {
        return (
          (worker.imie.toLowerCase().match(this.wantedString.toLowerCase()) ||
            worker.nazwisko
              .toLowerCase()
              .match(this.wantedString.toLowerCase())) &&
          this.wantedDzial.includes(worker.dzial) &&
          parseInt(worker.wynagrodzenieKwota) >= this.wantedWynagrodzenieMin &&
          parseInt(worker.wynagrodzenieKwota) <= this.wantedWynagrodzenieMax
        );
      });
    },
  },
  methods: {
    sumaWynagrodzen() {
      var s = 0;
      for (var w in this.workers) {
        s += parseInt(this.workers[w].wynagrodzenieKwota);
      }
      return s;
    },
    sumaWynagrodzenDzial(dzial) {
      var s = 0;
      for (var w in this.workers) {
        if (this.workers[w].dzial == dzial)
          s += parseInt(this.workers[w].wynagrodzenieKwota);
      }
      return s;
    },
    getData() {
      WorkersService.getWorkers()
        .then((data) => {
          this.workers = data;
          this.setData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setData() {
      this.$forceUpdate();
      this.wantedDzial = this.dzialy;
      this.wantedWynagrodzenieMax = this.sumaWynagrodzen();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table,
th,
td {
  border: 1px solid black;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
div {
  display: flexbox;
}
.search {
  display: inline-grid;
  align-self: start;
}
#contSearch {
  background-color: aquamarine;
}
#contTable {
  background-color: rgb(219, 240, 233);
}
#contSummary {
  background-color: rgb(112, 221, 185);
}
h4 {
  margin: 0;
}

table {
  margin-left: auto;
  margin-right: auto;
  border-block-color: black;
}
</style>
