
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContract } from "./utils/load-contract";


function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  })

  const [balance, setBallance] = useState(null)
  const [account, setAccount] = useState(null)
  const [ reloadAfter ,reload] = useState(false)

  const reloadEffect = useCallback(()=>reload(!reloadAfter),[reloadAfter])

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract("Faucet", provider)

      if (provider) {
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        })
      } else {
        console.error("Please, install Metamask.")
      }
    }

    loadProvider()
  }, [])

  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api
      const balance = await web3.eth.getBalance(contract.address)
      setBallance(web3.utils.fromWei(balance, "ether"))
    }

    web3Api.contract && loadBalance()
  }, [web3Api,reloadAfter])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }

    web3Api.web3 && getAccount()
  }, [web3Api.web3])



  const addFunds = useCallback(async()=>{

    const  {contract,web3} =  web3Api

    await contract.addFunds({
      from: account,
      value : web3.utils.toWei("1","ether")
    })


    // window.location.reload()   // reloads the browser

    reloadEffect()



  },[web3Api,account,reloadEffect])


  const withdraw = async()=>{

    const  {contract,web3} =  web3Api
    const withdrawAmount  = web3.utils.toWei("0.1","ether")


    await contract.withdraw(withdrawAmount,{
      from: account,
      
    })


    // window.location.reload()   // reloads the browser

    reloadEffect()



  }


  











  return (
    <>
      <div className="tile">
        <div className="faucet">
          <div className="is-flex is-align-items-center">
            <span>
              <strong className="mr-2">Account: </strong>
            </span>
              { account ?
                <div>{account}</div> :
                <button
                  className="button is-small"
                  onClick={async () =>{
                   await web3Api.provider.request({method: "eth_requestAccounts"}
                  )}}
                >
                  Connect Wallet
                </button>
              }
          </div>
          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          <button onClick={addFunds}
            className="button is-link mr-2">Donate 1 eth</button>
          <button onClick={withdraw}
            className="button is-primary">Withdraw</button>
          <p class ="is-size-6  has-text-justified is-family-sans-serif mt-5">
          Note -  Only 0.1 eth can be withdrawn at a time !
        </p>
        </div>
       
        
        
        
      </div>
      
    </>
  );
}

export default App;
