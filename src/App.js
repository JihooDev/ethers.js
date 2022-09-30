import './App.css';
import { ethers, Signer, utils, Wallet } from 'ethers';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [userEth, setUserEth] = useState('');
  const [userAdress, setUserAdress] = useState('');
  const [sendUserMoney,setSendUserMoney] = useState('');
  const [sendAdress,setSendAdress] = useState('');
  const [sendUserBalance,setSendUserBalance] = useState("");
  const [loading,setLoading] = useState(false);
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

  // const getSearchUserBalance = async() => {
  //   try {
  //   if(inputRef.current.value.length === 0) {
  //     alert('입력하세요');
  //     return
  //   }
  //   setSendAdress(inputRef.current.value);
  //   const sendMoney = await provider.getBalance(sendAdress);
  //   const eth = ethers.utils.formatEther(sendMoney);
  //   setSendUserMoney(eth);
  //   } catch {
  //     alert("에러");
  //   }
  // }

  const getBalance = async() => {
    try {
      const blockNumber = await provider.getBlockNumber(); // 블록넘버 가져오기
      const user = await signer.getAddress(); // 사용자의 계정 가져오기
      const balance = await provider.getBalance(user); // 사용자의 잔액 가져오기
      setUserAdress(user);
      setUserEth(ethers.utils.formatEther(balance)); // 사용자의 잔액을 보기좋게 포맷my hn,
    } catch {
      setUserAdress("정보없음");
      setUserEth("");
    }
  }

  const metaMaskOn = async () => {
    setLoading(true);
    try {
      let tx = {
        to : sendAdress,
        value : ethers.utils.parseEther(userEth),
      }
      await signer.signMessage('dmnkasdns');
      // console.log(await wallet.signTransaction(tx))
      await wallet.sendTransaction(tx);
      alert("성공!")
    } catch {
      alert('전송을 실패 했습니다.')
    }
    setLoading(false);
  }

  
  return (
    <div className="App">
      <div>
        <span>0x79884Fd260464238717600F79b414103E8D0de83</span>

        {/* <button onClick={metaMaskOn}>전송</button> */}
      </div>
      <div>
        {
          !loading
          ? <> <h1>잔액</h1>
          <p>{userAdress} : {userEth} ETH</p></>
          : <h1>진행중</h1>
        }
       
        {/* 원본 유지용 필요  */}
        <input type={'text'} ref={inputRef} value={sendAdress} onChange={(e) => setSendAdress(e.target.value)} style={{width : "fit-content"}}/>
        <span style={{padding : "0 20px"}}>으로</span>
        <input type={'number'} value={userEth} onChange={e=>{setUserEth(e.target.value)}}/>
        <button onClick={metaMaskOn}>지급하기</button>
      </div>
    </div>
  );
}

export default App;
