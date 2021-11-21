import { ReactNode } from 'react';

export interface LazyStyle {
	use: () => void;
	unuse: () => void;
}

export interface Theme {
	id: string;
	displayName: string;
	filename: string;
	component: ReactNode;
}
