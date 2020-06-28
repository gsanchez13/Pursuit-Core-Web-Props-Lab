import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  let sampleDonations = [
    {
      name: 'John Doe',
      amount: 500,
      caption: `Let's all give to this great cause!`,
    },
    {
      name: 'John Doe',
      amount: 500,
      caption: `Let's all give to this great cause!`,
    },
    {
      name: 'John Doe',
      amount: 500,
      caption: `Let's all give to this great cause!`,
    },
  ];
  const blankDonation = {
    name: '',
    amount: 0,
    caption: '',
  };
  const [donations, setDonations] = useState(sampleDonations);
  const [newDonation, setNewDonation] = useState(blankDonation);
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
    let arrOfDonationAmts = donations.map((el) => {
      return parseInt(el.amount)
    });
    let sumDonations = arrOfDonationAmts.reduce((total, curr) => {
      return total += curr
    }, 0);
    let total = Math.floor((sumDonations / goal) * 100);
    setTotalPercentage(total)
    setTotalDonations(sumDonations)
  };
  useEffect(() => {
    updateTotalDonations()
  }, [donations]);

  const updateDonation = (key) => (e) => {
    e.preventDefault();
    setNewDonation({ ...newDonation, [key]: e.target.value });
  };
  const submitNewDonation = (e) => {
    e.preventDefault();
    if (newDonation.name && newDonation.amount && newDonation.caption) {
      setDonations([newDonation, ...donations]);
      setNewDonation(blankDonation);
    }
  };
  return (
    <div className='container'>
      <div className='header' style={{ textAlign: "center", marginTop: '-40px', height: '30vh', backgroundColor: '#e9ecef', paddingTop: '4vh' }}>
        <p style={{ fontSize: '5vh', fontWeight: '10px' }}>Go Fund Me</p>
        <p style={{ fontSize: '3vh', color: 'dimgray' }}>Help me go on a beach vacation somewhere</p>
      </div>
      <br />
      <div className='grid-container' style={{ display: 'grid', gridTemplateColumns: '30% 50%', height: '60vh', gridGap: '10px', justifyContent: 'center' }}>
        <div className='past-donations' style={{ backgroundColor: '#e9ecef', overflow: 'auto', paddingLeft: '9%', paddingRight: '9%' }}>
          <h3>Recent Donations </h3>
          <div className='donations-holder' style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column' }}>
            {jsxDonations}
          </div>
        </div>
        <div className='donation-status' style={{ paddingLeft: '5%' }}>
          <h3>Raised ${totalDonations} of ${goal}</h3>
          <progress value={totalDonations} max={goal} style={{ width: '100%', height: '2vh', backgroundColor: '#e9ecef', color: 'white' }} label={totalPercentage} />
          <hr />
          <div className='donation-form'>
            <form onSubmit={submitNewDonation}>
              <label htmlFor='name'>Name</label>
              <br />
              <br />
              <input id='name' type='outlined' style={{ width: '100%', height: '3vh' }} placeholder='John Doe' value={newDonation.name} onChange={updateDonation('name')} />
              <br />
              <br />
              <label htmlFor='caption'>Caption</label>
              <br />
              <br />
              <input id='caption' type='outlined' style={{ width: '100%', height: '3vh', textAlign: 'left', resize: 'vertical' }} maxLength='50' placeholder='...' value={newDonation.caption} onChange={updateDonation('caption')} />
              <br />
              <br />
              <label>Amount to Donate: <b>${newDonation.amount}</b></label>
              <input type='range' style={{ width: '100%', height: '3vh' }} min='0' max={goal} step='100' value={newDonation.amount} onChange={updateDonation('amount')}></input>
              <br />
              <br />
              <button type='submit' style={{ backgroundColor: 'green', float: 'right' }}>Donate</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
