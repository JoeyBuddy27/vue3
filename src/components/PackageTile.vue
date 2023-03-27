<template>
	<v-card class="mx-auto" max-width="344">
		<v-img :src="imageUrl" height="200" cover></v-img>

		<v-card-title> {{ title }} </v-card-title>
		<v-card-subtitle> {{ subtitle }} </v-card-subtitle>

		<v-card-actions>
			<v-btn color="red-darken-1" variant="text" @click="removePackage(uid)">
				Remove package
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn
				:icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
				@click="toggle"
			></v-btn>
		</v-card-actions>

		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>
				<v-card-text>
					{{ description }}
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>
<script>
	import { defineComponent, ref } from 'vue';

	export default defineComponent({
		name: 'PackageTile',
		props: {
			title: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
			subtitle: {
				type: String,
				required: true,
			},
			price: {
				type: String,
				required: true,
			},
			imageUrl: {
				type: String,
				required: true,
			},
			uid: {
				type: String,
				required: true,
			},
		},

		setup(props, { emit }) {
			const show = ref(false);

			function removePackage(uid) {
				emit('removePackage', uid);
			}

			const toggle = () => {
				show.value = !show.value;
			};

			return {
				show,
				toggle,
				props,
				removePackage,
			};
		},
	});
</script>

<style></style>
