import { google } from '@google-cloud/dialogflow/build/protos/protos';
import { IntentsClient, SessionsClient } from '@google-cloud/dialogflow';

export const getDialogflowResponses = async (
    message: string,
    dialogFlowSessionId: string,
    pathToServiceAccount: string,
    languageCode = 'pt-br',
): Promise<
    [google.cloud.dialogflow.v2.IDetectIntentResponse, google.cloud.dialogflow.v2.IDetectIntentRequest, any]
> => {
    const sessionClient = new SessionsClient({
        keyFilename: pathToServiceAccount,
    });
    const projectId = await sessionClient.getProjectId();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, dialogFlowSessionId);

    const request: google.cloud.dialogflow.v2.IDetectIntentRequest = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    };

    return await sessionClient.detectIntent(request);
};

export const getIntents = async (pathToServiceAccount: string): Promise<google.cloud.dialogflow.v2.IIntent[]> => {
    const intentsClient = new IntentsClient({
        keyFilename: pathToServiceAccount,
    });
    const projectId = await intentsClient.getProjectId();

    const projectAgentPath = intentsClient.agentPath(projectId);

    const request = {
        parent: projectAgentPath,
    };

    const [response] = await intentsClient.listIntents(request);

    return response;
};

export const getDialogflowMessages = (
    responses: [google.cloud.dialogflow.v2.IDetectIntentResponse, google.cloud.dialogflow.v2.IDetectIntentRequest, any],
): string[] => {
    const result = responses[0].queryResult;

    const messages: string[] = [];

    if (result.fulfillmentMessages) {
        for (const fullfilmentMessage of result.fulfillmentMessages) {
            if (fullfilmentMessage.text && fullfilmentMessage.text.text) {
                const text = fullfilmentMessage.text.text.length > 0 ? fullfilmentMessage.text.text[0] : null;
                if (text) {
                    messages.push(text);
                }
            }
        }
    }

    return messages;
};
