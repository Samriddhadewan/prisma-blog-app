import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { env } from "@/env"
import { revalidateTag, updateTag } from "next/cache"
import { cookies } from "next/headers"

const API_URL = env.API_URL;


export default function CreateBlogFromServer() {
  const createBlog = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;

    const blogData = {
      title,
      content,
      tags: tags.split(",").map(item => item.trim()).filter(item => item !== "")
    }
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Cookie: cookieStore.toString()
      },
      body: JSON.stringify(blogData)
    })

    if (res.ok) {
      revalidateTag("blogPosts", "max");
      // updateTag("blogPosts")  use either one of them
    }

    // console.log(res)

  }
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Blog</CardTitle>
        <CardDescription>You can write your blog here</CardDescription>
      </CardHeader>
      <CardContent >
        <form id="blog-form" action={createBlog}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input type="text" name="title" placeholder="Title"></Input>
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Textarea
                id="content"
                name="content"
                placeholder="Write Your Blog"
                required
              />

            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel>Tags</FieldLabel>
              <Input type="text" name="tags" placeholder="reactjs, nextjs, expressJs" required></Input>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="blog-form" type="submit" className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  )
}
