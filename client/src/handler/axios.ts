import axios from "axios";

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:9785/api"
			: "https://traitsurfer.app/api",
});

export default instance;
