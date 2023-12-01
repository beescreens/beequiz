<script lang="ts">
	import { Rocket, Trash } from 'radix-icons-svelte';

	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	const quizzes = [
		{
			label: 'beeQuiz demonstration (JSON)',
			value: 'https://quiz.beescreens.ch/quizzes/example.json',
		},
		{
			label: 'beeQuiz demonstration (YAML)',
			value: 'https://quiz.beescreens.ch/quizzes/example.yaml',
		},
	];

	let existingQuiz:
		| {
				value: string;
		  }
		| undefined = undefined;
	let newQuiz: string | undefined = undefined;

	$: quizSelected = existingQuiz?.value ?? newQuiz;
</script>

<div class="container relative">
	<Card.Root class="sm:w-full md:w-[700px]">
		<Card.Header>
			<Card.Title>Start a quiz</Card.Title>
			<Card.Description class="text-justify">
				Select a quiz or paste a link to one to start a new quiz session. New quizzes will be added
				to the list of available quizzes. This is only local to your browser (not yet available.
				Coming soon™!)
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="existing-quiz">Existing quiz</Label>
						<Select.Root bind:selected={existingQuiz}>
							<Select.Trigger>
								<Select.Value placeholder="Select an existing quiz" />
							</Select.Trigger>
							<Select.Content>
								{#each quizzes as quiz}
									<Select.Item value={quiz.value} label={quiz.label}>{quiz.label}</Select.Item>
								{/each}
							</Select.Content>
							<Select.Input id="existing-quiz" />
						</Select.Root>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="new-quiz">New quiz</Label>
						<Input id="new-quiz" placeholder="URL to the quiz" bind:value={newQuiz} />
						<p class="text-sm text-muted-foreground">
							Must be conformed to the format described in the
							<a href="/make-your-own" class="underline">Make your own</a> page.
						</p>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex flex-col justify-between space-y-2 sm:space-y-4">
			<Button
				class="w-full"
				disabled={!quizSelected}
				on:click={() => goto(`/quiz?url=${quizSelected}`)}
			>
				<Rocket class="mr-2 h-4 w-4" />
				Start the quiz
			</Button>
			<Button
				class="w-full"
				variant="outline"
				on:click={() => console.log('Delete stored quizzes')}
			>
				<Trash class="mr-2 h-4 w-4" />
				Delete all stored quizzes
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
