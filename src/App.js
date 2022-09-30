import './App.css';
import {ethers, Signer, Wallet} from 'ethers';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [userEth,setUserEth] = useState('');
  const [userAdress,setUserAdress] = useState('');
  const inputRef = useRef();


  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(); // 사용자의 정보를 가져오는 함수

  const getBalance = async() => {
    const blockNumber = await provider.getBlockNumber(); // 블록넘버 가져오기
    const user = await signer.getAddress(); // 사용자의 계정 가져오기
    const balance = await provider.getBalance(user); // 사용자의 잔액 가져오기
    setUserAdress(user);
    setUserEth(ethers.utils.formatEther(balance)); // 사용자의 잔액을 보기좋게 포맷
  }

  const getSearchUserBalance = async() => {
    setUserAdress(inputRef.current.value);
    const searchUser = await provider.getBalance(userAdress);
    setUserEth(ethers.utils.formatEther(searchUser));
    console.log(userEth);
  }

  useEffect(()=>{
    getBalance();
  },[])
  return (
    <div className="App">
      <div>
        <input type={'text'} ref={inputRef}/>
        <button onClick={getSearchUserBalance}>검색</button>
      </div>
      <div>
        <h1>{userAdress} 잔액</h1>
        <p>{userAdress} : {userEth} ETH</p>
      </div>
    </div>
  );
}

export default App;
