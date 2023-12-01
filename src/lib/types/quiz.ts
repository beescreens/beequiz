import { z } from 'zod';

export const quiz = z.object({
	name: z.string().min(3),
	description: z.string().min(3).optional(),
	tags: z.array(z.string().min(3)),
	questions: z
		.array(
			z
				.object({
					title: z.string().min(3),
					statement: z.string().optional(),
					possibleAnswers: z.array(z.string()).min(2),
					correctAnswer: z.object({
						index: z.number().int().min(0),
						explanation: z.string(),
					}),
				})
				.refine((data) => data.correctAnswer.index < data.possibleAnswers.length, {
					message: 'Answer index is out of bounds',
					path: ['correctAnswer', 'index'],
				}),
		)
		.min(1),
});

export type Quiz = z.infer<typeof quiz>;
