import { useEffect, useState } from "react";

interface DataOrderDynamic {
    currentTimeUnix: number,
    transactionId: string,
    orderNumber: string
}

export const useDataOrderDynamic = () => {

    const [dataOrderDynamic, setDataOrderDynamic] = useState<DataOrderDynamic>()

    console.log("DATA_ORDER", JSON.stringify(dataOrderDynamic))

    const getDataOrderDynamic = () => {
        const currentTimeUnix = Math.floor(Date.now()) * 1000;
        const transactionId = currentTimeUnix.toString().slice(0, 14);
        const orderNumber = currentTimeUnix.toString().slice(0, 10).toString();

        setDataOrderDynamic({
            currentTimeUnix,
            transactionId,
            orderNumber
        })

    }

    return {
        dataOrderDynamic,
        getDataOrderDynamic
    };

};
