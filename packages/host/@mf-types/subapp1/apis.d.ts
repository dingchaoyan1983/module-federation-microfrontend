
    export type RemoteKeys = 'subapp1/App' | 'subapp1/Subapp1Component';
    type PackageType<T> = T extends 'subapp1/Subapp1Component' ? typeof import('subapp1/Subapp1Component') :T extends 'subapp1/App' ? typeof import('subapp1/App') :any;