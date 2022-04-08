export const base64Encode = (text: string) => Buffer.from(text)
.toString('base64');

export const base64Decode = (encodedText: string) => Buffer.from(encodedText, 'base64')
.toString('ascii');