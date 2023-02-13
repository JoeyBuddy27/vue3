import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
	const count = ref(0);

	let name = ref('Eduardo');

	const doubleCount = computed(() => count.value * 2);

	function increment() {
		count.value++;
	}

	function updateName(newName) {
		name.value = newName;
	}

	return { count, name, doubleCount, increment, updateName };
});
