"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<string>(currentYear.toString());
  const router = useRouter();

  useEffect(() => {
    router.push(`/${year}/`, )
  }, [year])


  return (
    <div>
    </div>
  );
};

export default Home;
