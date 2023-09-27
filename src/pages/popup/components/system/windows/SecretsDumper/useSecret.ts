// src/pages/popup/components/system/windows/SecretsDumper/useSecret.ts
import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import { storage } from '../../../createPersistedState';
import { message } from 'antd';
export const BLANK_LM_HASH = "aad3b435b51404eeaad3b435b51404ee"

interface UserData {
    lm_hash: string;
    nt_hash: string;
    rid: number;
    username: string;
}

interface SAMData {
    HBoot_key: string;
    local_users: UserData[];
}

interface SAMProps {
    data: {
        SAM: SAMData;
        SYSTEM: {
            BootKey: string;
            CurrentControlSet: string;
        };
    };
}

interface SecretsState {
    serverURL: string;
    setServerURL: (server_URL: string) => void;
    serverAPIKey: string;
    setServerAPIKey: (server_API_Key: string) => void;
    serverPingTest: () => Promise<boolean>;
    serverAuthTest: () => Promise<boolean>;
    isServerReady: boolean;


    isServerConnectModalVisible: boolean;
    setIsServerConnectModalVisible: (visible: boolean) => void;

    data: SAMProps['data'] | null;
    samFileList: any[];
    systemFileList: any[];
    setData: (data: SAMProps['data']) => void;
    setSamFileList: (list: any[]) => void;
    setSystemFileList: (list: any[]) => void;

    

}

export const useSecretsStore = create<SecretsState>(
    // @ts-ignore
    persist(
        (set, get) => ({
            serverURL: 'http://localhost:8001',
            setServerURL: (serverURL) => set({ serverURL }),
            serverAPIKey: '',
            isServerReady: false,
            setServerAPIKey: (serverAPIKey) => set({
                serverAPIKey
            }),
            serverPingTest: async () => {
                try {
                    const response = await fetch(`${get().serverURL}/ping`);
                    const data = await response.json();
                    if (data.status === 'success') {
                        return true;
                    } else {
                        return false;
                    }
                } catch (error) {
                    return false;
                }
            },
            isServerConnectModalVisible: false,
            setIsServerConnectModalVisible: (visible) => set({ isServerConnectModalVisible: visible }),
            serverAuthTest: async () => {
                try {
                    const response = await fetch(`${get().serverURL}/auth_check`, {
                        headers: {
                            "x-api-key": get().serverAPIKey
                        }
                    });
                    const data = await response.json();
                    if (data.status === 'success') {
                        message.success("Authenticated");
                        set({ isServerReady: true });
                        return true;
                    } else {
                        set({ isServerReady: false });
                        message.error("Invalid API Key");
                        return false;
                    }
                } catch (error) {
                    return false;
                }
            
    },

            data: null,
            samFileList: [],
            systemFileList: [],
            setData: (data) => set({ data }),
            setSamFileList: (list) => set({ samFileList: list }),
            setSystemFileList: (list) => set({ systemFileList: list }),
        }),
        {
            name: 'windows-secrets-store',
            getStorage: () => storage
        }
    )
);