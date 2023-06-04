import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <SignIn routing="path" path="/login" redirectUrl="/rsvps" />
    </div>
  );
}
