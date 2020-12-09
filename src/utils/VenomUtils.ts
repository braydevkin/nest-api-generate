import { Whatsapp } from 'venom-bot';
import { sleep } from './TimeUtils';

export const getUserWid = (cellphone: string): string => `${cellphone}@c.us`;
export const getGroupWid = (cellphone: string): string => `${cellphone}@g.us`;

export const getTypingDelayInSeconds = (message: string, charactersPerSecond = 10): number => {
    const messageSize = message.length;
    const delay = messageSize / charactersPerSecond;
    return delay;
};

export const sendImage = async (
    wid: string,
    path: string,
    client: Whatsapp,
    isSendingDelayActive = true,
    sendingDelayInSeconds = 1,
): Promise<void> => {
    if (!isSendingDelayActive) {
        await client.sendImage(wid, path, 'imagem');
        return;
    }
    await sleep(sendingDelayInSeconds);
    await client.sendImage(wid, path, 'imagem');
};

export const sendAudio = async (
    wid: string,
    url: string,
    client: Whatsapp,
    isSendingDelayActive = true,
    sendingDelayInSeconds = 1,
): Promise<void> => {
    if (!isSendingDelayActive) {
        await client.sendFile(wid, url, 'audio');
        return;
    }
    await sleep(sendingDelayInSeconds);
    await client.sendFile(wid, url, 'audio');
};

export const sendVideo = async (
    wid: string,
    url: string,
    client: Whatsapp,
    isSendingDelayActive = true,
    sendingDelayInSeconds = 1,
): Promise<void> => {
    if (!isSendingDelayActive) {
        await client.sendFile(wid, url, 'audio');
        return;
    }
    await sleep(sendingDelayInSeconds);
    await client.sendFile(wid, url, 'audio');
};

export const sendVenomMessage = async (
    wid: string,
    message: string,
    client: Whatsapp,
    isTypingDelayActive = true,
    secondsPerCharacter?: number,
): Promise<void> => {
    if (!isTypingDelayActive) {
        await client.sendText(wid, message);
        return;
    }
    console.log('Start typing...');
    client.startTyping(wid).catch(() => {
        return;
    });
    const delay = getTypingDelayInSeconds(message, secondsPerCharacter);
    await sleep(delay);
    await client.sendText(wid, message);
    client.stopTyping(wid);
};

export const getPushName = async (wid: string, client: Whatsapp): Promise<string> => {
    const contact = await client.getContact(wid);
    return contact?.pushname || contact?.verifiedName || contact?.id?.user || '';
};
