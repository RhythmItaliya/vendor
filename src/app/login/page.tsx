'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Button from '../ui/Button';
import Footer from '../ui/Footer';

const LoginPage = () => {
     const [loading, setLoading] = useState(false);

     const handleLogin = async () => {
          setLoading(true);
          await signIn('google');
     };

     return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center">
               <h1 className="text-2xl font-bold mb-2 text-center">Vendor App</h1>
               <div className="text-center text-base text-gray-600 mb-2">
                    A simple vendor app Assignment
               </div>
               <div className="mb-8 text-gray-700 text-sm text-center">
                    Next.js, NextAuth.js, Prisma, MongoDB, Tailwind CSS
               </div>
               <form
                    onSubmit={(e) => {
                         e.preventDefault();
                         handleLogin();
                    }}
               >
                    <Button
                         type="submit"
                         disabled={loading}
                         aria-busy={loading}
                         className="w-64 h-14 text-lg"
                    >
                         Login with Google
                    </Button>
               </form>
               <Footer />
          </div>
     );
};

export default LoginPage;
