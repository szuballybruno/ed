
export type IXGatewayController<TSelfReference, TParams> = {
    [K in keyof TSelfReference]: (params: TParams) => Promise<any>;
}