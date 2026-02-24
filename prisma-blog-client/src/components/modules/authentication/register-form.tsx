"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

import { useForm } from "@tanstack/react-form"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"


const handleGoogleLogin = async () => {
  const data = authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3000",
  })

  console.log(data)
}

const formSchema = z.object({
  name: z.string().min(4, "This field is required!"),
  password: z.string().min(8, "Min Length is 8 required!"),
  email: z.email(),
})

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating User")
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId })
        }

        toast.success('User created successfully', { id: toastId })

      } catch (error) {
        toast.error("Something went wrong")
      }
    }
  })
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}>
          <FieldGroup>
            <form.Field name="name" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  ></Input>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}

                </Field>
              )
            }} />
            <form.Field name="email" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}

                  ></Input>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}

                </Field>
              )
            }} />
            <form.Field name="password" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}

                  ></Input>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}

                </Field>
              )
            }} />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end flex-col gap-3">
        <Button className="w-full" form="login-form" type="submit">Submit</Button>
        <Button className="w-full" onClick={() => handleGoogleLogin()} variant="outline" type="button">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
