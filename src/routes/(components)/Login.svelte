<script>
	import { user } from '$lib/stores/user';

	let username = $state('Chukwuemeka Anyakora');

	function login() {
		localStorage.setItem('username', username);
		$user = username;
	}
    </script>

<!--- PAGE IS ENTIRELY UNPROTECTED AND UNNECESSARY 😀 -->
<!--- IT IS ONLY USED TO SET THE USERNAME IN LOCAL STORAGE -->

<div class="flex h-screen flex-col items-center justify-center bg-white">
	<div class="w-full max-w-md bg-zinc-100">
		<div class="bg-neutral flex justify-center p-4">
			<img src="/logo--default.svg" alt="logo" class="h-10" />
		</div>
		<div class="p-6">
			<h1 class="text-2xl font-bold">Login</h1>
			<p class="text-sm text-zinc-500">Welcome back! Please enter your details.</p>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					login();
				}}
				class="grid grid-cols-1 gap-4"
			>
				<fieldset class="fieldset col-span-1 w-full">
					<label for="username" class="fieldset-label">Username</label>
					<input
						id="username"
						bind:value={username}
						type="text"
						class="input w-full"
						placeholder="Username"
						required
					/>
				</fieldset>
				<div class="col-span-1">
					<button type="submit" class="btn btn-primary">Login</button>
				</div>
			</form>
		</div>
	</div>
</div>
