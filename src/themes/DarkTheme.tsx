import * as React from 'react';
import styles from './dark-compact.theme.less';
import { useApplyStyles } from '../theming';

export default function DarkTheme () {
    useApplyStyles( styles );
    return null;
}