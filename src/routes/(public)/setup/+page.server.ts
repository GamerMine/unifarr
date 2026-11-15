import { fail, redirect } from '@sveltejs/kit';
import { GlobalSettingsEntity } from '@unifarr/db/entities';
import type { PageServerLoad } from './$types';
import { JellyfinConnector } from '@unifarr/connectors';

export const load: PageServerLoad = async ({ locals: { settings } }) => {
	if (settings.globalSettings.jellyfin.baseUrl) throw redirect(301, '/auth/login');
};

export const actions = {
	default: async ({ request }: { request: Request }) => {
		const formData = await request.formData();
		const baseURL = formData.get('baseURL') as string;
		const apiKey = formData.get('apiKey') as string;
		const jellyfinConnection = await new JellyfinConnector(baseURL, apiKey).isHealthy();

		if (!jellyfinConnection) {
			return fail(400, { code: 2 });
		}

		await GlobalSettingsEntity.setJellyfinApiEndpoint(baseURL, apiKey);

		return { success: true };
	}
};
