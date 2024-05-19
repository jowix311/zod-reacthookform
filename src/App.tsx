/**
 * We are using ShadCN https://ui.shadcn.com/docs/components/form for the reusable components
 * Follow ShadCN steps on initializing it on the project
 *
 *
 * npm i -save-dev @hookform/resolvers for the resolver
 *
 * https://dev.to/franciscolunadev82/creating-dynamic-forms-with-react-typescript-react-hook-form-and-zod-3d8
 * https://www.youtube.com/watch?v=tvEeNPy7OVA
 *
 *
 * This is our FINAL reference for the dynamic form
 * https://www.youtube.com/watch?v=hVdfWyaHpIE
 */
import "./App.css";

import { z } from "zod";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { FruitSchema } from "./lib/zod-schema";

const myFormSchema = z.object({
  username: z.string().min(2).max(50),
  fruits: z.array(FruitSchema), //1. We add array schema here, we separate it to make it clean
  // keeping code for reference
  // fruits: z.array(
  //   z.object({
  //     name: z.string(),
  //     quantity: z.string(),
  //   })
  // ),
  // end keeping code for reference
});

function App() {
  const myForm = useForm<z.infer<typeof myFormSchema>>({
    resolver: zodResolver(myFormSchema),
    defaultValues: {
      username: "",
      fruits: [{ name: "zz", quantity: "100" }], //2. We add default values here, this could be empty an empty array
    },
  });

  function onSubmit(values: z.infer<typeof myFormSchema>) {
    console.log("my form values", values); //3. we log the values of the for
  }

  const {
    fields,
    append: appendFruit,
    remove: removeFruit,
  } = useFieldArray({
    name: "fruits",
    control: myForm.control,
  }); //4. We utilize useFieldArray to handle the array of dynamic fields (in our case, fruits)

  const handleAddFruit = () => {
    appendFruit({ name: "", quantity: "" });
  }; //5. Create a function to add a new fruit field

  return (
    <Form {...myForm}>
      <form
        onSubmit={myForm.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[460px] mx-auto"
      >
        <FormField
          control={myForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  className="text-black"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="button" onClick={handleAddFruit} className="block mb-2">
          Add Fruit
        </Button>

        {/*
         6. We loop the fields array to render the dynamic fields
            key={field.id} => use field.id as key
            name={`fruits.${index}.name`} => this is how we map to field 

            7. Also, we use removeFruit(index) to remove the field
            
            */}
        {fields.length === 0 && <p>No fruits! You can add one!</p>}
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex gap-1 items-center">
              <FormField
                control={myForm.control}
                name={`fruits.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fruit Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="fruit name"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={myForm.control}
                name={`fruits.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="quantity"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => removeFruit(index)}>
                Remove Fruit
              </Button>
            </div>
          );
        })}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default App;
