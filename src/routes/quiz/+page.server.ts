import { quiz } from '$lib/types/quiz.js';
import { error } from '@sveltejs/kit';
import YAML from 'yaml';

export async function load({ fetch, url }) {
	const quizUrl = url.searchParams.get('url');
	const quizQuestionNumber = url.searchParams.get('question');

	if (!quizUrl) throw error(404, 'Missing quiz url');

	let response;

	try {
		response = await fetch(quizUrl);
	} catch (e) {
		throw error(404, 'Quiz not found');
	}

	const quizType = response.headers.get('content-type');

	let quizFile;
	if (quizType === 'application/json') {
		quizFile = await response.json();
	} else if (quizType === 'text/yaml') {
		quizFile = await response.text();
		quizFile = YAML.parse(quizFile);
	} else {
		throw error(401, 'Unsupported quiz format');
	}

	try {
		const parsedQuiz = quiz.parse(quizFile);

		return {
			quizUrl,
			quiz: parsedQuiz,
			questionNumber: quizQuestionNumber,
		};
	} catch (_) {
		throw error(401, 'Invalid quiz format');
	}
}
