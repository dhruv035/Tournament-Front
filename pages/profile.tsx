"use client";

import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContractRead, useAccount } from "wagmi";
import myContract from "../abi/BracketGenerator.json";
import Link from "next/link";

import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const abi = myContract.abi;
  const { address } = useAccount();
  const [names, setNames] = useState<string[] | any>([]);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  const { data, isError, isLoading } = useContractRead({
    address:"0x949ba47df69C6C1331F4B9659b1D9913C0451Cfc",
    abi: abi,
    functionName: "getTournaments",
    args: [address],
    onSuccess(data) {
      setNames(data);
    },
  });
  if (!hasMounted) return null;

  return (
    <div className="grid bg-blue-400 w-full h-full absolute">
      {isLoading && <div>isLoading</div>}
      <div className="flex flex-col justify-self-center">
				Your Tournaments
        {names.map((field: string, index: number) => {
          return <Link href={"/tournaments/"+field} key={index}>{field}</Link>;
        })}
      </div>
    </div>
  );
};

export default Home;
