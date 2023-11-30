import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "../../createPersistedState";

type Wifi = { ssid: string; auth: string; password: string };
type Email = { to: string; subject: string; message: string };
type SMS = { number: string; message: string };
type Event = {
	title: string;
	description: string;
	location: string;
	date: [string, string];
};

export type FormValues = {
	url: string;
	text: string;
	wifi: Wifi;
	email: Email;
	tel: string;
	sms: SMS;
	event: Event;
	color: string;
	bgColor: string;
	dig: boolean;
};

interface QRState {
	formValues: FormValues;
	setFormValues: (values: FormValues) => void;
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

const useQRStore = create<QRState>(
	// @ts-ignore
	persist(
		(set) => ({
			formValues: {
				url: "",
				text: "",
				wifi: { ssid: "", auth: "", password: "" },
				email: { to: "", subject: "", message: "" },
				tel: "",
				sms: { number: "", message: "" },
				event: { title: "", description: "", location: "", date: ["", ""] },
				color: "",
				bgColor: "",
				dig: true,
			},
			setFormValues: (values) => set({ formValues: values }),
			activeTab: "1",
			setActiveTab: (tab) => set({ activeTab: tab }),
		}),
		{
			name: "qr-generator-store",
			getStorage: () => localStorage, // replace with your storage method
		}
	)
);

export default useQRStore;
