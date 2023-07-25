<script setup>
  // import PrimeVue from "primevue/config";
  import { ref, watch, toRaw } from 'vue';

  const props = defineProps(['state'])

  const emit = defineEmits()

  const value = ref([10, 100]);


  watch(props.state, (newValue, oldValue) => {
    // console.log("filters:", toRaw(newValue))
    if(newValue != oldValue && toRaw(newValue.filters) == []){
      value.value = [10, 100]
    }
    else{
      void(0)
    }
  })

  watch(value, (newValue) => {
    console.log("changed")
    emit('salaryRange', newValue)
  }, {deep: true})

</script>


<template>
  <div style="width:95%" class="card flex justify-content-center">
    <Slider v-model="value" range class="w-13rem" />
    <div class="range-amount">
      <div>
        <span>Min: ${{value[0]}}k</span>
      </div>
      <div>
        <span>Max: ${{(value[1] == 100) ? `${value[1]}k+`: `${value[1]}k` }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.range-amount {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  & > div {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 3px 6px 3px 6px;
  }
}

</style>
