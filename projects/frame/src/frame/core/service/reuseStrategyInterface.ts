import { DetachedRouteHandle } from '@angular/router';

export interface IRouteConfigData {
    reuse?: boolean;
    title?: string;
}

export interface ICachedRoute {
    handle: DetachedRouteHandle;
    data: IRouteConfigData;
}