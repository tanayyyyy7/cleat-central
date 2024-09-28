import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import "./BootType.css";


const BootType = ({ title, description, type, value = 'FG' }) => {
  const [boots, setBoots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

      } finally {
        setIsLoading(false);
      }
    };

    fetchBoots();
  }, [type, value]);

  const handleCardClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };


  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className={`bg-${value} py-8 `}>
        <CardTitle className="sm:text-3xl flex items-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className='pt-4 sm:text-xl'>{description}</CardDescription>
        {boots.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Featured Boots:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {boots.map((boot, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center" onClick={() => handleCardClick(boot._id)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <img
                          src={boot.image}
                          alt={boot.name}
                          width={150}
                          height={150}
                          className="object-cover rounded-md"
                        />
                        
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">{boot.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BootType;
