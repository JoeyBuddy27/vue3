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
				<v-card class="" max-width="450">
					<v-toolbar color="green-darken-1">
						<v-toolbar-title>Choose packages</v-toolbar-title>
					</v-toolbar>
					<v-list v-if="venues.length" item-props lines="three">
						<PackageListItem
							v-for="item in venues"
							:key="item.uid"
							:imageUrl="
								item?.default_image?.file?.url ||
								item?.images[0]?.file?.url
							"
							:title="item?.short_name || item?.full_name"
							:description="item?.short_description"
							:is-selected-package="
								selectedPackages.some(({ uid }) => uid === item.uid)
							"
							:uid="item.uid"
							@update-checked-packages="
								checked => updateCheckedPackages(checked, item)
							"
						/>
					</v-list>
					<v-alert
						v-else
						type="error"
						title="Unable to fetch packages"
						text="Something went wrong, try again later!"
					>
					</v-alert>
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-btn
					@click="savePackagesToStore()"
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
	import { usePackagesStore } from '../store/packagesStore';
	import { defineComponent, onMounted, ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { mockPackagesData } from '../mockPackagesData';
	import PackageListItem from '@/components/PackageListItem.vue';
	import csMethodsAPI from '../api/fetchMethods';

	export default defineComponent({
		name: 'PackagesPage',
		components: {
			PackageListItem,
		},
		setup() {
			const store = usePackagesStore();

			const saving = ref(false);
			const snackbarOpen = ref(false);

			const { selectedPackages } = storeToRefs(store);
			const { addPackage, removePackage, setPackages } = store;

			let checkedPackages = [...selectedPackages?.value] || [];

			const updateCheckedPackages = (isChecked, packageItem) => {
				if (isChecked) {
					checkedPackages.push(packageItem);
				} else {
					checkedPackages = checkedPackages.filter(
						checkedItem => checkedItem.uid !== packageItem.uid,
					);
				}
			};

			const savePackagesToStore = () => {
				saving.value = true;
				setPackages(checkedPackages);
				setTimeout(() => {
					saving.value = false;
					snackbarOpen.value = true;
				}, 1500);
			};

			const venueIds = [
				'blt26dd895dadadb6c',
				'bltacb14e3abb70f3fd',
				'blt1a4f8185dc247e34',
				'blt9230b24e2b9d4d35',
			];
			const venues = ref({});

			const loadAPIMethods = async url => {
				let res = await csMethodsAPI.getCSData(url);
				venues.value = res?.entries || [];
			};

			onMounted(() => {
				loadAPIMethods(
					`venue/entries?query={ "uid": { "$in": ${`["${[
						...new Set(venueIds),
					].join('","')}"]`} } }&include[]=default_image&include[]=images`,
				);
			});

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
				loadAPIMethods,
				venues,
			};
		},
	});
</script>

<style></style>
