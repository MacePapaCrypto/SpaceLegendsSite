import { BigNumber, ethers } from 'ethers';
import { useContext } from 'react';
import { Context } from '../Store';
import slABI from '../contractABIs/slABI.json';


declare const window:any;
let provider:any = undefined;
let slContract:any = undefined;
const FANTOM_NETWORK_ID = "250";

//Provider and Initialization
export const initializeEthers = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const addr = await signer.getAddress();

    if (window.ethereum.networkVersion === FANTOM_NETWORK_ID) {
      dispatch({type:"onFantomNetwork", content:true});
    }
    dispatch({type: 'walletContextDetected', content: true });
    dispatch({type: 'triggerAll', content: false});

    slContract = new ethers.Contract(
      "0xdc50cBe355C39C0619DF2060a05DE111C8A77f39",
      slABI,
      signer
    );

    console.log(slContract);

    return addr;
  } catch (error) {
    console.log(error);
    dispatch({type: 'walletContextDetected', content: false });
    dispatch({type:"onFantomNetwork", content: false});
    return undefined;
  }
}

export const checkNetwork = () => {
  try {
    return (window.ethereum.networkVersion === FANTOM_NETWORK_ID);
  } catch {
    return false;
  }
}

export const checkTotalSupply = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const supplyOfSL = await slContract.totalSupply();
    console.log(supplyOfSL.toNumber());
    dispatch({type: 'totalSLSupply', content: supplyOfSL.toNumber()});
  } catch(error) {
    console.log(error);
    dispatch({type: 'errorMessage', content: error});
  }
}

export const checkWhitelistPaused = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const isPaused = await slContract.whitelistPaused();
    console.log("isWhitelistPaused: " + isPaused);
    dispatch({type: 'whitelistPaused', content: isPaused})
  } catch(error) {
    console.log(error);
    dispatch({type: 'errorMessage', content: error});
  }
}

export const checkPublicPaused = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const isPaused = await slContract.publicPaused();
    console.log("isPublicPaused: " + isPaused);
    dispatch({type: 'publicPaused', content: isPaused})
  } catch(error) {
    console.log(error);
    dispatch({type: 'errorMessage', content: error});
  }
}

export const checkIfWhitelisted = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const userAddress = signer.getAddress();
    const isWhitelistedNumber = await slContract.whitelistedAddresses(userAddress);
    console.log("Whitelisted Address Response: " + isWhitelistedNumber);
    if(isWhitelistedNumber.toNumber() === 1) {
      console.log("Made it");
      dispatch({type: 'isWhitelisted', content: true});
    } else {
      console.log("Didn't make it");
      dispatch({type: 'isWhitelisted', content: false});
    }
  } catch(error) {
    dispatch({type: 'errorMessage', content: error});
    return console.log(error);
  }
}

export const mint = async (dispatch:any, amountToMint:any) => {
  try {
    if(amountToMint > 5) {
      amountToMint = 5;
    }
    const ftmAddress = '0x0000000000000000000000000000000000000000'
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const cost = 30;
    const totalyPayout = cost * amountToMint;
    let gasLimitForTx = amountToMint * 280000;
    console.log(totalyPayout);
    try {
      const connectedSLContract = await slContract.connect(signer);
      const tx = await connectedSLContract.mint(ftmAddress, amountToMint,
        {gasLimit: gasLimitForTx, "value": ethers.utils.parseUnits(totalyPayout.toString(),'ether')}
      );
    } catch(error) {
      dispatch({type: 'errorMessage', content: error});
      return console.log(error);
    }
  } catch(error) {
    dispatch({type: 'errorMessage', content: error});
    return console.log(error);
  }
}