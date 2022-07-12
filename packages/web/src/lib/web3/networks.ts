export const getChainId = (network: string): number => {
    let chainId = 0
    switch (network) {
        case "ethereum":
            chainId = 1;
            break;
        case "rinkeby":
            chainId = 4;
            break;
        case "kovan":
            chainId = 42;
            break;
        case "polygon":
            chainId = 137;
            break;
        case "fuji":
            chainId = 43113;
            break;
        case "avax":
            chainId = 43114;
            break;
        case "mumbai":
            chainId = 80001;
            break;
    }
    return chainId
}