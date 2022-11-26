import { IXGatewayController } from "@episto/x-gateway";
import { ActionParams } from "./ActionParams";

export type Controller<T> = IXGatewayController<T, ActionParams>;