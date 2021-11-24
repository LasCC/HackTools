import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { LazyStyle, Theme } from './types';
import LoadingIndicator from './LoadingIndicator';

export function useApplyStyles ( styles: LazyStyle ): void {
    useEffect( () => {
        styles.use();
        return () => styles.unuse();
    } );
}

interface DynamicThemeProps {
    themes: Theme[],
    value: string,
}

export default function DynamicTheme ( { themes, value }: DynamicThemeProps ) {
    const Component: any = themes.find( theme => theme.id === value )?.component;

    return (
        <Suspense fallback={<LoadingIndicator tip="loading" />}>
            <Component />
        </Suspense>
    );
}