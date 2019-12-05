import React, {useState, useEffect, useContext} from 'react';
import './App.css'

const PremiumContext = React.createContext()

class Amount extends React.Component {
  render() {
    return (
      <label className={this.props.value < 0 ? 'error' : ''}>
        {this.props.name}: 
        <input 
          type="number" 
          value={this.props.value}
          disabled={!this.props.onChange}
          onChange={
            this.props.onChange 
              ? e => this.props.onChange(parseFloat(e.target.value)) 
              : null
          }          
        />
      </label>
    )
  }
}

function Converter({cryptoName, exchangeRate, renderTitle}) {
  const [euros, setEuros] = useState(1000)  
  const onConversion = useContext(PremiumContext)

  return <div className="converter">
    {renderTitle && (
      <header>
        {renderTitle()}
      </header>
    )}
    <Amount 
        name="Euros" 
        value={euros} 
        onChange={euros => {
          setEuros(euros);
          onConversion();
        }}       
      />
    <Amount 
      name={cryptoName} 
      value={euros * exchangeRate}        
    />     
  </div>
}

export default function App() {  
  const [count, setCount] = useState(0)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    if (count >= 5 && !isPremium) alert("Try our freemium trial")
  }, [count]);

  const incrementCount = () => setCount(count + 1)

  return (
    <PremiumContext.Provider value={incrementCount}>
      <Converter 
        cryptoName="$BTC" 
        exchangeRate={3.7} 
        renderTitle={() => <strong>Bitcoins 💲!</strong>}
      />    
      <Converter 
        cryptoName="$ETH" 
        exchangeRate={3.7} 
        renderTitle={() => <strong>Ethereum 🤑!</strong>}
      />    
      <Converter 
        cryptoName="$LTC" 
        exchangeRate={3.7} 
        renderTitle={() => <strong>Litecoins 💰!</strong>}
      />   
      {isPremium ? (
        <strong>💎 Premium conversion</strong>
      ) : (
        <button onClick={() => setIsPremium(true)}>
          😎 Become premium
        </button>   
      )}
    </PremiumContext.Provider>
  )
}
