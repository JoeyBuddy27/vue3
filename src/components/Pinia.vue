<template>
	<div>{{ doubleCount }}</div>
	<div style="margin-bottom: 20px">
		<button @click="increment">Increment Pinia store</button>
	</div>
	<div style="margin-bottom: 20px">
		<input type="text" v-model="nameModel" />
	</div>
	<button @click="() => updateName(nameModel)">Update name</button>
	<div style="margin-top: 20px" :key="name">Pinia store name: {{ name }}</div>
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
