<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import Icon from '@iconify/svelte';
	import TaskModal from './(components)/TaskModal.svelte';
	import { generateSVGAvatar, timeOfDayGreeting } from '$lib/utils';
	import { user } from '$lib/stores/user';
	import Login from './(components)/Login.svelte';

	let { children } = $props();
</script>

<!-- <svelte:head>
	<link href="/favicon.ico" rel="shortcut icon" id="favico" type="images/vnd.microsoft.icon">
</svelte:head> -->

{#if !$user}
	<Login />
{:else}
	<div class="navbar bg-neutral shadow-sm md:px-4">
		<div class="flex-1">
			<a href="/">
				<img src="/logo--default.svg" alt="HM Courts and Tribunals Service" />
			</a>
		</div>
		<div class="flex-none">
			<button
				onclick={() => newTaskModal.showModal()}
				class="btn mr-2 border-[#e5e5e5] bg-white text-black hover:bg-zinc-200"
			>
				<Icon icon="mdi:plus" />
				New Task
			</button>
			<div class="dropdown dropdown-end">
				<div
					tabindex="0"
					role="button"
					class="btn btn-ghost btn-circle avatar border-base-300 border"
				>
					<div class="w-10 rounded-full">
						<img alt="Avatar" src={generateSVGAvatar($user)} />
					</div>
				</div>
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 !text-base shadow"
				>
					<li class="border-b-base-300 mb-2 border-b pb-2 font-bold">
						{timeOfDayGreeting()},
						{$user ?? 'Guest'}
					</li>

					<li>
						<a class="text-base" href="https://emeka.pro" target="_blank"
							>My Website <Icon icon="mdi:open-in-new" /></a
						>
					</li>

					<li>
						<a
							class="text-base"
							href="/"
							onclick={() => {
								localStorage.removeItem('username');
								$user = null;
							}}
							>Logout
						</a>
					</li>

					<li class="mt-2 text-xs text-zinc-500">Version 0.0.1</li>
				</ul>
			</div>
		</div>
	</div>

	<TaskModal />
{/if}

{@render children()}

<Toaster richColors />
