import { useState, useEffect } from 'react';
import './App.css';
import upcomingEvents from './upcomingEvents';
import EventBanner from './components/EventBanner/eventBanner';

function App() {
  return (
    <>
      <h1 className="micketTasterTitle">MicketTaster</h1>
      <div className="selectionText">Select your experience:</div>
      <div className="eventBanners">
        {upcomingEvents.map((event) => {
          return (
            <EventBanner
              key = {event.id}
              {...event}
            />
          )
        })}
      </div>
    </>
  )
}

export default App;
