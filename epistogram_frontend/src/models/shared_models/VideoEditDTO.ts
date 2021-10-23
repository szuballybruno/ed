export type VideoEditDTO = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    videoLengthSeconds: number;
    videoFileUrl: string | null;
}