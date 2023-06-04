import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUp routing={"path"} path={"/signup"} />
    </div>
  );
}
