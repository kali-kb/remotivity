<script setup>

	const emit = defineEmits()


	const props = defineProps({
		currentValue: String
	})


	function emitSearchChange(value) {
	  emit('onInputChange', value)
	}

</script>

<template>
	<div class="nav">
		<div>
			<div>
				<img src="../assets/remotivity-logo.png" id="logo" />
			</div>

			<div>
				<input :value="currentValue" @input="emitSearchChange($event.target.value)" placeholder="Search jobs" type="text" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">

	.nav {
		// border: 1px black solid;

		& > div {
			display: flex;
			margin: 15px;
			width: 50%;
			justify-content: space-around;
			align-items: center;
			@media (max-width: 600px) {
				justify-content: flex-start;
				width:100%;
			}

			#logo {
				// height:34px;
				height: clamp(20px, 4vw, 34px);
			}
			
		}
	}




	input[type="text"] {
		display: flex;
		background-color: #e6e7e8;
		padding: 10px 25px 10px 25px;
		border: none;
		border-radius: 15px;
		align-items: center;
		font-family: "Inter", sans-serif;
		color: #000;
		@media (max-width: 800px) {
			padding: 6px 15px 6px 10px;
			transform: translateX(10px);
		}

	}

	input[type="text"]:focus {
		outline: none;
		border-color: green;
	}

	input[type="text"]::placeholder {
		color: #000;
		font-weight: bold;
	}


	input[type="text"]::after {
	  content: "\f002"; /* Unicode code for desired icon */
	  font-family: "FontAwesome"; /* Font family that contains the icon */
	  position: absolute;
	  top: 50%;
	  right: 10px;
	  transform: translateY(-50%);
	  color: gray; /* Color of the icon */
	}


</style>