<template>
  <div class="hide-defs-toggle">
    <b-button
      variant="unstyled"
      size="sm"
      @click="hideDefinitions = !hideDefinitions"
      class="mr-2"
    >
      <i class="far fa-eye-slash" v-if="hideDefinitions"></i>
      <i class="far fa-eye" v-else></i>
      <span class="ml-1">Definitions</span>
    </b-button>
    <b-button
      variant="unstyled"
      size="sm"
      @click="hidePhonetics = !hidePhonetics"
    >
      <i class="far fa-eye-slash" v-if="hidePhonetics"></i>
      <i class="far fa-eye" v-else></i>
      <span class="ml-1">Phonetics</span>
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideDefinitions: false,
      hidePhonetics: false,
    };
  },
  watch: {
    hideDefinitions() {
      this.$store.commit("settings/SET_HIDE_DEFINITIONS", this.hideDefinitions);
      this.$emit("hideDefinitions", this.hideDefinitions);
    },
    hidePhonetics() {
      this.$store.commit("settings/SET_HIDE_PHONETICS", this.hidePhonetics);
      this.$emit("hidePhonetics", this.hidePhonetics);
    },
  },
  mounted() {
    if (typeof this.$store.state.settings !== "undefined") {
      this.hideDefinitions = this.$store.state.settings.hideDefinitions;
      this.hidePhonetics = this.$store.state.settings.hidePhonetics;
    }
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "settings/LOAD_SETTINGS") {
        this.hideDefinitions = this.$store.state.settings.hideDefinitions;
        this.hidePhonetics = this.$store.state.settings.hidePhonetics;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.hide-defs-toggle {
  button {
    font-size: 0.8em;
    color: #666;
    padding: 0;
  }
}
</style>