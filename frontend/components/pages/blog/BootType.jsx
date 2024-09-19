import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"

const BootType = ({ title, description, type, value }) => {
    const [boots, setBoots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBoots = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const params = {};
          if (type === 'surfaceType') params.surfaceType = value;
          if (type === 'shoeHeight') params.shoeHeight = value;
  
          const response = await axios.get('/api/products/filtered', { params });
          setBoots(response.data.slice(0, 3)); // Get up to 3 boots
        } catch (err) {
          setError('Failed to fetch boots');
          console.error('Error fetching boots:', err);
        } finally {
          setIsLoading(false);
        }
      };
      
    fetchBoots();
}, [type, value]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        {boots.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Featured Boots:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {boots.map((boot, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={boot.image}
                    alt={boot.name}
                    width={150}
                    height={150}
                    className="object-cover rounded-md"
                  />
                  <p className="mt-2 text-sm text-center">{boot.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BootType;
