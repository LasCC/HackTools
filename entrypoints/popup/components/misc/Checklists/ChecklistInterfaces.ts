export enum TestCaseStatus {
	NOT_TESTED = "NOT_TESTED",
	IN_PROGRESS = "IN_PROGRESS",
	NOT_APPLICABLE = "NOT_APPLICABLE",
	PASSED = "PASSED",
	FAILED = "FAILED",
}

export interface AtomicTest {
	description: string;
	id: string;
	objectives: string[];
	observations: string;
	reference: string;
	substeps: Substep[];
	testCaseStatus: TestCaseStatus;
	category: string;
}

export interface Substep {
	step: string;
	description: string;
}

export interface Pentest extends AtomicTest {}

export interface Quote {
	quoteText: string;
	quoteAuthor: string;
}
export interface Quotes {
	quotes: Quote[];
}
