<script>
	import HomePage from './Pages/HomePage.vue';
	import PackagesPage from './Pages/PackagesPage.vue';
	import NotFound from './Pages/NotFound.vue';
	import SideNav from './components/SideNav.vue';

	const routes = {
		'/': HomePage,
		'/packages': PackagesPage,
	};

	export default {
		components: {
			SideNav,
		},
		data() {
			return {
				currentPath: window.location.hash,
			};
		},
		computed: {
			currentView() {
				return routes[this.currentPath.slice(1) || '/'] || NotFound;
			},
		},
		mounted() {
			window.addEventListener('hashchange', () => {
				this.currentPath = window.location.hash;
			});
		},
	};
</script>

<template>
	<v-app>
		<v-row class="m-0 p-0">
			<v-col cols="2">
				<SideNav />
			</v-col>
			<v-col cols="10">
				<component :is="currentView" />
			</v-col>
		</v-row>
	</v-app>
</template>
