"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          AI Resume Analyzer
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/upload">
            <Button variant="ghost">Upload</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          
          {status === "loading" ? (
            <Button disabled>Loading...</Button>
          ) : session ? (
            <Button onClick={() => signOut()} variant="outline">
              Sign Out
            </Button>
          ) : (
            <Link href="/api/auth/signin">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
