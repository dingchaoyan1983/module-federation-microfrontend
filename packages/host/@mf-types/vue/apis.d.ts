
    export type RemoteKeys = 'vue/App';
    type PackageType<T> = T extends 'vue/App' ? typeof import('vue/App') :any;