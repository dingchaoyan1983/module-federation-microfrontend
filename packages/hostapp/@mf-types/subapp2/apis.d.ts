
    export type RemoteKeys = 'subapp2/App';
    type PackageType<T> = T extends 'subapp2/App' ? typeof import('subapp2/App') :any;