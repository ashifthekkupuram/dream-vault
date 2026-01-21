import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { authClient } from "../lib/auth-client";
import { Alert, AlertDescription } from "../components/ui/alert";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await authClient.signIn.email(values, {
      onRequest: () => {
        setLoading(true);
        setError(null);
      },
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        setError(error.error.message);
      },
      onResponse: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-medium tracking-tight">
            Welcome back to your DreamVault
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to continue journaling your dreams
          </p>
        </div>

        <Card className="border-border/40 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>Enter your email and password</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {error && (
                  <Alert
                    variant="destructive"
                    className="border-red-500/50 bg-red-500/10"
                  >
                    {/* <AlertCircle className="h-4 w-4" /> */}
                    {/* <AlertTitle>Error</AlertTitle> */}
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="examble@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="***********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : "Sign In"}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-primary cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
