<template>
	<v-layout>
		<v-navigation-drawer>
			<v-list>
				<v-list-item
					prepend-avatar="https://www.addapersonaltouch.co.uk/wp-content/uploads/2020/10/Trusoft-initials.jpg"
					title="Joe O'Brien"
					subtitle="ilovegolf@golf.com"
				></v-list-item>
			</v-list>

			<v-divider></v-divider>

			<!-- TODO: Make links - add package count dynamically from store? -->
			<v-list density="compact">
				<v-list-item
					prepend-icon="mdi-home"
					title="Home"
					value="Home"
					href="/#/"
				></v-list-item>
				<v-list-item
					prepend-icon="mdi-package"
					title="All Packages"
					value="packages"
					href="/#/packages"
				></v-list-item>
				<v-list-item
					prepend-icon="mdi-star"
					:title="`My Packages (${packagesLength})`"
					value="starred"
				></v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main style="height: 250px"> </v-main>
	</v-layout>
</template>

<script>
	import { usePackagesStore } from '../store/counterStore';
	import { defineComponent, computed } from 'vue';
	import { storeToRefs } from 'pinia';

	export default defineComponent({
		setup() {
			const store = usePackagesStore();

			// const selectedPackagesArray = ref([]);

			const { selectedPackages } = storeToRefs(store);
			const { addPackage, removePackage } = store;

			const packagesLength = computed(() => selectedPackages.value.length);

			return {
				selectedPackages,
				addPackage,
				removePackage,
				packagesLength,
			};
		},
	});
</script>

<style scoped></style>
