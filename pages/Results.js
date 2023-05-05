import React, { useEffect, useState } from 'react';
import ResultForm from '@/components/ResultForm/ResultForm';
import ResultTable from '@/components/ResultTable/ResultTable';
import { Divider, notification } from 'antd';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchResults = async () => {
    setLoading(true);
    const res = await fetch('/api/results');
    setLoading(false);
    if (res.status !== 200) {
      notification.error({
        message: 'Error',
        description: 'Error with the result list request, please try it again.',
      });
    }
    const data = await res.json();
    setResults(data.data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      <ResultForm onSubmitSuccess={fetchResults} />
      <Divider />
      <ResultTable loading={loading} data={results} />
    </div>
  );
}

export default Results;
