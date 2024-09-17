import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Briefcase, House } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function UserProfile() {
  const { isLoggedIn, verifyToken, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });
  const { toast } = useToast();

  useEffect(() => {
    fetchUserProfile();
    console.log('Current userDetails:', userDetails);
  }, [isLoggedIn]);


  const fetchUserProfile = async () => {
    await verifyToken();
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    axios.get('/api/user-profile/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then((response) => {
      setUserDetails(response.data.userProfile);
      setEditedDetails(response.data.userProfile);
    }).catch((error) => {
      toast({
        title: "Oops!",
        description: "Error fetching profile. Please try again later.",
        variant: "destructive",
      });
      setUserDetails({});
      setEditedDetails({});
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDetails({ ...userDetails });
  };

  const handleSave = async () => {
    await verifyToken();
    const token = localStorage.getItem('token');
    axios.post('/api/user-profile/',
      editedDetails,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    ).then((res) => {
      setUserDetails(res.data.updatedUser);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }).catch((error) => {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDetails({ ...userDetails });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>View and edit your profile information</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <User className="h-6 w-6 text-gray-500" />
          <div className="flex-grow">
            <Label htmlFor="firstName">First Name</Label>
            {isEditing ? (
              <Input
                id="firstName"
                name="firstName"
                value={editedDetails.firstName}
                onChange={handleChange}
              />
            ) : (
              <p>{userDetails.firstName}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <User className="h-6 w-6 text-gray-500" />
          <div className="flex-grow">
            <Label htmlFor="lastName">Last Name</Label>
            {isEditing ? (
              <Input
                id="lastName"
                name="lastName"
                value={editedDetails.lastName}
                onChange={handleChange}
              />
            ) : (
              <p>{userDetails.lastName}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="h-6 w-6 text-gray-500" />
          <div className="flex-grow">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input
                disabled
                id="email"
                name="email"
                type="email"
                value={editedDetails.email}
                onChange={handleChange}
              />
            ) : (
              <p>{userDetails.email}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="h-6 w-6 text-gray-500" />
          <div className="flex-grow">
            <Label htmlFor="phone">Phone</Label>
            {isEditing ? (
              <Input
                id="phone"
                name="phone"
                value={editedDetails.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{userDetails.phone}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <House className="h-6 w-6 text-gray-500" />
          <div className="flex-grow">
            <Label htmlFor="address">Address</Label>
            {isEditing ? (
              <Input
                id="address"
                name="address"
                value={editedDetails.address}
                onChange={handleChange}
              />
            ) : (
              <p>{userDetails.address}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="h-6 w-6 text-gray-500" />
          <div className="flex-grow">
            <Label htmlFor="pincode">Pincode</Label>
            {isEditing ? (
              <Input
                id="pincode"
                name="pincode"
                value={editedDetails.pincode}
                onChange={handleChange}
              />
            ) : (
              <p>{userDetails.pincode}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </>
        ) : (
          <Button onClick={handleEdit}>Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  );
}