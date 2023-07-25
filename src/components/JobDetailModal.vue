<script setup>

	import formatSalary  from '../utils/common-functions.js'
	import dayjs from 'dayjs'
	import relativeTime from 'dayjs/plugin/relativeTime'
	import MoneyIcon from '../icons/MoneyIcon.vue'
	import ExternalLinkIcon from '../icons/ExternalLinkIcon.vue'

	const emit = defineEmits()

	const props = defineProps({
		job: Object,
		visible: Boolean
	})


</script>


<template>
	<dialog :open="visible">
 		<div id="dialog-header">
	    	<p>Details</p>
			<button @click="emit('toggleVisible')">
	      			Close
		    </button>
 		</div>

 		<div id="details">
	 		<div id="company-info">
				<div>
					<div class="img-container">
						<img :src="`${job.companyLogo}`" />
					</div>
					<div>
						<p>{{job.companyName}}</p>
					</div>
				</div>
				<button>
					<ExternalLinkIcon />
					<a :href="`${job.guid}`">Application Link</a>
				</button>
	 		</div>
	 		<div id="job-detail">
	 			<p>{{job.title}}</p>
	 		</div>
	 		<div class="tags">
				<div v-if="job.minSalary && job.maxSalary" class="salary-tag">
					<MoneyIcon />
					<span >${{formatSalary(Math.floor(job.minSalary))}}-{{formatSalary(Math.floor(job.maxSalary))}}</span>
				</div>
	 		</div>
	 		<div>
	 			<p>Job Description</p>
	 			<div id="description" v-html="`${job.description}`"></div>
	 		</div>
 		</div>
	</dialog>
</template>

<style lang="scss">
@import '../assets/mixins.scss';

/**
#description {
	height: 12rem;
	overflow-y:scroll;
	overflow-x: hidden;
}
**/

.tags {
	@include flexer;
	justify-content: flex-start;
}

.salary-tag {
	@include tag-style;
	@include flexer;
	background-color: #cafce2;
	color: #0FA958 ;
}

#details {
	padding-left: 10px;
}

#company-info {
	@include flexer;
	justify-content: space-between;
	p {
		font-size: 25px;
		font-weight: bold;
	}

	& > div:first-child {
		@include flexer;
	}



	button {
		@include flexer;
		font-size: 15px;
		font-weight: bold;
		background-color: #0FA958;
		padding: 10px 2px 10px 2px;
		font-family: 'Inter', sans-serif;
		border: none;
		align-items: center;
		border-radius: 5px;
		& > * {
			margin-left: 5px;
			margin-right: 5px;
			color:white;
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
	}

	@media (max-width: 600px) {
		flex-direction: column;
		justify-content: space-around;
		align-items: start;
		top: 0;

		& > div {
			margin-top: 10px;
			margin-bottom: 10px;
		}
	}


}

#job-detail {
	p {
		font-size: 20px;
	}
}

.img-container {
	height: 120px;
	width: 120px;
	border-radius: 10px;
	margin-right: 10px;
	overflow: hidden;

	& > img {
		height:100%;
		width:100%;
		object-fit: cover;
	}
}


dialog {
	width: 98%;
	height: 100%;
	background-color: white;
	color:black;
	// border: 1px lightgray solid;
	border: none;
	transition: 200ms all linear;
	// border-radius: 10px;
	top:3%;

	#dialog-header {
		@include flexer;
		justify-content: space-between;
		margin: 10px;

		& > button {
			background: none;
			border: none;
			color: green;
			font-family: 'Inter', sans-serif;
			font-size: 18px;

			&:hover {
				background-color: #e1ffdb;
				padding: 2px 6px 2px 6px;
				border-radius: 10px;
			}
		}
	}
}


</style>