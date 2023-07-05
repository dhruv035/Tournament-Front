
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import React, { FunctionComponent, useState } from "react";
import { useContractWrite, useContractRead } from "wagmi";
import myContract from "../abi/BracketGenerator.json"
import { SecurityUpdateWarningRounded } from '@mui/icons-material';

type Props = {
	match: Match;
	tname: string;
	write: any;
}
type Match = {
	id: number;
	teama: number;
	teamb: number;
	winner: number;

}
type Team = {
	id:number;
	name?: string;
}

const Fixture: FunctionComponent<Props> = ({match,tname,write}:Props) => {
	const [win,setWin]=useState(0)
	const {id,teama,teamb,winner} = match;
	const [teams,setTeams] = useState<any>([])
	const [open, setOpen] = React.useState(false);
	const handleOpen = (winner:any) => {
		setWin(winner)
		setOpen(true);
	}
	const handleClose = () => {
		setWin(0)
		setOpen(false);}
	const {data:dataRead,isLoading:readLoading}= useContractRead({
		address: process.env.CONTRACT,
		abi:myContract.abi,
		functionName: 'getTournamentParticipants',
		args:[tname],
		onSuccess(data){
			setTeams(data);
		}
	})
	
	
  return (
	<div>
		
		<div className="w-60 h-30 bg-white" onClick={()=>handleOpen(teama)}>
			{teams[teama-1]?teams[teama-1].name:"----"}
		</div>
		<div className="w-60 h-30 bg-white" onClick={()=>handleOpen(teamb)}>
			{teams[teamb-1]?teams[teamb-1].name:"----"}
		</div>

		<Dialog
		  open={open}
		  onClose={handleClose}
		>
			<div>
			Do you want to select this team as the winner of this matchup?
			<Button onClick={()=>{write({args:[tname,id,win]}); handleClose()}}>
				Yes
			</Button>
			<Button onClick={handleClose}>No</Button>
			</div>
		</Dialog>
	</div>
  );
};

export default Fixture;
