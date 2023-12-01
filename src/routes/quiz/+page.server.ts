import { quiz } from '$lib/types/quiz.js';
import { error } from '@sveltejs/kit';
import YAML from 'yaml';

export async function load({ fetch, url }) {
	const quizUrl = url.searchParams.get('url');
	const quizQuestionNumber = url.searchParams.get('question');

	if (!quizUrl) {
		throw error(404, 'Missing quiz url');
	}

	const response = await fetch(quizUrl);

	if (!response.ok) {
		throw error(404, 'Quiz not found');
	}

	const urlParts = quizUrl.split('.');
	const quizExtension = urlParts[urlParts.length - 1];

	let quizFile;
	if (quizExtension.startsWith('json')) {
		quizFile = await response.text();
		quizFile = JSON.parse(quizFile);
	} else if (quizExtension.startsWith('yaml') || quizExtension.startsWith('yml')) {
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
