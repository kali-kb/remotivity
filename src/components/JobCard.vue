<script setup>

	import dayjs from 'dayjs'
	import MoneyIcon from "../icons/MoneyIcon.vue"
	import LocationIcon from '../icons/LocationIcon.vue'
	import relativeTime from 'dayjs/plugin/relativeTime'
	import DetailModal from './JobDetailModal.vue'
	import formatSalary from '../utils/common-functions.js'
	import '../assets/mixins.scss'
	import { ref } from 'vue'



	const props = defineProps({
		job: Object
	})

	const visible = ref(false)


	dayjs.extend(relativeTime)


	function truncate(str, maxLength) {
	  if (str.length > maxLength) {
	    return str.slice(0, maxLength) + '...'
	  } else {
	    return str
	  }
	}





</script>

<template>
	<DetailModal :job="job" :visible="visible" @toggleVisible="visible=false" />
	<div class="job-card">
		<div class="left-content">
			<div class="top-content">
				<div class="img-container">
					<img :src="`${job.companyLogo}`" />
				</div>

				<div id="job-info">
					<p @click="visible = true">{{truncate(job.title, 40)}}</p>
					<p>{{job.companyName}}</p>
					<div>
						<div v-if="job.minSalary && job.maxSalary" class="salary-tag">
							<MoneyIcon />
							<span >${{formatSalary(Math.floor(job.minSalary))}}-{{formatSalary(Math.floor(job.maxSalary))}}</span>
						</div>

						<div v-for="seniority in job.seniority.slice(0,2)" :key="seniority" class="difficulty">
							<span>{{seniority}}</span>
						</div>
					</div>
				</div>
			</div>

			
			<div id="tags">
				<div v-for="(location, index) in job.locationRestrictions.slice(0, 2)" class="location-tag" :key="index">
				  <LocationIcon />
				  <span>{{ location }}</span>  
				</div>

				<div v-if="job.locationRestrictions.length > 2">
				  + {{ job.locationRestrictions.length - 2 }} more
				</div>
			</div>
		</div>

		<div class="right-content">
			<p>{{dayjs.unix(job.pubDate).fromNow(true)}}</p>
		</div>
	</div>
</template>

<style lang="scss">
@import '../assets/mixins.scss';

/**
@mixin tag-style {
	padding: 2px 6px 2px 6px;
	border-radius: 5px;
	font-weight: bold;

	@media (max-width: 800px) {
		width:5rem;
	}
}

@mixin flexer {
	display: flex;
	align-items: center;
	justify-content: center;
}
**/

#job-info {
	margin-left:20px;

	p:first-child {
		// font-size: 20px;
		font-size: clamp(5px, 4vw, 20px);
		&:hover {
			text-decoration: underline;
			transition-duration: 200ms;
		}
	}

	p:nth-child(2) {
		font-size:14px;
		font-weight: bold;
	}

	& > div {
		display: flex;

		.salary-tag {
			@include tag-style;
			@include flexer;
			background-color: #cafce2;
			color: #0FA958 ;
		}

		.difficulty {
			@include tag-style;
			background-color: transparent;
			border: 2px green solid;
			margin: 0 6px 0 6px;
			color: #0FA958 ;
		}

	}


}

#tags {
	display:flex;
	// margin-top: 20px;
	// margin-bottom: 20px;

	div {
		margin-left: 10px;
		margin-right: 10px;
		padding: 5px 12px 5px 12px;
		border-radius: 5px;
		font-weight:bold;
	}

	.location-tag {
		@include flexer;
		background-color: #dfd9ff;
		color: #5a3bf5;
		border: none;

		&:hover {
			border:none
		}
	}

	.type {
		background-color: #faeacf;
		color: #f59c07;
	}
}

.right-content {
	display: flex;
	flex-grow: 1;
	align-items: center;
	justify-content: center;
}

.left-content {
	// background-color: green;
	margin:0 6px 0 6px;
	width: 80%;
}

.job-card {
	display: flex;
	flex-direction: row;
	border: 1px lightgray solid;
	border-radius: 10px; 
	width: 85%;
	&:hover {
		border: 1px green solid;
		transition-duration: 500ms;
	}
}

.top-content {
	display: flex;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 20px;
	height:120px;

	& > .img-container {
		overflow: hidden;
		height: 90%;
		margin-top:10px;
		margin-left:8px;
		border-radius: 10px;
	}

}

img {
	height:100%;
	width:100%;
	object-fit:cover;
}


@media (max-width: 600px) {

	// .top-content {
	// 	// flex-direction: column;
	// }

	.job-card {
		flex-direction: column;
		width: auto;
	}

	.right-content {
		align-items: start;
		justify-content: start;
		padding: 0 0 0 14px;
	}

	.left-content {
		width: 100%;
	}

}




</style>