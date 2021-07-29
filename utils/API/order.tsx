import {post} from './utils'

const submitOrder = async (callback:void, order:object) => {
    const path = `/controlOrder`;
    const result = await post(path, null, order);
    callback(result.data);
}

const submitAutoOrder = async (callback:void, order:object) => {
    const path = `/controlAutoOrder`;
    const result = await post(path, null, order);
    callback(result.data);
}

export {submitOrder, submitAutoOrder }