<template>
	<v-list-item :title="title" :subtitle="description" :prepend-avatar="imageUrl">
		<template v-slot:append>
			<v-list-item-action start>
				<v-checkbox v-model="isActive"></v-checkbox>
			</v-list-item-action>
		</template>
	</v-list-item>
</template>

<script>
	import { defineComponent, ref, watch } from 'vue';

	export default defineComponent({
		name: 'PackageListItem',
		props: {
			title: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				default: '',
			},
			imageUrl: {
				type: String,
				required: true,
			},
			uid: {
				type: String,
				required: true,
			},
			isSelectedPackage: {
				type: Boolean,
				required: true,
			},
		},
		setup(props, { emit }) {
			const isActive = ref(props.isSelectedPackage);

			function updateChecked(checked, uid) {
				emit('updateCheckedPackages', checked, uid);
			}

			watch(isActive, newValue => {
				updateChecked(newValue, props.uid);
			});

			return {
				isActive,
				props,
				updateChecked,
			};
		},
	});
</script>

<style></style>
