import React from 'react';

//Home page of the app
//a Greeting page with some information about the app
//some images of the app
// a link to the github repo
export const Home = () => {
   
    return (
        <div>
            <div className="Greeting" data-testid="greeting">
                <h1>Welcome to the Inventory Management System</h1>
                <h2>Please select an option from the navbar</h2>
                
                <p>This is a simple inventory management system that allows you to manage your inventory</p>
                <p>It is a simple CRUD application that allows you to create, update, delete and view your inventory</p>
                <p></p>
            </div>
            <div className="Images" data-testid="images">
                <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt=""/>
                <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt=""/>
                <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt=""/>
            </div>

            <div className="Github" data-testid="github">
                <a href="https://github.com/MARTINS2309/inventoryV2">
                    <img src="https://img.icons8.com/color/48/000000/github.png" alt=""/>
                </a>
            </div>

        </div>
    )
};