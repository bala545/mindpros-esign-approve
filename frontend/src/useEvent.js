import { useState, useContext, createContext } from "react";

const EventContext = createContext();

export const useEvent = () => {
  return useContext(EventContext);
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({ approvalQueueClicked: false });

  const triggerEvent = (eventName) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventName]: true,
    }));
  };

  return (
    <EventContext.Provider value={{ events, triggerEvent }}>
      {children}
    </EventContext.Provider>
  );
};
