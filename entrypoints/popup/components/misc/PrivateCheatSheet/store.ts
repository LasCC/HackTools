import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saveAs } from 'file-saver';
import { Array, Record, String } from 'runtypes';
import { message } from 'antd';
import { storage } from '../../createPersistedState';

export interface DataType {
    id: string;
    name: string;
    tags: string[];
    description: string;
    substeps: Substep[];
}

export interface Substep {
    description: string;
    payload: string | null;
}


interface PayloadArray {
    payloads: DataType[];
}

const Payloads = Array(Record({
    id: String,
    name: String,
    tags: Array(String),
    description: String,
    substeps: Array(
        Record({
            description: String,
            payload: String.Or(null)
        })
    )
}));

export interface PayloadStoreState {
    payloads: DataType[];
    setPayloads: (payloads: DataType[]) => void;
    remotePayloadURL: string;
    setRemotePayloadURL: (URL: string) => void;
    importPayloadsFromLocalFile: (file: File) => void;
    importPayloadFromURL: () => Promise<void>;
    exportPayloadsAsJSON: () => void;
}


export const exampleData: DataType[] = [
    {
        id: '1',
        name: 'AMSI / ETW Bypass',
        description: 'Bypass AMSI and ETW powershell payload',
        substeps: [
            {
                description: 'Bypass AMSI/ETW',
                payload: 'your payload ;)',
            },
        ],
        tags: ['Windows', 'Bypass', 'PowerShell'],
    },
    {
        id: '2',
        name: 'XSS',
        description: 'XSS WAF bypassing payloads',
        substeps: [
            {
                description: 'WAF bypass 1',
                payload: 'Xss payload here',
            },
            {
                description: 'WAF bypass 2',
                payload: 'Another specific waf payload',
            },
        ],
        tags: ['XSS', 'WAF'],
    },
];


const usePayloadStore = create<PayloadStoreState>(
    // @ts-ignore
    persist(
        (set, get) => ({
            payloads: exampleData,
            setPayloads: (payloads) => set({ payloads }),
            remotePayloadURL: '',
            addPayload: (payload) => set((state) => ({ payloads: [...state.payloads, payload] })),
            setRemotePayloadURL: (URL: string) => set({ remotePayloadURL: URL }),
            importPayloadsFromLocalFile: (file: File) => {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const text = (e.target.result as string);
                    try {
                        const data = JSON.parse(text);
                        try {

                            try {
                                Payloads.check(data);
                            } catch (error) {
                                message.error(`Invalid structure`);
                                console.error(`Invalid file content at index ${error.key}`);
                                return;

                            }
                            set({ payloads: data });
                            message.success('Payloads imported successfully');
                        } catch (error) {
                            message.error('Invalid structure' + "\n" + error);
                            console.error('Invalid file content' + "\n" + error);
                        }
                    } catch (error) {
                        message.error('Failed to parse JSON' + "\n" + error);
                        console.error('Failed to parse JSON' + "\n" + error);
                    }
                };
                reader.readAsText(file);
            },
            importPayloadFromURL: async () => {
                const response = await fetch(get().remotePayloadURL);
                const data = await response.json();
                try {
                    Payloads.check(data);
                    set({ payloads: data });
                    message.success('Payloads imported successfully');
                } catch (error) {
                    message.error(`Invalid structure ${error}`);
                    console.error(`Invalid structure ${error.key}`);
                    return;
                }
            },
            exportPayloadsAsJSON: () => {
                const data = JSON.stringify(get().payloads);
                const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
                saveAs(blob, `htools_payloads_${new Date().toISOString()}_${new Date().getTime()}.json`);
            }
        }),
        {
            name: 'private-cheatsheet-payload-store',
            getStorage: () => storage,
        }
    )
);


export default usePayloadStore;
