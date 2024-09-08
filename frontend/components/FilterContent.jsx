import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

const FilterContent = () => (
    <ScrollArea className="h-[calc(100vh-4rem)] ">
        <div className="space-y-4 p-4">
          <div>
            <Label className="block mb-2">Keywords</Label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Spring</Badge>
              <Badge variant="secondary">Smart</Badge>
              <Badge variant="secondary">Modern</Badge>
            </div>
          </div>
          <div>
            <Label className="block mb-2">Category</Label>
            <div className="space-y-2">
              {['Lifestyle', 'Running', 'Basketball', 'Football'].map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`category${index}`} />
                  <label htmlFor={`category${index}`} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label className="block mb-2">Price</Label>
            <Input type="range" min="0" max="100" />
          </div>
          <div>
            <Label className="block mb-2">Size</Label>
            <div className="space-y-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`size${index}`} />
                  <label htmlFor={`size${index}`} className="text-sm">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label className="block mb-2">Brands</Label>
            <div className="space-y-2">
              {['Nike','Adidas', 'Puma', 'New Balance', 'Umbro'].map((size, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`size${index}`} />
                  <label htmlFor={`size${index}`} className="text-sm">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    )

export default FilterContent;