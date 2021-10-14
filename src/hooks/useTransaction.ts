declare let window: any;

export const sendTransactionToContract = async (
    from: string | null | undefined,
    to: string | null | undefined,
    data?: string,
): Promise<string> => {
    const txParams = {
        from: from,
        to: to,
        data: data
    }
    return await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txParams]
    })
}