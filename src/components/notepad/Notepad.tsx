import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import PersistedState from 'use-persisted-state';


const NOTEPAD = () => {
    const [ value, setValue ] = PersistedState<string | string>( 'notepad' )( '' );
    return (
        <div className='container'>
            <MDEditor
                textareaProps={{
                    placeholder: 'This is an offline markdown editor to help you take some small notes (data is kept in your browser localstorage)'
                }}
                value={value || ''}
                onChange={setValue}
                height={500}
            />
        </div>
    );

};

export default NOTEPAD;
