import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  let sampleDonations = [
    {
      name: 'John Doe',
      amount: 500,
      caption: `Let's all give to this great cause!`
    },
    {
      name: 'John Doe',
      amount: 500,
      caption: `Let's all give to this great cause!`
    },
    {
      name: 'John Doe',
      amount: 500,
      caption: `Let's all give to this great cause!`
    },
  ];
  const [donations, setDonations] = useState(sampleDonations);
  const [amountToDonate, setAmountToDonate] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0)
  let goal = 5000;
  let jsxDonations = donations.map((donation) => {
    return (
      <div className='donation-card'>
        <p><b>{donation.name}</b> donated <b>${donation.amount}</b></p>
        <p>{donation.caption}</p>
      </div>
    )
  });
  const updateTotalDonations = () => {
    let sumDonations = donations.reduce((total, curr) => {
      return total += curr.amount
    }, 0);
    let total = Math.floor((sumDonations / goal) * 100);
    setTotalPercentage(total)
    setTotalDonations(sumDonations)
  };
  useEffect(() => {
    updateTotalDonations()
  }, []);

  const updateAmount = (e) => {
    e.preventDefault();
    setAmountToDonate(e.target.value)
  };
  console.log(totalDonations, totalPercentage)
  return (
    <div className='container'>
      <div className='header' style={{ textAlign: "center", marginTop: '-40px', height: '30vh', backgroundColor: '#e9ecef', paddingTop: '4vh' }}>
        <p style={{ fontSize: '5vh', fontWeight: '10px' }}>Go Fund Me</p>
        <p style={{ fontSize: '3vh', color: 'dimgray' }}>Help me go on a beach vacation somewhere</p>
      </div>
      <br />
      <div className='grid-container' style={{ display: 'grid', gridTemplateColumns: '30% 50%', height: '60vh', gridGap: '10px', justifyContent: 'center' }}>
        <div className='past-donations' style={{ backgroundColor: '#e9ecef', overflow: 'auto', paddingLeft: '9%' }}>
          <h3>Recent Donations </h3>
          <div className='donations-holder' style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column' }}>
            {jsxDonations}
          </div>
        </div>
        <div className='donation-form' style={{ paddingLeft: '5%' }}>
          <h3>Raised ${totalDonations} of ${goal}</h3>
          <progress value={totalDonations} max={goal} style={{ width: '100%', height: '2vh', backgroundColor: '#e9ecef', color: 'white' }} label={totalPercentage}/>
        </div>
      </div>
    </div>
  );
}

export default App;
