import React, { useEffect, useState } from 'react';
import { fetchAllModules } from '~~/services/funny/backendConnector';

const ReturnModules = () => {
  const [modules, setModules] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getModules = async () => {
      try {
        const response = await fetchAllModules();
        setModules(response);
      } catch (error) {
        console.error("All module req failed:", error);
        setError((error as Error).message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    getModules();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Modules List</h1>
      <pre>{JSON.stringify(modules.message.data[0].name, null, 2)}</pre>
    </div>
  );
};

export default ReturnModules;
