import { get } from './utils';

const getOrders = async (callback:void, idToken:string) => {
    const path = `/getOrders`;
    const result = await get(path,idToken);
    callback(result.data);
}

const getPositionStatus = async (callback:void, idToken:string) => {
    const path = `/getPositionStatus`;
    const result = await get(path, idToken);
    callback(result.data);
}

export {getOrders, getPositionStatus}