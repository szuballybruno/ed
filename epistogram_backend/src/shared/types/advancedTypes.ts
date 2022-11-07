
export type KeyOfType<TObject, TKey> = keyof {
    [TProp in keyof TObject as TObject[TProp] extends TKey ? TProp : never]: any
}

export type OmitProperty<TObj, TProps extends keyof TObj> = Omit<TObj, TProps>;