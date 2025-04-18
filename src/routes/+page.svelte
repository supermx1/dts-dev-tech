<script>
	import Kanban from './(components)/Kanban.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user';
	import { tasks, getTasks } from '$lib/stores/task';
	import Search from './(components)/Search.svelte';


	onMount(async () => {
		await getTasks();
	});
</script>

<svelte:head>
	<title>Ministry of Justice: HM Courts and Tribunals Service</title>
</svelte:head>

<div class="mx-auto h-[calc(100vh-64px)] p-6">
	<div class="md:flex md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
		<h1 class="text-2xl font-bold">My Tasks</h1>
		<Search />
	</div>
	<!-- Kanban board -->
	<Kanban tasks={$tasks} />
</div>
