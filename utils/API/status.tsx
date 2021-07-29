import { get } from './utils';

const getOrders = async (callback) => {
    const path = `/getOrders`;
    const result = await get(path);
    callback(result.data);
}

const getPositionStatus = async (callback) => {
    const path = `/getPositionStatus`;
    const result = await get(path);
    callback(result.data);
}

export {getOrders, getPositionStatus}