import { lazy } from 'react';
import { Theme } from '../theming/types';

export const themes: Theme[] = [
	{
		id: 'light', // used as value in the select
		displayName: 'Light', // used as label in the select
		filename: 'light.theme.less',
		component: lazy(() => import('../themes/LightTheme'))
	},
	{
		id: 'lightCompact',
		displayName: 'Light Compact',
		filename: 'light.theme.less',
		component: lazy(() => import('../themes/LightCompactTheme'))
	},
	{
		id: 'dark',
		displayName: 'Dark',
		filename: 'light.theme.less',
		component: lazy(() => import('../themes/DarkTheme'))
	},
	{
		id: 'darkCompact',
		displayName: 'Dark Compact',
		filename: 'light.theme.less',
		component: lazy(() => import('../themes/DarkCompactTheme'))
	}
];
