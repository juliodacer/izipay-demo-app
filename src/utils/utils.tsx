
export const getDataOrderDynamic = () => {

    const currentTimeUnix = Math.floor(Date.now()) * 1000;
    const transactionId = currentTimeUnix.toString().slice(0, 14);
    const orderNumber = currentTimeUnix.toString().slice(0, 10).toString();

    return {
        currentTimeUnix,
        transactionId,
        orderNumber,
    };

};
