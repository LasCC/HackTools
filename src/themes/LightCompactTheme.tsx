import * as React from 'react';
import styles from './light-compact.theme.less';
import { useApplyStyles } from '../theming';

export default function LightCompactTheme () {
    useApplyStyles( styles );
    return null;
}