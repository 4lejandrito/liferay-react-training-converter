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

function Converter({cryptoName, exchangeRate}) {
  const [euros, setEuros] = useState(1000)  
  return <div className="converter">
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
      <Converter cryptoName="$BTC" exchangeRate={3.7} />
      <Converter cryptoName="$ETH" exchangeRate={1.2} />
      <Converter cryptoName="$TRX" exchangeRate={1.8} />
      <Converter cryptoName="$XRP" exchangeRate={1.4} />
    </>
  )
}
