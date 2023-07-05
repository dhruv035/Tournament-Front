import Navbar from "../components/Navbar";
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Formik, Form, Field, FieldArray, ArrayHelpers } from "formik";
import { useContractWrite } from "wagmi";
import myContract from "../abi/BracketGenerator.json"
const Home: NextPage = () => {
  const [tCount, setTCount] = useState(2);
	const { data, isLoading, isSuccess, write } = useContractWrite({
    address: '0xe6feC6dbdA6ebF8c04c710890483FB2C9A6dEf91',
    abi: myContract.abi,
    functionName: 'createTournament',
  })
  return (
    <div className="grid bg-blue-400 w-full h-full absolute">
      <div className="flex flex-col w-3/4 justify-self-center ">
        <div className="flex my-10 text-4xl self-center">Create Tournament</div>
        <div>
          <Formik
            initialValues={{ name: "", teams: [""] }}
            onSubmit={(values) => {write({
							args:[values.name,values.teams]})}}
            render={({ values }) => (
              <Form>
								<div className="text-2xl mt-4">Tournament Name</div>
								<Field className="mt-2 h-10 w-[400px]" name="name"/>
								<div className="text-2xl mt-8">Enter Teams</div>
                <FieldArray
                  name="teams"
                  render={(arrayHelpers: {
                    remove: (arg0: any) => void;
                    insert: (arg0: any, arg1: string) => void;
                    push: (arg0: string) => void;
                  }) => (
                    <div>
                      {values.teams && values.teams.length > 0 ? (
                        values.teams.map((team, index) => (
                          <div className="my-3" key={index}>
                            <div className="text-xl">Team {index + 1}</div>
                            <Field
                              className="h-10 w-[400px]"
                              name={`teams.${index}`}
                            />
                            <button
                              type="button"
                              className=" bg-green-400 ml-3 w-[40px] text-2xl mr-2"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </button>
                            <button
                              className=" bg-green-400 w-[40px] text-2xl mr-2"
                              type="button"
                              onClick={() => arrayHelpers.insert(index+1, "")} // insert an empty string at a position
                            >
                              +
                            </button>
                          </div>
                        ))
                      ) : (
                        <button
                          type="button"
                          className="bg-blue-600 text-2xl my-4 rounded w-40 h-10"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add a Team
                        </button>
                      )}
                      {values.teams.length > 1 && (
                        <div>
                          <button
                            className="bg-green-600 text-2xl rounded w-36 h-10"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                />
              </Form>
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
