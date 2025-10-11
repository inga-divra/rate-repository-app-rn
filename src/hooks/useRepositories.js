import { useState, useEffect } from 'react';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        'http://192.168.1.100:5000/api/repositories'
      );
      if (!response) {
        throw new Error(`HTTP${response.status}`);
      }
      const data = await response.json();
      setRepositories(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, error, refetch: fetchRepositories };
};

export default useRepositories;
