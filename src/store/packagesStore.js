import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePackagesStore = defineStore('packages', () => {
	const selectedPackages = ref([]);

	function setPackages(newPackages) {
		selectedPackages.value = newPackages;
	}

	function addPackage(newPackage) {
		selectedPackages.value.push(newPackage);
	}

	function removePackage(packageUID) {
		selectedPackages.value = selectedPackages.value.filter(
			pkg => pkg.uid !== packageUID,
		);
	}

	return { selectedPackages, addPackage, removePackage, setPackages };
});
