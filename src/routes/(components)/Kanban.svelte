<script>
	import { formatDateExt } from '$lib/utils';
	import RelativeTime from 'svelte-relative-time';
	import TaskModal from './TaskModal.svelte';
	import { taskStore } from '$lib/stores/task';
	let { tasks } = $props();
</script>

<div class="grid grid-cols-3 gap-4">
	<div class="relative col-span-1 border border-zinc-200 bg-zinc-100 p-4">
		<div class="flex items-center gap-2">
			<h2 class="text-lg font-bold">Pending</h2>
			<div class="badge badge-warning">
				{tasks.filter((task) => task.status === 'pending').length || 0}
			</div>
		</div>
		<div class="mt-4 flex max-h-[500px] flex-col gap-2 overflow-y-auto">
			{#each tasks.filter((task) => task.status === 'pending') as task}
				<div
					onclick={() => {
						$taskStore = task;
						newTaskModal.showModal();
					}}
					class="cursor-pointer rounded-lg border border-zinc-200 bg-white p-4 hover:bg-zinc-50"
				>
					<h3 class="text-lg font-bold">{task.title}</h3>
					<p class="text-sm text-zinc-500">
						Due Date: <RelativeTime date={task.dueDate} live={false} locale="en" />
					</p>
					<h4 class="mt-2 text-base font-bold">Brief</h4>
					<p class="max-h-[100px] truncate text-sm text-zinc-500">
						{task.description}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="relative col-span-1 border border-zinc-200 bg-zinc-100 p-4">
		<div class="flex items-center gap-2">
			<h2 class="text-lg font-bold">In Progress</h2>
			<div class="badge badge-info">
				{tasks.filter((task) => task.status === 'in-progress').length || 0}
			</div>
		</div>
		<div class="mt-4 flex max-h-[500px] flex-col gap-2 overflow-y-auto">
			{#each tasks.filter((task) => task.status === 'in-progress') as task}
				<div
					onclick={() => {
						$taskStore = task;
						newTaskModal.showModal();
					}}
					class="cursor-pointer rounded-lg border border-zinc-200 bg-white p-4 hover:bg-zinc-50"
				>
					<h3 class="text-lg font-bold">{task.title}</h3>
					<p class="text-sm text-zinc-500">
						Due Date: <RelativeTime date={task.dueDate} live={false} locale="en" />
					</p>
					<h4 class="mt-2 text-base font-bold">Brief</h4>
					<p class="max-h-[100px] truncate text-sm text-zinc-500">
						{task.description}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="relative col-span-1 border border-zinc-200 bg-zinc-100 p-4">
		<div class="flex items-center gap-2">
			<h2 class="text-lg font-bold">Completed</h2>
			<div class="badge badge-success">
				{tasks.filter((task) => task.status === 'completed').length || 0}
			</div>
		</div>
		<div class="mt-4 flex max-h-[500px] flex-col gap-2 overflow-y-auto">
			{#each tasks.filter((task) => task.status === 'completed') as task}
				<div
					onclick={() => {
						$taskStore = task;
						newTaskModal.showModal();
					}}
					class="cursor-pointer rounded-lg border border-zinc-200 bg-white p-4 hover:bg-zinc-50"
				>
					<h3 class="text-lg font-bold">{task.title}</h3>
					<p class="text-sm text-zinc-500">
						Completed: {formatDateExt(task.completedAt)}
					</p>
					<h4 class="mt-2 text-base font-bold">Brief</h4>
					<p class="max-h-[100px] truncate text-sm text-zinc-500">
						{task.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
