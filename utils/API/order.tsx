import {post} from './utils'

const submitOrder = async (callback:void, order:object, idToken:string) => {
    const path = `/controlOrder`;
    const result = await post(path, idToken, order);
    callback(result.data);
}

const submitAutoOrder = async (callback:void, order:object, idToken:string) => {
    const path = `/controlAutoOrder`;
    const result = await post(path, idToken, order);
    callback(result.data);
}

export {submitOrder, submitAutoOrder }