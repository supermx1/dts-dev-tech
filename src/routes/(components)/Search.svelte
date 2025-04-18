<script>
	import Icon from '@iconify/svelte';
	import { getTasks, taskStore } from '$lib/stores/task';
	import { toast } from 'svelte-sonner';

	let searchInput = $state('');

	export async function searchTasks() {
		try {
			const response = await fetch(`/api/v1/task/${searchInput}`, {
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': localStorage.getItem('token') || ''
				}
			});
			if (response.ok) {
				const data = await response.json();
				taskStore.set(data);
				newTaskModal.showModal();
			} else {
				toast.error('Task not found');
			}
		} catch (error) {
			console.error(error);
			toast.error('Something went wrong');
		}
	}

	$effect(async () => {
		if (searchInput === '') {
			await getTasks();
		}
	});
</script>

<div class="flex items-center gap-2">
	<label class="input">
		<Icon icon="lucide:search" class="h-6 opacity-50" />
		<input type="search" bind:value={searchInput} required placeholder="Search by ID" />
	</label>
	<button class="btn btn-primary" onclick={() => searchTasks()} disabled={!searchInput}
		>Search</button
	>
</div>
