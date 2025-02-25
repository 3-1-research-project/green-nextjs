import { z } from "zod";

export type Tweet = {
  id: number;
  author_id: number;
  author_name: string;
  author_email: string;
  text: string;
  pub_date: number;
  flagged: number;
};

const postTweetSchema = z.object({
  message: z.string(),
});

type PostTweetSchemaType = z.infer<typeof postTweetSchema>;

export { postTweetSchema };
export type { PostTweetSchemaType };
