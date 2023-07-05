
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import React, { FunctionComponent, useState } from "react";
import { useContractWrite, useContractRead, useAccount } from "wagmi";
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
	const {address}=useAccount();
	const handleOpen = (winner:any) => {
		setWin(winner)
		setOpen(true);
	}
	const handleClose = () => {
		setWin(0)
		setOpen(false);}
	const {data:dataRead,isLoading:readLoading}= useContractRead({
		address: "0x949ba47df69C6C1331F4B9659b1D9913C0451Cfc",
		abi:myContract.abi,
		functionName: 'getTournamentParticipants',
		args:[tname,address],
		onSuccess(data){
			setTeams(data);
		}
	})
	console.log('teama,teamb,winner,id :>> ', teama,teamb,winner,id);
	
	
  return (
	<div>
		
		<div className={"w-60 h-30 bg-white " + (winner===teama?"bg-lime-400":(winner===teamb?"bg-red-500":""))} onClick={()=>winner?{}:handleOpen(teama)}>
			{teams[teama-1]?teams[teama-1].name:"----"}
		</div>
		<div className={"w-60 h-30 bg-white " + (winner===teamb?"bg-lime-400":(winner===teama?"bg-red-500":""))} onClick={()=>winner?{}:handleOpen(teamb)}>
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
