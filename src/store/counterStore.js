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

export const usePackagesStore = defineStore('packages', () => {
	// packagesUID
	const selectedPackages = ref([]);

	function setPackages(newPackages) {
		selectedPackages.value = newPackages;
	}

	function addPackage(newPackage) {
		selectedPackages.value.push(newPackage);
	}

	function removePackage(packageUID) {
		console.log('remove package', packageUID);
		// TODO: Edit logic depending on obj structure
		selectedPackages.value = selectedPackages.value.filter(
			pkg => pkg.uid !== packageUID,
		);
	}

	return { selectedPackages, addPackage, removePackage, setPackages };
});
