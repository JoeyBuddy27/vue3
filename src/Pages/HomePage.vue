<template>
	<!-- TODO: Create package tile component -->
	<!-- map through  -->
	<v-container>
		<v-row class="ma-2">
			<v-col cols="12">
				<div class="text-h2">My Golfbreaks</div>
			</v-col>
			<v-col v-if="selectedPackages.length" cols="12">
				<div class="text-subtitle-1">My selected packages</div>
			</v-col>
		</v-row>
		<v-row class="pt-4">
			<!-- Map through -->
			<!-- <div v-if="selectedPackages.length"> -->
			<v-col
				v-for="tile in selectedPackages"
				:key="tile.uid"
				cols="12"
				sm="6"
				md="4"
				lg="3"
			>
				<PackageTile
					:title="tile.title"
					:description="tile.description"
					:subtitle="tile.subtitle"
					:imageUrl="tile.imageUrl"
					:uid="tile.uid"
					@remove-package="uid => removePackage(uid)"
				/>
			</v-col>
			<!-- </div> -->
			<div v-if="selectedPackages.length === 0">
				<v-col cols="12">
					<div class="text-subtitle-1 mb-5">No packages selected</div>
					<v-btn color="green-darken-2" href="/#/packages"
						>See available packages
					</v-btn>
				</v-col>
			</div>
		</v-row>
	</v-container>
</template>

<script>
	import PackageTile from '@/components/PackageTile.vue';

	// TODO - fetch packages (array of UIDs)
	// Then call CS API to get package details

	import { usePackagesStore } from '../store/counterStore';
	import { defineComponent, onBeforeMount } from 'vue';
	import { storeToRefs } from 'pinia';
	import { mockPackagesData } from '../mockPackagesData';

	export default defineComponent({
		name: 'HomePage',
		components: {
			PackageTile,
		},
		setup() {
			const store = usePackagesStore();

			const { selectedPackages } = storeToRefs(store);
			const { addPackage, removePackage, setPackages } = store;

			// TODO: Remove - using for testing
			onBeforeMount(() => {
				// setPackages(mockPackagesData);
				console.log(mockPackagesData);
			});

			// TODO: Grab uids from selectedPackages in store and fetch relevant CS data for venues

			return {
				selectedPackages,
				addPackage,
				removePackage,
				setPackages,
			};
		},
	});
</script>

<style></style>
