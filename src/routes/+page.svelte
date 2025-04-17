<script>
	import Kanban from './(components)/Kanban.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user';
	import { tasks, getTasks } from '$lib/stores/task';



	onMount(async () => {
		await getTasks();
	});
</script>

<svelte:head>
	<title>Ministry of Justice: HM Courts and Tribunals Service</title>
</svelte:head>

<div class="mx-auto h-[calc(100vh-64px)] p-6">
	<h1 class="mb-4 text-2xl font-bold">My Tasks</h1>
	<!-- Kanban board -->
	<Kanban tasks={$tasks} />
</div>
