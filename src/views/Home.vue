<script setup>

	import NavBar from '../components/NavBar.vue'
	import Filter from '../components/Filter.vue'
	import JobCard from '../components/JobCard.vue'
	import FilterIcon from '../icons/FilterIcon.vue'
	import MobileFilter from '../components/MobileFilter.vue'
	import animationJson from '../assets/loading.json'
	import { Vue3Lottie } from 'vue3-lottie'
	import {onMounted, reactive, watch, computed} from 'vue'
	import { 
		developerTitles,
  		designerTitles,
  		marketerTitles,
  		financeAndAccountingTitles
  } from '../utils/title-keywords.js'

	const uiState = reactive({
		loaded: false,
		filters: [],
		isWideScreen: false,
		mobileFilterUi: false
	})


	const dataState = reactive({
		jobs: [],
		previousJobsCopy: [],
		searchText: '',
	})

	const changeText = (value) => {
		dataState.searchText = value
	}


	const getJobs = async() => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}`)
		    const data = await response.json()
			dataState.jobs = [...data.jobs]
			dataState.previousJobsCopy = [...data.jobs]
			uiState.loaded = true
		}
		catch(exception){
			console.log("Something went wrong: ", exception)
		}
	}

	const filterTagHandler = () => {
		console.log("clicked")
		const filteredJobs = dataState.jobs.filter(job => {
	      return job.minSalary > 100000;
	    })
		uiState.filters.push('top-paying')
		console.log(uiState.filters)
	    dataState.jobs = filteredJobs
	}

	const salaryRangeFilter = (range) => {
		dataState.jobs = [...dataState.previousJobsCopy] //to make sure im applying filters on the total job list and not from a filtered list 
		const minimumSalary = range[0] * 1000
		const maximumSalary = (range[1] == 100) ? range[1] * 10000 : range[1] * 1000 //assuming no company pays more than $1m per year
		const filtered = dataState.jobs.filter(job => job.minSalary > minimumSalary && job.maxSalary < maximumSalary)
		uiState.loaded = false
		setTimeout(() => {
			dataState.jobs = filtered
			uiState.loaded = true
		}, 300)
	}

	const categoryFilter = (category) => {
		const filteredJobs = dataState.jobs.filter(job => {
			const jobTitle = job.title.toLowerCase();
			switch (category.toLowerCase()) {
				case "development":
					return developerTitles.some(keyword => jobTitle.includes(keyword.toLowerCase()));
				case "design":
					return designerTitles.some(keyword => jobTitle.includes(keyword.toLowerCase()));
				case "marketing":
					return marketerTitles.some(keyword => jobTitle.includes(keyword.toLowerCase()));
				case "finance":
					return financeAndAccountingTitles.some(keyword => jobTitle.includes(keyword.toLowerCase()));
			}

			// if(category.toLowerCase() == "development"){

			// }
		});
		dataState.jobs = filteredJobs

	}

	const handleResize = () => {
	  uiState.isWideScreen = window.innerWidth > 800;
	};



	const experienceFilter = (level) => {
		dataState.jobs = dataState.previousJobsCopy //to make sure im applying filters on the total job list and not from a filtered list 
	  	const filteredJobs = dataState.jobs.filter(job => {
		    const {seniority} = job
		    if (Array.isArray(seniority)) {
		      return seniority.some(s => level.includes(s)) 
		    } else {
		      return level.includes(seniority)
		    }
	  	})
	  	dataState.jobs = filteredJobs
	}

	const updateMobileFilter = () => {
		uiState.mobileFilterUi = !uiState.mobileFilterUi
	}

	const clear = () => {
		uiState.filters = []
		getJobs() 
	}

	defineExpose({
		uiState
	})


	// ** lifecycle handlers ** //

	onMounted(() => {
		getJobs()
		handleResize();
		window.addEventListener('resize', handleResize);
	})

	watch(() => uiState.mobileFilterUi, (newVal, oldVal) => {
		console.log("mobileFilterUi updated", `old ${oldVal} new ${newVal}`)
	} )




	watch( () => dataState.searchText, (newVal) => {
	  	if(newVal == '') {
	  		getJobs()
	  	}
	    const filteredJobs = dataState.jobs.filter(job => {
	      return job.title.includes(newVal)
	    })
	    
	    dataState.jobs = filteredJobs
	  }
	)



</script>

<template>
	<NavBar :currentValue="dataState.searchText" @onInputChange="changeText" />
	<!-- 	
		<MobileFilter 
		:state="uiState"
		@filterTag="filterTagHandler"
		@applyFilter="updateMobileFilter"
		@experienceFilter="experienceFilter"
		@salaryRangeChange="salaryRangeFilter"
		@filterByCategory="categoryFilter"
		@clear="clear"
	/> -->
	<div class="main-content">
		<div v-if="uiState.isWideScreen">
			<Filter
				:state="uiState"
				@filterTag="filterTagHandler"
				@experienceFilter="experienceFilter"
				@salaryRangeChange="salaryRangeFilter"
				@filterByCategory="categoryFilter"
				@clear="clear"
			/>
		</div>
		<div v-else></div>
		<div>
			<!-- 
				<div @click="uiState.mobileFilterUi=true" class="filter-toggle mobile">
					<p>Filter</p>
					<FilterIcon />
				</div>
			 -->
			<div>
				<p>
					<span style="padding-right:5px; color:gray">
						Showing
					</span>
					<span style="font-weight: bold;">
						{{ dataState.jobs.length}}
					</span>
					<span  style="padding-left:5px; color:gray">
						Jobs
					</span>
				</p>
			</div>
			<div v-if="uiState.loaded" id="job-list">
				<JobCard v-for="job in dataState.jobs" :key="job" :job="job"/>
			</div>

			<div v-else style="transform:translateY(100%)">
				<div>
					<Vue3Lottie :animationData="animationJson" :height="120" :width="120" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@import '../assets/mixins.scss';


	::-webkit-scrollbar {
	  width: 3px;
	}

	::-webkit-scrollbar-track {
	  background-color: #fff;
	}

	::-webkit-scrollbar-thumb {
	  background-color: lightgreen;
}


	.filter-toggle.mobile {
		display: none;

	}

	@media (max-width: 800px) {

		.filter-toggle.mobile {
			@include flexer;
			border: 1px solid gray;
			justify-content: space-between;
			border-radius: 8px;

			& > * {
				margin:5px;
			}

			&:active {
				border: 1px green solid;
			}
		
		}


		.main-content > div:first-child {
			display: none;

			#job-list {
				width:100%;

			}
		}
	}

	.main-content {
		margin-top: 30px;
		display: flex;
		justify-content: center;
		height:85vh;
		overflow: hidden;


		#job-list {
			overflow: hidden;

			& > div {
				margin-top: 10px;
				margin-bottom: 10px;
			}
		}

		& > div:nth-child(2) {
			width: 63%;
			margin-left: 35px;
			overflow-y: scroll;
			overflow-x: hidden;

		    scrollbar-width: thin; /* Set the width of the scrollbar */
		 	scrollbar-color: lightgreen #fff;

			@media (max-width: 800px) {
				width:100%;
				margin-left: 0px;
			}

		} 


	}

</style>