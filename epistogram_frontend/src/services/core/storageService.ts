import { VolumeSettingsType } from '../../models/types';

export const writeVolumeSettings = (volumeSettings: VolumeSettingsType) => {

    writeStorage('volume_settings', JSON.stringify(volumeSettings));
};

export const readVolumeSettings = () => {

    const volumeSettingsJSON = readStorage<string>('volume_settings');
    if (!volumeSettingsJSON)
        return null;

    try {

        return JSON.parse(volumeSettingsJSON) as VolumeSettingsType;
    }
    catch {

        return null;
    }
};

const writeStorage = (key: string, data: any) => {

    window.localStorage.setItem(key, data);
};

const readStorage = <TData>(key: string) => {

    return window.localStorage.getItem(key) as any as TData | null;
};