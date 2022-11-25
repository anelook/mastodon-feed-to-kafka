import {login} from "masto";

export default async (callback: (status: string) => void) => {
    try {
        const masto = await login({
            url: 'https://fosstodon.org/',
        });

        // Connect to the streaming api
        const stream = await masto.stream.streamPublicTimeline();

        // Subscribe to updates
        stream.on('update', (status) => {
            try {
                callback(JSON.stringify(status));
            } catch (err) {
                console.log('Failed to send message', err);
            }

        });
    } catch (err) {
        console.log(err)
    }
};
