export type EpistoEmail = {

    to: string;
    subject: string;
    template: {
        name: string;
        params: any;
    }
}