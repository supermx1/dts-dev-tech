<script lang="ts">
	import Icon from '@iconify/svelte';
	import { user } from '$lib/stores/user';
	import { taskStore, getTasks } from '$lib/stores/task';
	import { toast } from 'svelte-sonner';
	import { formatDateForInput } from '$lib/utils';

	let loading = $state(false);

	// Define the TaskData type
	type TaskData = {
		id: number | null;
		title: string;
		description: string;
		status: string;
		dueDate: string;
	};

	// Define the data state
	let data = $state<TaskData>({
		id: null,
		title: '',
		description: '',
		status: 'pending',
		dueDate: ''
	});

	// Effect to update the data state when the taskStore changes
	$effect(() => {
		if ($taskStore) {
			data = {
				id: $taskStore.id,
				title: $taskStore.title,
				description: $taskStore.description,
				status: $taskStore.status,
				dueDate: formatDateForInput($taskStore.dueDate)
			};
		}
	});

	// Creates a new task via API and updates the UI
	async function createTask() {
		loading = true;
		if (!data.title || !data.description || !data.dueDate || !data.status) {
			toast.error('Please fill in all fields');
			return;
		}
		try {
			await fetch('/api/v1/task', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': $user || ''
				},
				body: JSON.stringify({
					title: data.title,
					description: data.description,
					dueDate: data.dueDate,
					status: data.status
				})
			});
			newTaskModal.close();
			await getTasks();
			clearTask();
			toast.success('Task created successfully');
		} catch (error) {
			console.error(error);
			toast.error('Failed to create task');
		} finally {
			loading = false;
		}
	}

	// Updates an existing task via API and refreshes the list
	async function updateTask() {
		loading = true;
		if ($taskStore?.id && (!data.title || !data.description || !data.dueDate || !data.status)) {
			toast.error('Please fill in all fields');
			return;
		}
		try {
			const response = await fetch(`/api/v1/task`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': $user || ''
				},
				body: JSON.stringify({
					id: $taskStore?.id,
					title: data.title,
					description: data.description,
					dueDate: data.dueDate,
					status: data.status
				})
			});
			newTaskModal.close();
			await getTasks();
			clearTask();
			toast.success('Task updated successfully');
		} catch (error) {
			console.error(error);
			toast.error('Failed to update task');
		} finally {
			loading = false;
		}
	}

	// Removes a task from the system and updates the UI
	async function deleteTask() {
		loading = true;
		try {
			const response = await fetch(`/api/v1/task`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': $user || ''
				},
				body: JSON.stringify({
					id: $taskStore?.id
				})
			});
			newTaskModal.close();
			await getTasks();
			clearTask();
			toast.success('Task deleted successfully');
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete task');
		} finally {
			loading = false;
		}
	}

	// Resets the form data to default values
	function clearTask() {
		data = {
			id: null,
			title: '',
			description: '',
			status: 'pending',
			dueDate: ''
		};
	}
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
			<p class="py-2">Edit task: <span class="badge text-xs uppercase">{data.id}</span></p>
		{/if}
		<form
			onsubmit={(e) => {
				e.preventDefault();
				if ($taskStore) {
					updateTask();
				} else {
					createTask();
				}
			}}
		>
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
					<fieldset class="fieldset col-span-2 md:col-span-1 w-full">
						<label for="status" class="fieldset-label">Status</label>
						<select id="status" bind:value={data.status} class="select w-full">
							<option disabled selected>Pick a status</option>
							<option value="pending">Pending</option>
							<option value="in-progress">In Progress</option>
							<option value="completed">Completed</option>
						</select>
					</fieldset>

					<fieldset class="fieldset col-span-2 md:col-span-1 w-full">
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
							class="link link-hover link-error flex items-center gap-2 text-sm"
							type="button"
							onclick={() => {
								deleteTask();
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
