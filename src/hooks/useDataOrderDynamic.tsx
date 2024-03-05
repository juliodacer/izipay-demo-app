import { useState } from "react";
import { generateDataOrderDynamic } from "../utils/utils";

interface DataOrderDynamic {
    currentTimeUnix: number,
    transactionId: string,
    orderNumber: string
}

export const useDataOrderDynamic = () => {

    const [dataOrderDynamic, setDataOrderDynamic] = useState<DataOrderDynamic>()

    const getDataOrderDynamic = () => {
        const dataOrderDynamic = generateDataOrderDynamic()
        setDataOrderDynamic({
            ...dataOrderDynamic
        })
    }

    return {
        dataOrderDynamic,
        getDataOrderDynamic
    };

};
