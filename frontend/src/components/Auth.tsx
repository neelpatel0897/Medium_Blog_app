import { Link, Navigate, useNavigate } from "react-router-dom"
import { LabelledInput } from "./LabelledInput"
import { SignupType } from "@neelpatel0897/medium-common"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const Auth=({type}:{type : "signup" | "signin"}) =>{
    const navigate= useNavigate();
    const [ postInputs, setPostInputs] = useState<SignupType>({       
        email: "",
        password: "",
        name:"",
    });

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/auth/${type === "signup"?"signup":"signin"}`, postInputs);
            
            const jwt = response.data;
            localStorage.setItem("jwt", jwt);
            navigate("/blogs");
        }
        catch(e){
            console.log(e);
        }
        
    }

    return <div className="h-screen flex justify-center flex-col">
       {/* { JSON.stringify(postInputs)} */}
        <div className="flex justify-center">
            <div className="w-80" >
                {type==="signup" ? 
                <div>
                    <div className="text-4xl font-bold ">
                        Create an account
                    </div>
                    <div className="text-slate-400 text-center">
                        Already have an account? <Link to={"/signin"} className="pl-2 underline">Sign in</Link>
                    </div>
                </div> 
                : <div >                    
                    <div className="text-4xl font-bold text-center">
                        Sign in
                    </div>
                    <div className="text-slate-400 text-center">
                        Don't Have an account? <Link to={"/signup"} className="pl-2 underline">Sign up</Link>
                    </div>
                </div> }             


                
               
                { type === "signup" ? <LabelledInput label="Username" placeholder="Harkirat Singh.." type="text"
                    onChange={(e) => {            
                        setPostInputs(postInputs => 
                            ({ 
                                ...postInputs,
                                name: e.target.value
                            })
                        )
                }}></LabelledInput>: null}
                
                <LabelledInput label="Email" placeholder="neelpatel@gmail.com" type="text"
                    onChange={(e) => {            
                        setPostInputs(c => 
                            ({ 
                                ...c,
                                email: e.target.value
                            })
                        )
                }}></LabelledInput>
                <LabelledInput label="Password" placeholder="********" type="password"
                    onChange={(e) => {            
                        setPostInputs(c => 
                            ({ 
                                ...c,
                                password: e.target.value
                            })
                        )
                }}></LabelledInput>
                <button onClick={sendRequest}   className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
            </div>
            
        </div>           
        
    </div>
}


