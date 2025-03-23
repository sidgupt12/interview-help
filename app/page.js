'use client'
import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="p-3 flex justify-between items-center shadow-md">
        <h2 className="font-bold">Welcome to Interview Helper</h2>
        <UserButton />
      </div>
      <div className="mt-50 flex flex-col justify-center items-center">
        <Button onClick={()=>router.push('/dashboard/')} >Start Learning</Button>
      </div>
    </div>
    
  );
}
