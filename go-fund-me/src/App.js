import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  let goal = 1000;
  let sampleDonations = [
    {
      name: 'John Doe',
      amount: 100,
      caption: `Let's all give to this great cause!`,
    },
    {
      name: 'John Doe',
      amount: 100,
      caption: `Let's all give to this great cause!`,
    },
    {
      name: 'John Doe',
      amount: 100,
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
    if (newDonation.name !== '' && newDonation.amount !== 0 && newDonation.caption !== '') {
      setDonations([newDonation, ...donations]);
      setNewDonation(blankDonation);
    }
  };
  return (
    <div className='container'>
      <section class="jumbotron text-center">
        <h1 class="jumbotron-heading">Go Fund Me</h1>
        <p class="lead text-muted">Help me go on a vacation to a beach somewhere</p>
      </section>
      <br />
      <div className='grid-container'
        style={{ display: 'grid', gridTemplateColumns: '30% 50%', height: '60vh', gridGap: '10px', justifyContent: 'center' }}>
        <div
          className='past-donations'
          style={{ backgroundColor: '#e9ecef', overflow: 'auto', paddingLeft: '9%', paddingRight: '9%' }}>
          <h3>Recent Donations </h3>
          <div className='donations-holder'
            style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column' }}>
            {jsxDonations}
          </div>
        </div>
        <div className='donation-status' style={{ paddingLeft: '5%' }}>
          <h3>Raised ${totalDonations} of <span class='text-muted'>${goal}</span></h3>
          <div className='progress'>
            <div
              aria-valuenow={totalDonations}
              aria-valuemax={goal}
              aria-valuenow={totalPercentage}
              style={{ width: { totalDonations }, height: '2vh', fontSize: '1.5vh' }}
              className='progress-bar bg-success'
              role="progressbar"
            >{totalPercentage}%</div>
          </div>
          <hr />
          <div className='donation-form'>
            <form onSubmit={submitNewDonation}>
              <label htmlFor='name'>Name</label>
              <input id='name' type='outlined' placeholder='John Doe' value={newDonation.name} onChange={updateDonation('name')} className='form-control' />
              <br />
              <label htmlFor='caption'>Caption</label>
              <input id='caption' type='outlined' maxLength='50' placeholder='...' value={newDonation.caption} onChange={updateDonation('caption')} className='form-control' />
              <br />
              <br />
              <label>Amount to Donate: <b>${newDonation.amount}</b></label>
              <input type='range' style={{ width: '100%', height: '3vh' }} min='0' max={goal} step='5' value={newDonation.amount} onChange={updateDonation('amount')} className='custom-range'></input>
              <br />
              <br />
              <button type='submit' className='btn btn-success' style={{ float: 'right' }}>Donate</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
