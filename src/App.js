import React, {useState} from 'react';
import './App.css'

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
  return <div className="converter">
    {renderTitle && (
      <header>
        {renderTitle()}
      </header>
    )}
    <Amount 
        name="Euros" 
        value={euros} 
        onChange={setEuros}       
      />
    <Amount 
      name={cryptoName} 
      value={euros * exchangeRate}        
    />     
  </div>
}

export default function App() {  
  return (
    <>
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
    </>
  )
}
