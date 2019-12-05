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

export default function App() {
  const [euros, setEuros] = useState(1000)
  const [exchangeRate, setExchangeRate] = useState(Math.random() * 1000)  
  return (
    <>
      <Amount 
        name="Euros" 
        value={euros} 
        onChange={setEuros}       
      />
      <Amount 
        name="$BTC" 
        value={euros * exchangeRate}        
      />
      {exchangeRate ===  0 && (
        <button onClick={() => setExchangeRate(Math.random() * 1000)}>
          Recover BTC Market
        </button>
      )}
    </>
  )
}