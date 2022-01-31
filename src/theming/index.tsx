import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { LazyStyle, Theme } from './types';

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
        <Suspense fallback={<div>loading styles..</div>}>
            <Component />
        </Suspense>
    );
}