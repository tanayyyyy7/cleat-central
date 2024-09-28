import React from 'react';
import { Link, Element } from 'react-scroll';
import BootType from './BootType';
import NavBar from '../shared-components/NavBar';
import Footer from '../shared-components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

export default function KnowYourBoots() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <NavBar />
      </header>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl sm:text-8xl font-bold mb-8">Know Your Boots</h1>
        <Separator className="mb-4"/>
        <nav className="mb-8">
          <ul className="flex justify-start space-x-4">
            <li>
              <Button variant="outline">
                <Link to="surface-types" smooth={true} duration={500} className="cursor-pointer">
                  Surface Types
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="outline">
                <Link to="boot-styles" smooth={true} duration={500} className="cursor-pointer">
                  Boot Styles
                </Link>
              </Button>
            </li>
          </ul>
        </nav>

        <Element name="surface-types">
          <h2 className="text-2xl sm:text-4xl font-semibold mb-4">Surface Types</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <BootType
              title="FG (Firm Ground)"
              description="Designed for natural grass pitches. These boots have molded studs that provide optimal traction on firm, dry surfaces."
              type="surfaceType"
              value="FG"
            />
            <BootType
              title="MG (Multi Ground)"
              description="Versatile boots suitable for various playing surfaces. These boots feature a combination of molded and bladed studs, providing traction on both firm ground and artificial turf."
              type="surfaceType"
              value="MG"
            />
            <BootType
              title="TF (Turf)"
              description="Ideal for artificial turf or hard ground. These boots have numerous small rubber studs for excellent traction on harder surfaces."
              type="surfaceType"
              value="TF"
            />
            <BootType
              title="IC (Indoor Court)"
              description="Designed for indoor courts or futsal. These boots have flat, non-marking rubber soles for optimal grip on smooth indoor surfaces."
              type="surfaceType"
              value="IC"
            />
          </div>
        </Element>

        <Element name="boot-styles">
          <h2 className="text-2xl font-semibold mb-4">Boot Styles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <BootType
              title="High-Top"
              description="Provides maximum ankle support. Popular among defenders and midfielders who need extra protection during tackles."
              type="shoeHeight"
              value="High-Top"
            />
            <BootType
              title="Low-Top"
              description="Traditional style offering maximum flexibility and agility. Preferred by speedy wingers and strikers for quick movements."
              type="shoeHeight"
              value="Low-Top"
            />
          </div>
        </Element>
      </div>
      <Footer />
    </div>
  );
}