import { CSSProperties } from "react";
import { Image } from "@chakra-ui/react";
import { ClassBuilder, ClassBuilderCustomizationFnType } from "../../../helpers/classBuilder";
import { TempomatModeType } from "../../../shared/types/sharedTypes";
import { getAssetUrl } from "../../../static/frontendHelpers";

export const TempomatModeImage = (props: {
    isSmall?: boolean,
    isSelected?: boolean,
    mode: TempomatModeType,
    customizeFn?: ClassBuilderCustomizationFnType,
    style?: CSSProperties
}) => {

    const { mode, style, isSmall, isSelected, customizeFn } = props;

    const url = (() => {

        if (mode === "auto")
            return getAssetUrl("/images/autopilot.png");

        if (mode === "balanced")
            return getAssetUrl("/images/balancedmode.png");

        if (mode === "light")
            return getAssetUrl("/images/lightmode.png");

        if (mode === "strict")
            return getAssetUrl("/images/strictmode.png");
    })();

    return isSmall
        ? <Image
            src={url}
            style={style}
            className={new ClassBuilder()
                .customize(customizeFn)
                .build()} />
        : <Image
            background={isSelected ? "#97c9cc50" : "#efefef"}
            border="none"
            cursor="pointer"
            transition=".2s ease-in-out"
            boxShadow={isSelected ? "inset -2px -2px 6px rgba(255, 255, 255, .7), inset -2px -2px 4px rgba(255, 255, 255, .5), inset 2px 2px 2px rgba(255, 255, 255, .075), inset 2px 2px 4px rgba(0, 0, 0, .15)" : "-6px -6px 14px rgba(255, 255, 255, .7), -6px -6px 10px rgba(255, 255, 255, .5), 6px 6px 8px rgba(255, 255, 255, .075), 6px 6px 10px rgba(0, 0, 0, .15)"}
            _hover={{
                boxShadow: "-2px -2px 6px rgba(255, 255, 255, .6), -2px -2px 4px rgba(255, 255, 255, .4), 2px 2px 2px rgba(255, 255, 255, .05), 2px 2px 4px rgba(0, 0, 0, .1)"
            }}
            _active={{
                boxShadow: "inset -2px -2px 6px rgba(255, 255, 255, .7), inset -2px -2px 4px rgba(255, 255, 255, .5), inset 2px 2px 2px rgba(255, 255, 255, .075), inset 2px 2px 4px rgba(0, 0, 0, .15)"
            }}
            p="10px"
            objectFit="contain"
            alt=""
            w="140px"
            h="80px"
            src={url}
            style={style}
            className={new ClassBuilder()
                .customize(customizeFn)
                .build()} />
}