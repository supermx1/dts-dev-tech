<script>
	import Icon from '@iconify/svelte';

	import { taskStore } from '$lib/stores/task';

	let data = $state({
		id: null,
		title: '',
		description: '',
		status: 'pending',
		dueDate: ''
	});

	$effect(() => {
		if ($taskStore) {
			data = $taskStore;
		}
	});

	let loading = $state(false);

	$inspect(data);
</script>

<dialog id="newTaskModal" class="modal">
	<div class="modal-box">
		<div class="border-b-base-300 flex justify-between border-b pb-4">
			<h3 class="text-lg font-bold">
				{$taskStore ? 'Edit Task' : 'New Task'}
			</h3>
			<form method="dialog">
				<button
					onclick={() => {
						newTaskModal.close();
						setTimeout(() => {
							$taskStore = null;
						}, 200);
					}}
					class="btn btn-sm btn-circle btn-ghost"
				>
					<Icon icon="mdi:close" class="text-2xl" />
				</button>
			</form>
		</div>

		{#if !$taskStore}
			<p class="py-2">Create a new task</p>
		{:else}
			<p class="py-2">Edit task: {data.id}</p>
		{/if}
		<form>
			<div class="grid grid-cols-2 gap-4">
				<fieldset class="fieldset col-span-2 w-full">
					<label for="title" class="fieldset-label">Title</label>
					<input
						id="title"
						bind:value={data.title}
						type="text"
						class="input w-full"
						placeholder="Task title"
						required
					/>
				</fieldset>
				<div class="col-span-2 grid grid-cols-2 gap-4">
					<fieldset class="fieldset col-span-1 w-full">
						<label for="status" class="fieldset-label">Status</label>
						<select id="status" bind:value={data.status} class="select">
							<option disabled selected>Pick a status</option>
							<option value="pending">Pending</option>
							<option value="in-progress">In Progress</option>
							<option value="completed">Completed</option>
						</select>
					</fieldset>

					<fieldset class="fieldset col-span-1 w-full">
						<label for="dueDate" class="fieldset-label">Due Date/Time</label>
						<input
							id="dueDate"
							bind:value={data.dueDate}
							min={new Date().toISOString().split('T')[0]}
							type="datetime-local"
							class="input w-full"
							placeholder="Due Date/Time"
						/>
					</fieldset>
				</div>
				<fieldset class="fieldset col-span-2 w-full">
					<label for="description" class="fieldset-label">Description</label>
					<textarea
						id="description"
						bind:value={data.description}
						class="textarea w-full"
						placeholder="Task description"
					></textarea>
				</fieldset>
				<div class="col-span-2 flex items-center justify-between">
					<button type="submit" class="btn btn-primary">
						{#if loading}
							<Icon icon="lucide:loader" class="animate-spin" />
						{/if}
						{$taskStore ? 'Update Task' : 'Create Task'}
					</button>
					{#if $taskStore}
						<button
							class="text-sm link link-hover link-error flex items-center gap-2"
							onclick={() => {
								$taskStore = null;
							}}
						>
							<Icon icon="lucide:trash" />
							Delete Task
						</button>
					{/if}
				</div>
			</div>
		</form>
	</div>
</dialog>
