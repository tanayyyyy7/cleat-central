import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, MapPin, Briefcase } from 'lucide-react'

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [notification, setNotification] = useState(null)
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, AN 12345',
    bio: 'Football enthusiast and boot collector. Always looking for the perfect pair to up my game!'
  })
  const [editedDetails, setEditedDetails] = useState({ ...userDetails })

  const handleEdit = () => {
    setIsEditing(true)
    setEditedDetails({ ...userDetails })
  }

  const handleSave = () => {
    setUserDetails({ ...editedDetails })
    setIsEditing(false)
    setNotification("Profile updated successfully")
    setTimeout(() => setNotification(null), 3000) // Clear notification after 3 seconds
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedDetails({ ...userDetails })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedDetails(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>View and edit your profile information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {notification && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{notification}</span>
          </div>
        )}
        <div className="flex items-center space-x-4">
          <User className="h-6 w-6 text-gray-500" />
          <div className="flex-grow">
            <Label htmlFor="name">Name</Label>
            {isEditing ? (
              <Input
                id="name"
                name="name"
                value={editedDetails.name}
                onChange={handleChange}
              />
            ) : (
              <p>{userDetails.name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="h-6 w-6 text-gray-500" />
          <div className="flex-grow">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input
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
          <MapPin className="h-6 w-6 text-gray-500" />
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
        <div className="flex items-start space-x-4">
          <Briefcase className="h-6 w-6 text-gray-500 mt-2" />
          <div className="flex-grow">
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                name="bio"
                value={editedDetails.bio}
                onChange={handleChange}
                rows={3}
              />
            ) : (
              <p>{userDetails.bio}</p>
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
  )
}