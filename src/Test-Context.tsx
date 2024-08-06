import React, { createContext, useContext } from "react";

// Step 1: Create a Context with a type
interface User {
  name: string;
  age: number;
}

const UserContext = createContext<User | undefined>(undefined);

const Test: React.FC = () => {
  const user: User = { name: "John", age: 30 };

  return (
    // Step 2: Provide the Context
    <UserContext.Provider value={user}>
      <ParentComponent />
    </UserContext.Provider>
  );
};

const ParentComponent: React.FC = () => {
  return <ChildComponent />;
};

const ChildComponent: React.FC = () => {
  return <GrandChildComponent />;
};

const GrandChildComponent: React.FC = () => {
  // Step 3: Consume the Context
  const user = useContext(UserContext);

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      {user.name} is {user.age} years old.
    </div>
  );
};

export default Test;
