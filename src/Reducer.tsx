export const defaultState = {
    walletAddress: "",
    walletContextDetected: false,
    onFantomNetwork: false,
    totalSLSupply: 0,
    errorMessage: "",
    isWhitelisted: false,
    whitelistPaused: true,
    publicPaused: true,
};

const formatAddress = (addressString:any) => {
  if (addressString.length === 42) {
    return addressString.substring(0,6) + "..." + addressString.substring(38,42);
  } else {
    return "";
  }
}

const Reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'walletAddress':
      return {
        ...state,
        walletAddress: action.content
      };
    case 'walletContextDetected':
      return {
        ...state,
        walletContextDetected: action.content
      }
    case 'onFantomNetwork':
      return {
        ...state,
        onFantomNetwork: action.content
      }
    case 'totalSLSupply':
      return {
        ...state,
        totalSLSupply: action.content
      }
    case 'errorMessage':
      return {
        ...state,
        errorMessage: action.content
      }
    case 'isWhitelisted':
      return {
          ...state,
          isWhitelisted: action.content
      }
    case 'whitelistPaused':
        return {
            ...state,
            whitelistPaused: action.content
        }
    case 'publicPaused':
      return {
          ...state,
          publicPaused: action.content
      }
    default:
      return state;
  }
};

export default Reducer;