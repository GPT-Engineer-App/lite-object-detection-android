import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useQuery } from '@tanstack/react-query';

const fetchResults = async () => {
  const response = await fetch('/api/results');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Results = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['results'],
    queryFn: fetchResults,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Detection Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            <h2 className="text-2xl">Detected Objects</h2>
            <ul>
              {Object.entries(data.objectCounts).map(([objectClass, count]) => (
                <li key={objectClass}>{objectClass}: {count}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;