import './App.css';
import { ethers, Signer, utils, Wallet } from 'ethers';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [userEth, setUserEth] = useState('');
  const [userAdress, setUserAdress] = useState('');
  const [sendUserMoney,setSendUserMoney] = useState('');
  const [sendAdress,setSendAdress] = useState('');
  const [sendUserBalance,setSendUserBalance] = useState("");
  const inputRef = useRef();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); // 사용자의 정보를 가져오는 함수
  // const memonic = 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol';
  // const wallet = Wallet.fromMnemonic(memonic);
  const wallet = new ethers.Wallet('d217ac90d838b15e1a1e6d5287ae19f7168464c542deb3099a4ee6c66256b236',provider)

  // const walletKey = new Wallet(wallet.privateKey);
  // console.log(walletKey,'adsf');
 
  useEffect(() => {
    getBalance();
    // console.log(walletKey.address === wallet.address);
  }, [])

  const getSearchUserBalance = async() => {
    try {
    if(inputRef.current.value.length === 0) {
      alert('입력하세요');
      return
    }
    setSendAdress(inputRef.current.value);
    const sendMoney = await provider.getBalance(sendAdress);
    const eth = ethers.utils.formatEther(sendMoney);
    setSendUserMoney(eth);
    } catch {
      alert("에러");
    }
  }

  const getBalance = async() => {
    try {
      const blockNumber = await provider.getBlockNumber(); // 블록넘버 가져오기
      const user = await signer.getAddress(); // 사용자의 계정 가져오기
      const balance = await provider.getBalance(user); // 사용자의 잔액 가져오기
      setUserAdress(user);
      setUserEth(ethers.utils.formatEther(balance)); // 사용자의 잔액을 보기좋게 포맷
    } catch {
      setUserAdress("정보없음");
      setUserEth("");
    }
  }

  // const metaMaskOn = async () => {
  //   const domain = {
  //     name: 'teammapa.hoo',
  //     version: '1',
  //     chainId: 4,
  //     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
  //   };

  //   const types = {
  //     Person: [
  //       { name: 'wallet', type: 'address' }
  //     ],
  //     Mail: [
  //       { name: 'from', type: 'Person' },
  //       { name: 'to', type: 'Person' },
  //       { name: 'contents', type: 'string' }
  //     ]
  //   };

  //   const value = {
  //     from: {
  //       name: 'Kim',
  //       wallet: userAdress
  //     },
  //     to: {
  //       name: 'Hoo',
  //       wallet: sendAdress
  //     },
  //     contents: 'MONEY!',
  //   };

  //   await signer._signTypedData(domain, types, value);

  //   let a = await signer.sendTransaction();

  //   console.log(signer.getTransactionCount());
  // }


  const metaMaskOn = async () => {
    let gas = await provider.getGasPrice();

    let parseValue = ethers.utils.formatUnits(5000000000000000, 18);
    console.log(parseValue,'value');


    let gasFinal = utils.formatEther(gas);
    console.log(gasFinal);

    let tx = {
      to : "0xAb1f96bd07CA450199AF3e2214Efc3CD78e03873",
      value : ethers.utils.parseEther(parseValue),
      // gasLimit: 50000
    }


    await wallet.signMessage('dmnkasdns');
    await wallet.sendTransaction(tx);
  }

  
  return (
    <div className="App">
      <div>
        <span>0x79884Fd260464238717600F79b414103E8D0de83</span>
        <input type={'text'} ref={inputRef} />
        <button onClick={getSearchUserBalance}>검색</button>
        {/* <button onClick={metaMaskOn}>전송</button> */}
      </div>
      <div>
        <h1>잔액</h1>
        <p>{sendAdress.length < 1 ? userAdress : sendAdress} : {sendUserMoney.length < 1 ? userEth : sendUserMoney} ETH</p>
        {/* 원본 유지용 필요  */}
        <input type={'number'} value={userEth} onChange={e=>{setUserEth(e.target.value)}}/>
        <button onClick={metaMaskOn}>지급하기</button>
      </div>
    </div>
  );
}

export default App;
