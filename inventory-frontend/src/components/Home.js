import React from 'react';

//Home page of the app
//for now it's a simple greeting
export const Home = () => {
   
    return (
        <div>
            <div className="Greeting" data-testid="greeting">
                <h1>Welcome to the Inventory Management System</h1>
                <h3>Please select an option from the navbar</h3>
            </div>
        </div>
    )
};