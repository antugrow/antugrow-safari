import { NotificationProvider } from "@refinedev/core";
import toast from "react-hot-toast";

const notificationProvider: NotificationProvider = {
	open: ({ message, key, type, description }) => {
		switch (type) {
			case "error":
				// custom error toast and include the description
				toast.error(description, { id: key });
				break;
			case "progress":
				toast.loading(message, { id: key, className: "text-blue-500 bg-blue-100 border-blue-500 border-2 rounded-md" });
				break;
			case "success":
				toast.success(description, { id: key, icon: "✅" });
				break;
		}
	},
	close: (key) => {
		toast.dismiss(key);
	},
};

export default notificationProvider;
