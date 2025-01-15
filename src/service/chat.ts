

export const chatService = {
    sendMessage: async (event: any) => {
        return {
            status: 200,
            body: event.message.text,
        };
    }
};

