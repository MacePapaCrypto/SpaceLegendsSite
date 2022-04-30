import React, { useContext, useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import discord_img from "./images/discord.png";
import twitter_img from "./images/twitter.png";
import menu_img from "./images/menu.png";
import nftkey from "./images/nftkey.png";
import mace from "./images/mace.png";
import funeral from "./images/funeral.png";
import nate from "./images/nate.jpg";
import sebastion from "./images/sebastion.jpg";
import clifton from "./images/clifton.jpg";
import carson from "./images/carson.jpg";

import { mint, checkTotalSupply, initializeEthers, checkWhitelistPaused, checkPublicPaused, checkIfWhitelisted } from "./functions/ethersFunctions";
import ConnectWallet from "./components/ConnectWallet";
import { Context } from "./Store";

const menuToggle = () => {
    const navlinks = document.querySelector('.nav-links');
    navlinks?.classList.toggle('mobile-menu');
}
function App(this: any) {

  const [active, setActive] = React.useState("Public");
  const [state, dispatch]:any = useContext(Context);
  const [spendInput, setSpendInput] = useState('');

  const handleInput = (event: React.FormEvent<HTMLInputElement>): void => {
      setSpendInput(event.currentTarget.value);
  }

  useEffect(() => {
    async function getInit() {
        await initializeEthers(dispatch);
    }
    getInit();
  },[]);

  useEffect(() => {
    async function getSupply() {
        await checkTotalSupply(dispatch);
        await checkPublicPaused(dispatch);
        await checkWhitelistPaused(dispatch);
        await checkIfWhitelisted(dispatch);
        console.log("mintedAmount: " + state.totalSLSupply)
        console.log("isPublicPaused: " + state.publicPaused);
        console.log("isWhitelistPaused: " + state.whitelistPaused);
        console.log("Whitelisted Address: " + state.isWhitelisted);
    }
    getSupply();
  },[state.walletAddress]);

  return (
    <Router>
    <div className="App">
           <nav className="navbar">
                <h1 className="logo"><a href="https://discord.gg/DWXFSahWQw">SpaceLegends</a></h1>
                <ul className="nav-links">
                    <li><a href="https://www.spacelegends.io">Learn More</a></li>
                    <li><Link to="/"><ConnectWallet/></Link></li>
                </ul>
                <img src={menu_img} alt="" className="menu-btn" onClick={menuToggle}/>
            </nav>
            <header>
            <div>
            <section className="drops">
            <div className="title">
            <h1>Become a legend.</h1>
            <h2>{state.totalSLSupply}/2,500</h2>
            <h4>Each SpaceLegend is 30 FTM</h4>
            </div>
            <div className="row">
                <div className="col">
                <div className="mint-text">
                    {
                            !state.walletAddress ? <h4>Connect Wallet to mint</h4> : 
                            state.walletAddress && !state.publicPaused ? 
                            <>
                                <input id="input" type="number" value={spendInput} onChange={handleInput} placeholder="Amount: Max of 5"/>
                                <br/>
                                <br/>
                                <button onClick={() => mint(dispatch, spendInput)}  disabled={false}>Mint</button>
                            </> : state.walletAddress && !state.whitelistPaused && state.isWhitelisted ?
                            <>
                                <h4>You're on the list. Press the launch button to mint an out of this world NFT.</h4>
                                <input type="number" value={spendInput} onChange={handleInput} placeholder="Amount: Max of 5"/>
                                <br/>
                                <br/>
                                <button onClick={() => mint(dispatch, spendInput)}  disabled={false}>Launch</button>
                            </>
                            : state.walletAddress && !state.whitelistPaused && !state.isWhitelisted ?
                            <>
                                <h4>You missed the early flight list. Check back at 7:00pm UTC for the public flight.</h4>
                            </> : state.walletAddress && state.whitelistPaused && state.publicPaused ?
                            <>
                                <h4>We have the mint paused. Prepare for launch shortly</h4>
                            </> :
                            <>
                                <h4>Hmmmm.....How did you get here.....</h4>
                            </>
                    }
                    
                </div>
                </div>
                <div className="col">
                </div>
            </div>
            </section>
            </div>
            </header>
            <section className="team">
            <div className="team-members">
            <h1>The Team</h1>
            <div className="row">
                <div className="col">
                <a href="https://twitter.com/FantomNimbus"><img className="team-member" src={nate} alt=""/></a>
                <h3>Nate</h3>
                <h4>Community</h4>
                </div>
                <div className="col">
                <a href="https://twitter.com/Sfreebrace"><img className="team-member" src={sebastion} alt=""/></a>
                <h3>Sebastion</h3>
                <h4>Artist</h4>
                </div>
                <div className="col">
                <a href="https://twitter.com/One1exec"><img className="team-member" src={clifton} alt=""/></a>
                <h3>Clifton</h3>
                <h4>Marketing</h4>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <a href="https://twitter.com/Exonaut9"><img className="team-member" src={carson} alt=""/></a>
                <h3>Carson</h3>
                <h4>Founder</h4>
                </div>
                <div className="col">
                <a href="https://twitter.com/yolofinancial"><img className="team-member" src={funeral} alt=""/></a>
                <h3>Funeral</h3>
                <h4>Dev</h4>
                </div>
                <div className="col">
                <a href="https://twitter.com/CryptoMacePapa"><img className="team-member" src={mace} alt=""/></a>
                <h3>MacePapa</h3>
                <h4>Dev</h4>
                </div>
            </div>
            </div>
            </section>
            <section className="info">

                <h1>Win A Zero Gravity Experience</h1>
                <h4>One lucky holder will win the experience of a lifetime to fly aboard Zero-G's Boeing 727 and experience zero gravity. The flight of a lifetime.</h4>

                <h1>Physical Gold Coin</h1>
                <h4>Thirty 22 Karat Gold Coins will be given to thirty lucky holders who mint an NFT from the SpaceLegends collection that have a treasure chest.</h4>

                <h1>Our Passion</h1>
                <h4>Our hope is the SpaceLegends community shares in our passion for space and finds it inspires them each day.</h4>
  
            </section>
            
            <section className="footer">
                <div className="social-links">
                    <a href="https://twitter.com/SPACELEGENDS_"><img src={twitter_img} alt=""/></a>
                    <a href="https://discord.gg/DWXFSahWQw"><img src={discord_img} alt=""/></a>
                    <a href="https://nftkey.app"><img src={nftkey} alt=""/></a>
                  </div>
            </section>
        </div>
        </Router>
    );
}

export default App;
