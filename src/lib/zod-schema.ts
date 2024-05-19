import { z } from "zod";
//https://dev.to/franciscolunadev82/creating-dynamic-forms-with-react-typescript-react-hook-form-and-zod-3d8
/**
 *
 * With no ZOD but nice introduction
 * https://www.youtube.com/watch?v=tvEeNPy7OVA
 * @6:13 - append array
 * @7:00 - remove item
 *
 *
 * Good to watch
 * https://www.youtube.com/watch?v=cc_xmawJ8Kg
 *
 * Closer to Goal (with ShadCN and fits the our Goal!)
 * https://www.youtube.com/watch?v=hVdfWyaHpIE
 *
 * Other Ideas
 * https://www.youtube.com/watch?v=WmYqlp91jKQ
 */

export const FruitSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
});

// export const FruitsSchema = z.object({
//   fruits: z.array(FruitSchema),
// });
