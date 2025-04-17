<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import Icon from '@iconify/svelte';
	let { children } = $props();
</script>

<!-- <svelte:head>
	<link href="/favicon.ico" rel="shortcut icon" id="favico" type="images/vnd.microsoft.icon">
</svelte:head> -->

<div class="navbar bg-neutral shadow-sm">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl">
			<img src="/logo--default.svg" alt="HM Courts and Tribunals Service" />
		</a>
	</div>
	<div class="flex-none">
		<button onclick={() => newTaskModal.showModal()} class="btn mr-2 border-[#e5e5e5] bg-white text-black hover:bg-zinc-200">
			<Icon icon="mdi:plus" />
			New Task
		</button>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img
						alt="Tailwind CSS Navbar component"
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
					/>
				</div>
			</div>
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
			>
				<li>
					<a class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a>Settings</a></li>
				<li><a>Logout</a></li>
			</ul>
		</div>
	</div>
</div>

<dialog id="newTaskModal" class="modal">
	<div class="modal-box">
	  <h3 class="text-lg font-bold">Hello!</h3>
	  <p class="py-4">Press ESC key or click the button below to close</p>
	  <div class="modal-action">
		<form method="dialog">
		  <!-- if there is a button in form, it will close the modal -->
		  <button class="btn">Close</button>
		</form>
	  </div>
	</div>
  </dialog>
{@render children()}

<Toaster richColors />
