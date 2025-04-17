<script>
	import Kanban from './(components)/Kanban.svelte';

	let tasks = $state([
        {
            id: 1,
            title: 'Task 1',
            description: 'Description 1',
            status: 'pending',
			dueDate: new Date(),
			createdAt: new Date(),
		},
		{
			id: 2,
			title: 'Task 2',
			description: 'Description 2',
			status: 'in-progress',
			dueDate: new Date(),
			createdAt: new Date(),
		},
		{
			id: 3,
			title: 'Task 3',
			description: 'Description 3',
			status: 'completed',
			dueDate: new Date(),
			createdAt: new Date(),
			completedAt: new Date(),
		},
	]);

    let selectedTask = $state(null);

    $effect(() => {
        console.log(selectedTask);
    });
</script>

<svelte:head>
	<title>Ministry of Justice: HM Courts and Tribunals Service</title>
</svelte:head>

<div class="p-6 mx-auto h-[calc(100vh-64px)]">
	<h1 class="text-2xl font-bold mb-4">My Tasks</h1>
	<Kanban {tasks} bind:selectedTask />
</div>