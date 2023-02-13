<template>
	<div>{{ name }} {{ doubleCount }} {{ doubleNumber }} {{ doubleValue }}</div>
	<button @click="increment">Increment Pinia store</button>
	<input type="text" v-model="nameModel" />
	<button @click="() => updateName(nameModel)">Update name</button>
	<div :key="name">Pinia store name: {{ name }}</div>
	<div>Name model: {{ nameModel }}</div>
</template>

<script>
	import { useCounterStore } from '../store/counterStore';
	import { defineComponent, ref } from 'vue';
	import { storeToRefs } from 'pinia';

	export default defineComponent({
		name: 'PiniaTest',
		setup() {
			const store = useCounterStore();

			const { name, doubleCount, doubleNumber, doubleValue } = storeToRefs(store);
			const { increment, updateName } = store;

			const nameModel = ref('');

			return {
				name,
				doubleCount,
				doubleNumber,
				doubleValue,
				increment,
				updateName,
				nameModel,
			};
		},
	});
</script>
