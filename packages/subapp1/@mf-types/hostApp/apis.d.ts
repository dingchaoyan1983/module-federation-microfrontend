
    export type RemoteKeys = 'hostApp/HostProvider';
    type PackageType<T> = T extends 'hostApp/HostProvider' ? typeof import('hostApp/HostProvider') :any;