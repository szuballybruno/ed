export const JestLogger = {
    logMain: (text: string) => console.log('[JEST] ---------------------------- ' + text),
    log: (text: string) => console.log(text)
};