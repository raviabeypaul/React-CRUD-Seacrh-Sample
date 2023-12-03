export const checkValueIsNumber = (value : string)=>{
    const regex = /^[0-9\b]+$/;
    return regex.test(value)
}

export const isEmailValid = (input: string)=>{
    const regex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isEmailValid = input.match(regex) ? true : false;
    return isEmailValid;
}

export const hasValue = (input : string)=>{
    return input.length>0 ? true : false
}