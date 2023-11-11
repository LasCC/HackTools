import { message } from 'antd';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Array, Record, String } from 'runtypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import checklists from "@assets/data/Methodology/OWSTG.json";
import { AtomicTest, TestCaseStatus } from './../ChecklistInterfaces';
import { storage } from "../../../createPersistedState"


const AtomicTest = ( Record( {
    id: String,
    description: String,
    objectives: Array( String ),
    testCaseStatus: String,
    observations: String,
    reference: String,
    substeps: Array(
        Record( {
            step: String,
            description: String
        } )
    )
} ) );

export const Methodology = Array( AtomicTest );

export type State = {
    stateFlattenedChecklists: AtomicTest[];
    setStateFlattenedChecklists: ( newState: AtomicTest[] ) => void;
    handleRemoteMethodologyImportFromURL: ( URL ) => void;
    handleStatusChange: ( id: string, newStatus: TestCaseStatus ) => void;
    handleObservationsChange: ( id: string, newObservations: string ) => void;
    handleFileUpload: () => void;
    handleCSVExport: () => void;
};

export const initializeChecklist = ( checklists: any ) => {
    return checklists.map( test => ( {
        ...test,
        testCaseStatus: Object.values( TestCaseStatus ).includes( test.testCaseStatus as TestCaseStatus )
            ? test.testCaseStatus as TestCaseStatus
            : 'NOT_TESTED'
    } ) );
};

const createOWSTGStore = ( id: string ) =>
    create<any>(
        persist(
            ( set, get ) => ( {
                stateFlattenedChecklists: initializeChecklist( checklists ),
                setStateFlattenedChecklists: ( newState: AtomicTest[] ) => {
                    set( { stateFlattenedChecklists: newState } );
                },
                handleStatusChange: ( id: string, newStatus: TestCaseStatus ) => {
                    const updatedChecklists = get().stateFlattenedChecklists.map( test =>
                        test.id === id ? { ...test, testCaseStatus: newStatus } : test
                    );
                    set( { stateFlattenedChecklists: updatedChecklists } );
                },
                handleObservationsChange: ( id: string, newObservations: string ) => {
                    const updatedChecklists = get().stateFlattenedChecklists.map( test =>
                        test.id === id ? { ...test, observations: newObservations } : test
                    );
                    set( { stateFlattenedChecklists: updatedChecklists } );
                },
                handleFileUpload: () => {
                    let input = document.createElement( 'input' );
                    input.type = 'file';
                    input.accept = '.json';
                    input.onchange = ( event ) => {
                        let file = ( event.target as HTMLInputElement ).files[ 0 ];
                        if ( file ) {
                            let reader = new FileReader();
                            reader.onload = ( event ) => {
                                try {
                                    let methodology = JSON.parse( event.target.result as string );
                                    const validatedMethodology = Methodology.check( methodology );
                                    const newState = initializeChecklist( validatedMethodology );
                                    set( { stateFlattenedChecklists: newState } );
                                    message.success( 'File uploaded and parsed successfully' );
                                } catch ( error ) {
                                    message.error( 'Error parsing file: ' + "\n" + error.message );
                                    console.error( error );
                                }
                            };
                            reader.onerror = ( error ) => {
                                message.error( 'Error reading file: ' + "\n" + error );
                                console.error( error );
                            };
                            reader.readAsText( file );
                        }
                        input.remove();
                    };
                    input.click();
                },
                handleCSVExport: () => {
                    const data = get().stateFlattenedChecklists.map( ( { id, description, reference, testCaseStatus, observations } ) => ( {
                        id,
                        description,
                        reference,
                        testCaseStatus,
                        observations
                    } ) );

                    const csv = Papa.unparse( data );
                    const blob = new Blob( [ csv ], { type: 'text/csv;charset=utf-8;' } );
                    saveAs( blob, `htool_${ new Date().toISOString() }_${ new Date().getTime() }.csv` );
                },
                handleRemoteMethodologyImportFromURL: async ( URL ) => {
                    try {
                        const response = await fetch( URL );
                        const methodology = await response.json();
                        const validatedMethodology = Methodology.check( methodology );
                        set( { stateFlattenedChecklists: validatedMethodology } );
                        message.success( 'Methodology imported successfully' );
                    } catch ( error ) {
                        message.error( 'Error fetching methodology: ' + error.message );
                        console.error( error );
                    }
                },
            } ),
            {
                name: `methodology-tab-state-${ id }`, // unique name
                getStorage: () => localStorage // localstorage for now since there's indexeddb issues wih state updates
            }
        )
    );

export default createOWSTGStore;