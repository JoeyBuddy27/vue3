<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<div>{{ count }} {{ msg }} {{ computedText }}</div>
		<div>{{ storeCountPlusOne }}</div>
		<div>
			<button @click="incrementStoreCount">Increment</button>
		</div>
	</div>
</template>

<script>
	import { computed } from '@vue/runtime-core';
	import { useStore } from 'vuex';

	export default {
		name: 'HelloWorld',
		props: {
			msg: String,
		},
		setup(props) {
			const store = useStore();
			console.log(props);

			const count = computed(() => {
				return store.state.count;
			});

			const computedText = computed(() => {
				return `${props.msg} innit`;
			});

			const storeCountPlusOne = computed(() => {
				return count.value + 1;
			});

			const incrementStoreCount = () => {
				store.commit('increment');
			};

			return { count, computedText, storeCountPlusOne, incrementStoreCount };
		},
	};
</script>

<style scoped>
	h3 {
		margin: 40px 0 0;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
</style>
