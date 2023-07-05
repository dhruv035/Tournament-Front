"use client";

import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContractRead, useContractWrite } from "wagmi";
import myContract from "../../abi/BracketGenerator.json";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Fixture from "../../components/Fixture"

const Home: NextPage = () => {

	const [hasMounted, setHasMounted] = useState(false);
	const [size,setSize]=useState(0);
	const [rounds, setRounds]= useState(0);
	const abi = myContract.abi;
  const router = useRouter();
  const { address } = useAccount();
  const [matchups, setMatchups] = useState([]);

	useEffect(() => {
    setHasMounted(true);
  }, []);

	const { data:datawin, isSuccess, write } = useContractWrite({
    address: process.env.CONTRACT,
    abi: myContract.abi,
    functionName: 'matchResult',
		onSuccess(data){
			refetch();
		}
  })

  const { data, isError, isLoading,refetch } = useContractRead({
    address: process.env.CONTRACT,
    abi: abi,
    functionName: "getTournamentMatchups",
    args: [router.query.name],
    onSuccess(data) {
			let temp =data;
			for(let i = 0;i<data.length;i++)
			{
					temp[i].id= Number(data[i].id);
					temp[i].teama=Number(data[i].teama);
					temp[i].teamb= Number(data[i].teamb);
					temp[i].winner=Number(data[i].winner);
				
			}
      setMatchups(temp);
			let i=1;
			let j=(data.length+1)/2;
			while(j>1)
			{
				i++;
				j=j/2;
			}
			setRounds(i);
			setSize((data.length+1)/2)
    },
		
  });
	const rounders=[...Array(rounds)];
	const rmatchups=[...matchups].reverse();
	if (!hasMounted) return null;
  return (
    <div className="grid bg-blue-400 w-full h-full absolute">
      {!isLoading && <div className="flex flex-row-reverse justify-self-center">
				{
					rounders.map((rounder,ri)=>{
						return(
							<div className="flex flex-col-reverse justify-center mx-5">
								{
									rmatchups.slice((2**ri)-1,2**(ri+1)-1).map((matchup,mi)=>{
										return(
											<div className="my-10">
												<Fixture match={matchup} tname={String(router.query.name)} write={write}/>
											</div>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
			
				}
    </div>
  );
};

export default Home;
