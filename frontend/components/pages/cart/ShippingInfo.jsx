import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info } from 'lucide-react';
const ShippingInfo = () => (
    <span className='flex items-center'>
      <p className='pr-1'>Shipping</p>
      <Popover>
        <PopoverTrigger asChild>
          <Info className='w-4 h-4 cursor-pointer' />
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <p className="text-sm">Free standard shipping <br/>on orders over ₹14,000.</p>
        </PopoverContent>
      </Popover>
    </span>
  );

export default ShippingInfo;