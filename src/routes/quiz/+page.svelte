<script lang="ts">
	import {
		CheckCircled,
		CrossCircled,
		ChevronLeft,
		ChevronRight,
		EyeOpen,
		EyeClosed,
	} from 'radix-icons-svelte';

	import isomorphicDompurify from 'isomorphic-dompurify';
	import { Carta, CartaViewer } from 'carta-md';
	import { code } from '@cartamd/plugin-code';

	import { goto } from '$app/navigation';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Progress } from '$lib/components/ui/progress';
	import { Separator } from '$lib/components/ui/separator';

	import '$lib/styles/default.css';

	const carta = new Carta({
		extensions: [
			code({
				lineNumbering: true,
			}),
		],
		sanitizer: isomorphicDompurify.sanitize,
	});

	let selectedAnswer: string | undefined = undefined;
	let showAnswer: boolean | undefined = undefined;
	let correctAnswer: boolean | undefined = undefined;

	export let data;

	function checkAnswer() {
		if (selectedAnswer) {
			correctAnswer = parseInt(selectedAnswer) === question.correctAnswer.index;
			showAnswer = true;
		}
		selectedAnswer = undefined;
	}

	function resetAnswer() {
		selectedAnswer = undefined;
		showAnswer = undefined;
		correctAnswer = undefined;
	}

	function goGoQuestion(question: number) {
		resetAnswer();
		goto(`/quiz?url=${data.quizUrl}&question=${question}`);
	}

	$: questionNumber = data.questionNumber ? parseInt(data.questionNumber) : 1;
	$: numberOfQuestions = data.quiz.questions.length;
	$: questionIndex = questionNumber ? questionNumber - 1 : 0;
	$: quiz = data.quiz;
	$: question = quiz.questions[questionIndex];
</script>

<div class="container relative">
	<Card.Root class="sm:w-full md:w-[700px]">
		<Card.Header>
			<Card.Title class="text-lg">{quiz.name}</Card.Title>
			<div class="flex flex-wrap space-x-1.5">
				{#each quiz.tags as tag}
					<Badge>{tag}</Badge>
				{/each}
			</div>
			{#if quiz.description}
				<Card.Description class="text-justify">
					{quiz.description}
				</Card.Description>
			{/if}
		</Card.Header>
		<Card.Content>
			<form>
				<div class="grid grid-cols-1 w-full items-center gap-4">
					<div class="flex flex-col space-y-3">
						<Label class="text-base">
							Question {questionNumber}/{numberOfQuestions} - {question.title}</Label
						>
						<Progress class="w-full" value={questionNumber} max={numberOfQuestions} />
						<div class="h-[250px] overflow-auto space-y-3 leading-loose">
							{#if !showAnswer}
								{#if question.statement}
									<CartaViewer {carta} value={question.statement} />
								{:else}
									<p class="text-muted-foreground">No statement</p>
								{/if}
							{:else}
								{#if correctAnswer}
									<Alert.Root>
										<CheckCircled class="h-4 w-4" />
										<Alert.Title>Correct!</Alert.Title>
										<Alert.Description>
											Your answer is correct! You can check the following explanation.
										</Alert.Description>
									</Alert.Root>
								{:else}
									<Alert.Root variant="destructive">
										<CrossCircled class="h-4 w-4" />
										<Alert.Title>Incorrect</Alert.Title>
										<Alert.Description>
											Your answer is incorrect. You can check the following explanation.
										</Alert.Description>
									</Alert.Root>
								{/if}
								<CartaViewer {carta} value={question.correctAnswer.explanation} />
							{/if}
						</div>
						<Separator class="my-4" />
						<Label for="possible-answers" class="text-base">Possible answers</Label>
						<RadioGroup.Root bind:value={selectedAnswer} class="flex flex-col space-y-1">
							{#each question.possibleAnswers as possibleAnswer, index}
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value={index.toString()} id={index.toString()} />
									<Label for={index.toString()}>{possibleAnswer}</Label>
								</div>
							{/each}
							<RadioGroup.Input id="possible-answers" />
						</RadioGroup.Root>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex  justify-between space-x-1.5">
			<Button
				size="icon"
				disabled={questionIndex === 0}
				on:click={() => goGoQuestion(questionNumber - 1)}
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			{#if !showAnswer || selectedAnswer}
				<Button class="w-full" on:click={checkAnswer} disabled={!selectedAnswer}>
					<EyeOpen class="mr-2 h-4 w-4" />
					Show the answer
				</Button>
			{:else}
				<Button class="w-full" on:click={resetAnswer}>
					<EyeClosed class="mr-2 h-4 w-4" />
					Hide the answer
				</Button>
			{/if}
			<Button
				size="icon"
				disabled={questionIndex === numberOfQuestions - 1}
				on:click={() => goGoQuestion(questionNumber + 1)}
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
