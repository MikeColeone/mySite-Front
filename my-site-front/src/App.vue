<template>
	<Provider>
		<div class="app-wrapper">
			<Header></Header>
			<main class="main-wrapper">
				<router-view v-slot="{ Component, route }">
					<keep-alive>
						<component :is="Component" :key="route.path" />
					</keep-alive>
				</router-view>
			</main>
			<Footer></Footer>
			<Tool></Tool>
			<Search></Search>
			<Login></Login>
			<Register></Register>
			<Forget></Forget>
			<Email></Email>
			<Drawer></Drawer>
			<MusicPlayer></MusicPlayer>
			<ChatRoom></ChatRoom>
		</div>
	</Provider>
</template>

<script setup lang="ts">
onMounted(() => {
console.info(
  "%c bili-fe-mirror %c v" + "2.0.2",
  "padding: 2px 6px; border-radius: 3px 0 0 3px; color: #fff; background: #FF6699; font-weight: bold;",
  "padding: 2px 6px; border-radius: 0 3px 3px 0; color: #fff; background: #FF9999; font-weight: bold;"
);

})
</script>

<style scoped>
.app-wrapper {
	position: relative;
	min-height: 100vh;

}

.main-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 0 8rem;
}
</style>
