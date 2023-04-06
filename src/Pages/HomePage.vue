<template>
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
			<v-col
				v-for="tile in selectedPackages"
				:key="tile.uid"
				cols="12"
				sm="6"
				md="4"
				lg="3"
			>
				<PackageTile
					:title="tile?.short_name || tile?.full_name"
					:description="tile?.short_description || title?.description"
					:imageUrl="
						tile?.images[0]?.file?.url || tile?.default_image?.file?.url
					"
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
	import { usePackagesStore } from '../store/packagesStore';
	import { defineComponent } from 'vue';
	import { storeToRefs } from 'pinia';

	export default defineComponent({
		name: 'HomePage',
		components: {
			PackageTile,
		},
		setup() {
			const store = usePackagesStore();

			const { selectedPackages } = storeToRefs(store);
			const { addPackage, removePackage, setPackages } = store;

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
