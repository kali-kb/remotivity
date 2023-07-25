<script setup>
import RangeSlider from '../components/RangeSlider.vue'
import { ref, onMounted, watch } from 'vue'



const emit = defineEmits()

const selectedLevels = ref([])

const props = defineProps({
	state: Object
}) 


// const checkboxes = ref([])


// Example usage:






const onChecked = (event) => {
	const item = event.target.value
	if(selectedLevels.value.includes(item)){
		const newValues = selectedLevels.value.filter(level => level != item)
		console.log(newValues)
		selectedLevels.value = newValues
	}
	else{
		selectedLevels.value.push(item)
	}
	console.log(selectedLevels.value)
}




//** lifecycles **//


const categories = ["Development", "Design", "Marketing", "Finance"]


watch(selectedLevels, (newValue) => {
  emit("experienceFilter", newValue)
}, {deep:true})




//** emits **//

const handleEmit = () => { emit("filterTag") }

const forwardChildEvent = (payload) => {
	console.log("forwared")
	emit('salaryRangeChange', payload)
}

const handleClear = () => {
	const checkboxes = document.querySelectorAll('.cb')
	checkboxes.forEach(checkbox => {
	    checkbox.checked = false
	})
	emit("clear")
	console.log("unchecked")
}



</script>


<template>
	<div class="filter-box">
		<div>
			<div id="top">
				<span class="title">Filter</span>
				<button @click="handleClear">Reset</button>
			</div>

			<div id="tags">
				<div v-if="state.filters.includes('top-paying')" class="selected">
					<span>Top-paying</span>
				</div>
				<div v-else @click="handleEmit">
					<span>Top-paying</span>
				</div>
				<!--
				<div>
					<span>Remote</span>
				</div>
				!-->
			</div>

			<div>
				<p class="title">Experience Level</p>
				<div id="checkboxes">
					<div>
						<input @change="onChecked" value="Entry-level" id="checkbox1" class="cb" type="checkbox" />
						<label for="checkbox1" style="padding-right: 10px;">Entry-level</label>
					</div>
					<div>
						<input @change="onChecked" value="Mid-level" id="checkbox2" class="cb" type="checkbox" />
						<label for="checkbox2">Mid-level</label>
					</div>
					<div>
						<input @change="onChecked" value="Senior" id="checkbox3" class="cb" type="checkbox" />
						<label for="checkbox3">Senior</label>
					</div>
				</div>
			</div>

			<div>
				<p class="title">Salary Range</p>
				<RangeSlider :state="state" @salaryRange="forwardChildEvent" />
			</div>

			<div>
				<p class="title">Job Categories</p>
				<div id="checkboxes-2">
					<div v-for="(category, index) in categories" :key="index">
						<input @change="emit('filterByCategory', category)" :id="`checkbox${index+4}`" class="cb" type="checkbox" />
						<label :for="`checkbox${index+4}`" style="padding-right: 10px;">{{category}}</label>
					</div>
				</div>
			</div>
			<button @click="emit('applyFilter')" class="button-mobile">Apply</button>
		</div>
	</div>
</template>

<style lang="scss">

	@import '../assets/mixins.scss';

	.button-mobile {
		display:none;
		background-color: #0FA958;
		border:none;
		width:100%;
		font-weight: bold;
		padding-top: 8px;
		padding-bottom: 8px;
		border-radius: 5px;
		margin-top:15px;
		margin-bottom: 5px;

		@media (max-width: 800px) {
			display:block;
		}

	}


	.title {
		font-weight: bold;
	}

	.filter-box {
		border: 1px lightgray solid;
		width: 300px;
		border-radius: 10px;

		& > div {
			margin: 15px;
		}

		#top {
			display: flex;
			justify-content: space-between;
			// margin: 0 20px 0 20px;

			button {
				background-color: #f7bebe;
				padding: 2px 8px 2px 8px;
				font-weight: bold;
				color: #f70202;
				border: none;
				border-radius: 5px;
				font-family: "Inter", sans-serif;
				letter-spacing: 0.5px;

				&:hover {
					background-color: #f70202;
					color: #fff;
					transition-duration: 200ms;
				}
			
			}	

		}

		@media (max-width: 800px) {
			width: 95%;
		}

	}

	#tags {
		display: flex;

		& > div {
			margin: 15px 15px 15px 0;
			border: 1px lightgray solid;
			padding: 3px 8px 3px 8px;
			border-radius: 8px;

			&:hover {
				border: 1px green solid;
				transition-duration: 200ms;
			}
		}

		.selected {
			background-color: #0FA958;
			color: #fff;
			border:none;

			&:hover {
				border:none;
			}
		}

	}


	#checkboxes {
		display:flex;
		flex-wrap: wrap;

		@include checkbox-styles;

		
	}

	#checkboxes-2 {
		@include checkbox-styles;
	}


</style>