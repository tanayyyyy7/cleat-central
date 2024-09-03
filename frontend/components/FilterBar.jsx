
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';

const FilterBar = () => {
    const form = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission here
  };

  return (
    <div className="h-full border bg-background text-foreground border-b">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mx-4">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Search by name"  {...field} />
            </FormControl>
            <FormMessage /> {/* Display error messages if needed */}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="course"
        render={({ field }) => (
          <FormItem className="mx-4">
            <FormLabel>Course</FormLabel>
            <FormControl>
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course1">Course 1</SelectItem>
                  <SelectItem value="course2">Course 2</SelectItem>
                  {/* Add more course options */}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Similarly add other form fields (course year, subject, semester) */}

      <Button 
      className="mx-5 my-5"
      type="submit">Submit</Button>
    </form>
    </Form>
    </div>
  );
};

export default FilterBar;
