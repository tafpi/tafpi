import {createClient} from "next-sanity";

export const client = createClient({
	projectId: 'zy7jezu4',
	dataset: 'production',
	apiVersion: '2023-06-22',
	useCdn: false,
	token: process.env.SOURCE_TOKEN
});