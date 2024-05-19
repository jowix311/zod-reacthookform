/**
 * We are using ShadCN https://ui.shadcn.com/docs/components/form for the reusable components
 * Follow ShadCN steps on initializing it on the project
 *
 *
 * npm i -save-dev @hookform/resolvers for the resolver
 */
import "./App.css";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const myFormSchema = z.object({
  username: z.string().min(2).max(50),
});

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function App() {
  const myForm = useForm<z.infer<typeof myFormSchema>>({
    resolver: zodResolver(myFormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof myFormSchema>) {
    console.log("my form values", values);
  }

  return (
    <Form {...myForm}>
      <form onSubmit={myForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={myForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default App;
