<template>
  <div class="app-container">
    <sidebar>
      <div class="filters">
        <dim-filter type="country" />
        <dim-filter type="gender" />
      </div>
      <stores-list />
    </sidebar>
    <map-loader :map-config="mapConfig" :apiKey="apiKey">
      <template slot-scope="scopeProps">
        <my-position :google="scopeProps.google" :map="scopeProps.map" />
        <markers :google="scopeProps.google" :map="scopeProps.map" />
      </template>
    </map-loader>
  </div>
</template>

<script>
import { pathOr, when, identity, pipe, split, last } from "ramda";
import { mapActions } from "vuex";
import MapLoader from "./MapLoader.vue";
import MyPosition from "./MyPosition.vue";
import Markers from "./Markers.vue";
import Sidebar from "./Sidebar.vue";
import StoresList from "./StoresList.vue";
import DimFilter from "./DimFilter.vue";
import { mapConfig, apiKey } from "@/conf.js";

export default {
  data() {
    return {
      mapConfig: mapConfig,
      apiKey: apiKey
    };
  },
  mounted() {
    const getStoreId = pipe(
      pathOr(0, ["params", "store"]),
      when(
        identity,
        pipe(
          split("-"),
          last
        )
      )
    );
    const id = getStoreId(this.$route);
    if (id) {
      this.selectStore(id);
    }
  },
  created() {
    this.getAllStores();
  },
  methods: {
    ...mapActions("stores", ["selectStore", "getAllStores"])
  },
  components: {
    MapLoader,
    Sidebar,
    StoresList,
    MyPosition,
    Markers,
    DimFilter
  }
};
</script>
