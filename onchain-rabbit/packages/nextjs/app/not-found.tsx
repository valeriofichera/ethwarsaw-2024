import React from 'react';
import { NoPage } from '~~/components/assets/NoPage';
import 'animate.css';
import '~~/styles/globals.css';


const NotFoundPage = () => {
  return (
    <a href="/">
    <div className="flex flex-col items-center justify-center mt-12">
      <h1>404 - Page Not Found</h1>
      <div className='animate__animated animate__flip animate__infinite'>
      <NoPage/>
      </div>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Go back home</p>
    </div>
    </a>
  );
};

export default NotFoundPage;