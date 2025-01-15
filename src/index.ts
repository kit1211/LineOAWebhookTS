import { Elysia }             from "elysia";
import { verifySignature }    from "./utils/helper";
import { chatService }        from "./service/chat";
import { accountLinkService } from "./service/accountLink";

const app = new Elysia();
const CHANNEL_SECRET = "9f7f3f92f328168e59ce16582f9867e4"; // นำจาก LINE Developers Console






app.post("/webhook", async ({ body, headers }: { body: any; headers: any }) => {
    const signature = headers["x-line-signature"];
    const rawBody   = JSON.stringify(body);

    if (!signature || !verifySignature(rawBody, signature, CHANNEL_SECRET)) {
        return {
            status: 401,
            body: "Unauthorized",
        };
    }

    const events = body.events || [];
    for (const event of events) {
        if (event.type === "message" && event.message.type === "text") {
            try {
                await accountLinkService.link(event);   
                // await chatService.sendMessage(event);
            } catch (error: any) {
                console.error(error.message);
            }
        }
    }

    return {
        status: 200,
        body: "OK",
    };
});

app.listen(8811, () => {
    console.log(`🚀 LINE Webhook is running on http://localhost:8811/webhook`);
});
