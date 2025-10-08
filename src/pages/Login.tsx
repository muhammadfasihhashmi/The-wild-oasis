import { LoginForm } from "@/components/features/authentication/LoginForm";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src="img/login-image.jpeg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-fill"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-muted">
        <div className="flex justify-center gap-2 md:justify-start"></div>
        <div className="flex flex-1 items-center justify-center">
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
