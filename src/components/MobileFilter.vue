<!-- mobile version of filter -->

<script setup>
	import Filter from './Filter.vue'
	import {watch, onMounted, toRaw} from 'vue'
	const emit = defineEmits()

	const props = defineProps({
		// show: Boolean,
		state: Object
	})




</script>

<template>
	<dialog id="filter-display" :open="state.mobileFilterUi">
		<Filter 
			:state="state"
			@filterTag="emit('filterTag')"
			@experienceFilter="emit('experienceFilter')"
			@salaryRangeChange="emit('salaryRangeFilter')"
			@filterByCategory="emit('categoryFilter')"
			@clear="emit('clear')"
			@applyFilter="emit('applyFilter')"
		/>
	</dialog>	
</template>

<style lang="scss">
	@import '../assets/mixins.scss';


	#filter-display {

		@media (max-width: 800px) {
			overflow: hidden;
			// display:block;
			background-color: white;
			height: 100vh;
			right:25px;
			width:100%;
			top: 0;
			margin-left: 0px;

			& > div {
				transform: translateX(4%);
			}
		}
	}

	// #filter-display {
	// 	display: none;
	// 	@media (max-width: 800px) {
	// 		overflow: hidden;
	// 		display:block;
	// 		height: 100%;
	// 		width:100%;
	// 		margin-left: 0px;
	// 	}

	// }
</style>