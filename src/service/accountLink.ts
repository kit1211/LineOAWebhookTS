export const accountLinkService = {
    link: async (event: any) => {
        if(event.type === "message") {
            return {
                status: 200,
                body: event.message.text,
            };
        }
    }
};
