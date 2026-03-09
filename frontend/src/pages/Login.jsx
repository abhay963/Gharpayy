import { SignIn } from "@clerk/clerk-react";

export default function Login() {

  return (

    <div className="flex items-center justify-center h-screen bg-gray-950">

      <SignIn
        appearance={{
          elements: {
            card: "bg-gray-900 text-white",
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700"
          }
        }}
      />

    </div>

  );

}