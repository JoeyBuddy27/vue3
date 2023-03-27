<template>
	<v-container>
		<v-row class="ma-2">
			<v-col cols="12">
				<div class="text-h2">My Golfbreaks</div>
			</v-col>
			<v-col cols="12">
				<div class="text-subtitle-1">Available Packages</div>
			</v-col>
			<v-col>
				<!-- TODO - map through -->
				<v-card class="" max-width="450">
					<v-toolbar color="green-darken-1">
						<v-toolbar-title>Choose packages</v-toolbar-title>
					</v-toolbar>
					<v-list item-props lines="three">
						<PackageListItem
							v-for="item in mockPackagesData"
							:key="item.uid"
							:imageUrl="item.imageUrl"
							:title="item.title"
							:subtitle="item.subtitle"
							:description="item.description"
							:is-selected-package="
								selectedPackages.some(({ uid }) => uid === item.uid)
							"
							:uid="item.uid"
							@update-checked-packages="
								(checked, uid) => updateCheckedPackages(checked, uid)
							"
						/>
					</v-list>
				</v-card>
			</v-col>
			<v-col cols="12">
				<v-btn
					@click="savePackagesToStore"
					:loading="saving"
					title="Save"
					color="green-darken-2"
					>Save</v-btn
				>
			</v-col>
		</v-row>
		<v-snackbar v-model="snackbarOpen" timeout="3000" anchor="top">
			<div class="text-center">
				Saved your list with
				<span class="text-green">
					{{ checkedPackages.length }}
				</span>
				packages
			</div>
		</v-snackbar>
	</v-container>
</template>

<script>
	// TODO - fetch packages (array of UIDs)
	// Then call CS API to get package details

	import { usePackagesStore } from '../store/counterStore';
	import { defineComponent, ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { mockPackagesData } from '../mockPackagesData';
	import PackageListItem from '@/components/PackageListItem.vue';

	export default defineComponent({
		name: 'PackagesPage',
		components: {
			PackageListItem,
		},
		setup() {
			const store = usePackagesStore();

			// const selectedPackagesArray = ref([]);

			const saving = ref(false);
			const snackbarOpen = ref(false);

			const { selectedPackages } = storeToRefs(store);
			const { addPackage, removePackage, setPackages } = store;
			const checkedPackages = ref(selectedPackages.value.map(({ uid }) => uid));
			console.log('checkedPackages.value: ', checkedPackages.value);

			const updateCheckedPackages = (isChecked, uid) => {
				if (isChecked) {
					checkedPackages.value.push(uid);
				} else {
					checkedPackages.value = checkedPackages.value.filter(
						checkedUid => checkedUid !== uid,
					);
				}
			};

			// TODO: Snackbar on success
			const savePackagesToStore = () => {
				saving.value = true;
				setTimeout(() => {
					setPackages(
						mockPackagesData.filter(({ uid }) =>
							checkedPackages.value.includes(uid),
						),
					);
					saving.value = false;
					snackbarOpen.value = true;
				}, 2000);
			};

			// TODO: Save button to update state?

			return {
				selectedPackages,
				addPackage,
				removePackage,
				mockPackagesData,
				updateCheckedPackages,
				checkedPackages,
				savePackagesToStore,
				saving,
				snackbarOpen,
			};
		},
	});
</script>

<style></style>
