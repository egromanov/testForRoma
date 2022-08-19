import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {

  // Properties

  const [walletAddress, setWalletAddress] = useState("");
  const realWalletAddress = "0x52cbc30830650aa032e49e330240ce334fa302c6";
  const abiOfContract = [
    {
     "inputs": [],
     "stateMutability": "nonpayable",
     "type": "constructor"
    },
    {
     "inputs": [
      {
       "internalType": "address payable",
       "name": "_creator",
       "type": "address"
      }
     ],
     "name": "transferMoney",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "withdrawPendingBalance",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
    },
    {
     "stateMutability": "payable",
     "type": "receive"
    }
   ]
   
  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
    }
  }

  async function callContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const smartContract = new ethers.Contract(realWalletAddress, abiOfContract, provider.getSigner());
    const tx = await smartContract.transferMoney('0xBBd835Df91c54fE840BfE36F617eF500ff88E7B5', {value: ethers.utils.parseEther("0.15")});
    await tx.wait()
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
        
        onClick={requestAccount}
        
        >Request Account</button>
        <h3>Wallet Address: {walletAddress}</h3>
        <button onClick={callContract}>Call contract</button>
      </header>
    </div>
  );
}

export default App;